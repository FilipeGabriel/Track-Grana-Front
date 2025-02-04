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
    uniqueYears: number[] = [];
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
        const storedYear = localStorage.getItem('selected_year');
        if (storedYear) {
            this.selectedYear = parseInt(storedYear, 10);
        }
        this.loadInvoices();
    }

    private loadInvoices() {
        this.invoiceService
            .getAllInvoices()
            .subscribe({
                next: (response) => {
                    this.invoices = response.map(invoice => ({
                        ...invoice,
                        monthName: this.monthTranslate.translate(invoice.monthInvoice.monthName)
                    }));
                    this.uniqueYears = this.getUniqueYears(this.invoices);
                    if (this.uniqueYears.length > 0) {
                        if (this.selectedYear === null || !this.uniqueYears.includes(this.selectedYear)) {
                            const recentYear = Math.max(...this.uniqueYears);
                            this.onYearSelected(recentYear);
                        } else {
                            this.onYearSelected(this.selectedYear);
                        }
                    }
                    this.updateFilteredMonthNames();
                }
        });
    }

    private getUniqueYears(invoices: Invoice[]): number[] {
       return Array.from(new Set(invoices.map(obj => this.getYear(obj.monthInvoice.monthYear))));
    }

    onYearSelected(year: number) {
        this.selectedYear = year;
        const filteredInvoices = this.invoices.filter(invoice => this.getYear(invoice.monthInvoice.monthYear) === year);

        const sortedInvoices = filteredInvoices.sort((a, b) => {
            const dateA = new Date(a.monthInvoice.monthYear);
            const dateB = new Date(b.monthInvoice.monthYear);
            return dateA.getTime() - dateB.getTime();
        });

        const monthNames = sortedInvoices.map(invoice => invoice.monthName);
        const invoiceValues = sortedInvoices.map(invoice => invoice.totalInvoiceValue);
        const colors = this.generateColors(invoiceValues);

        this.updateChartData(monthNames, invoiceValues, colors);
        localStorage.setItem('selected_year', this.selectedYear.toString());
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
