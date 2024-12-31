import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';
import { MonthTranslateService } from '../../services/month-translate.service';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, TitleComponent, BaseChartDirective],
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent {

    invoices: Invoice[] = [];
    uniqueYear: number[] = [];
    selectedYear: number | null = null;
    filteredMonthNames: string[];

    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartData: any[] = [];
    public barChartOptions: any;

    constructor(
        private invoiceService: InvoiceService,
        private monthTranslate: MonthTranslateService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.loadInvoices();
    }

    private loadInvoices() {
        this.invoiceService.getInvoices().subscribe({
            next: (response) => {
                this.invoices = response.map(invoice => ({
                    ...invoice,
                    monthName: this.monthTranslate.translate(invoice.monthInvoice.monthName)
                }));
                this.uniqueYear = this.getUniqueYear(this.invoices);

                if (this.uniqueYear.length > 0) {
                    const recentYear = Math.max(...this.uniqueYear);
                    this.onYearSelected(recentYear);
                }
                this.updateFilteredMonthNames();
            },
            error: (error) => {
                this.toastr.error(error.error.error, 'Nenhum item encontrado');
            }
        });
    }

    private getUniqueYear(invoices: Invoice[]): number[] {
       return Array.from(new Set(invoices.map(obj => this.getYear(obj.monthInvoice.monthYear))));
    }

    onYearSelected(year: number) {
        this.selectedYear = year;
        const filteredInvoices = this.invoices.filter(invoice => this.getYear(invoice.monthInvoice.monthYear) === year);

        const monthNames = filteredInvoices.map(invoice => invoice.monthName);
        const invoiceValues = filteredInvoices.map(invoice => invoice.totalInvoiceValue);
        const colors = this.generateColors(invoiceValues);

        this.updateChartData(monthNames, invoiceValues, colors);
    }

    private generateColors(values: number[]): string[] {
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        return values.map(value => {
            if (value === minValue) return 'rgb(61, 166, 72)';
            if (value === maxValue) return 'rgb(243, 145, 29)';
            return 'rgb(183, 188, 184)';
        });
    }

    private updateChartData(monthNames: string[], invoiceValues: number[], colors: string[]) {
        this.barChartOptions = {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    beginAtZero: true
                },
                y: {
                    beginAtZero: true
                }
            }
        };
        this.barChartLabels = monthNames;
        this.barChartData = [
            {
                data: invoiceValues,
                label: 'Valor da fatura',
                backgroundColor: colors
            }
        ];
    }

    getYear(date: string): number {
        const dateString = date;
        const parts = dateString.split("/");
        const year = parseInt(parts[2],10);
        return year;
    }

    updateFilteredMonthNames() {
        this.filteredMonthNames = this.invoices
           .filter(invoice => this.getYear(invoice.monthInvoice.monthYear) === this.selectedYear)
            .map(invoice => invoice.monthName);
    }
}
