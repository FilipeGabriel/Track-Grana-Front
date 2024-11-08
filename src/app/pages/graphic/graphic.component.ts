import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BarChartComponent } from "../../components/bar-chart/bar-chart.component";
import { TitleComponent } from "../../components/title/title.component";
import { InvoiceService } from '../../services/invoice.service';
import { Invoice } from '../../models/invoice';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-graphic',
  standalone: true,
  imports: [CommonModule, BarChartComponent, TitleComponent],
  templateUrl: './graphic.component.html',
  styleUrl: './graphic.component.css'
})

export class GraphicComponent {

    invoices: Invoice[];
    uniqueYear: number[] = [];

    constructor (
        private invoiceService: InvoiceService,
        private toastr: ToastrService
    ) {

    }

    ngOnInit() {

        this.invoiceService
            .getInvoices()
            .subscribe({
                next: (response) => {
                    this.invoices = response;
                    this.uniqueYear = this.getUniqueYear(this.invoices);
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado');
                }
        });

    }

    private getUniqueYear(invoice: Invoice[]): number[] {
        return Array.from(new Set(invoice.map(obj => obj.year)));
    }

}
