import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { TitleComponent } from "../../components/title/title.component";
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { ToastrService } from 'ngx-toastr';
import { BaseChartDirective } from 'ng2-charts';

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
    selectedYear: number | null = null; // Armazena o ano selecionado

    public barChartLabels: string[] = [];
    public barChartType: string = 'bar';
    public barChartData: any[] = [];
    public barChartOptions: any;

    constructor(
        private invoiceService: InvoiceService,
        private toastr: ToastrService
    ) {}

    ngOnInit() {
        this.loadInvoices();
    }

    // Método para carregar as faturas
    private loadInvoices() {
        this.invoiceService.getInvoices().subscribe({
            next: (response) => {
                this.invoices = response;
                this.uniqueYear = this.getUniqueYear(this.invoices);

                // Selecionar o ano mais recente automaticamente
                if (this.uniqueYear.length > 0) {
                    const recentYear = Math.max(...this.uniqueYear);
                    this.onYearSelected(recentYear);
                }
            },
            error: (error) => {
                this.toastr.error(error.error.error, 'Nenhum item encontrado');
            }
        });
    }

    // Método para obter os anos únicos
    private getUniqueYear(invoices: Invoice[]): number[] {
        return Array.from(new Set(invoices.map(obj => obj.year)));
    }

    // Método para atualizar o gráfico com base no ano selecionado
    onYearSelected(year: number) {
        this.selectedYear = year;
        // Filtra as faturas pelo ano selecionado
        const filteredInvoices = this.invoices.filter(invoice => invoice.year === year);

        // Mapeia os nomes dos meses e os valores das faturas
        const monthNames = filteredInvoices.map(invoice => invoice.monthName);
        const invoiceValues = filteredInvoices.map(invoice => invoice.value);
        const colors = this.generateColors(invoiceValues);

        // Atualiza o gráfico com os novos dados
        this.updateChartData(monthNames, invoiceValues, colors);
    }

    // Gera as cores dinamicamente com base nos valores
    private generateColors(values: number[]): string[] {
        const minValue = Math.min(...values);
        const maxValue = Math.max(...values);
        return values.map(value => {
            if (value === minValue) return 'rgb(61, 166, 72)'; // Cor para o menor valor
            if (value === maxValue) return 'rgb(243, 145, 29)'; // Cor para o maior valor
            return 'rgb(183, 188, 184)'; // Cor padrão
        });
    }

    // Atualiza os dados do gráfico
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
}
