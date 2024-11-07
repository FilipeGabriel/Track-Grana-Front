import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { ExpensesItem } from '../../models/expenses-item';
import { SpentType } from '../../models/spent-type';
import { MonthlyContract } from '../../models/monthly-contract';
import { Invoice } from '../../models/invoice';
import { MonthTranslateService } from '../../services/month-translate.service';
import { RealCurrencyPipe } from '../../pipes/real-currency.pipe';
import { InvoiceService } from '../../services/invoice.service';
import { SpentTypeService } from '../../services/spent-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TitleComponent, CommonModule, RealCurrencyPipe],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

    invoices: Invoice[];
    spentTypes: SpentType[];
    totalValueSpent: number;
    item: ExpensesItem;
    items: ExpensesItem[];
    totalValueExpenses: number;
    monthlyContract: MonthlyContract;
    monthlyContracts: MonthlyContract[];
    totalValueContract: number;

    isModalInvoiceVisible: boolean = false;
    isModalExpensesVisible: boolean = false;
    isModalContractsVisible: boolean = false;

    isExpenseCollapsed = false;
    isContractsCollapsed = false;

    spentItems = ['', 'Santander', 'Inter', 'NuBank'];
    selectedTypeExpenses: string = this.spentItems[0];

    constructor(
        private toastr: ToastrService,
        private monthTranslate: MonthTranslateService,
        private invoiceService: InvoiceService ,
        private spentTypeService: SpentTypeService
    ) { }

    ngOnInit() {

        this.invoiceService
            .getInvoices()
            .subscribe((response) => {
                this.invoices = response.map(invoice => ({
                ...invoice,
                monthName: this.monthTranslate.translate(invoice.monthName)
                }));
            });

        this.spentTypeService
            .getSpentTypes()
            .subscribe({
                next: (response) => {
                this.spentTypes = response;
                this.calculateTotalSpent();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Erro ao cadastrar!');
                }
            });

        this.items = [
            this.item = {
                description: 'Televisão',
                installment: 4,
                itemValue: 150,
                spentTypeId: 1,
                monthlyExpensesId: 1
            },
            this.item = {
                description: 'Pratos',
                installment: 2,
                itemValue: 50,
                spentTypeId: 1,
                monthlyExpensesId: 1
            },this.item = {
                description: 'Geladeira',
                installment: 10,
                itemValue: 260,
                spentTypeId: 1,
                monthlyExpensesId: 1
            },
            this.item = {
                description: 'Mesa',
                installment: 7,
                itemValue: 80,
                spentTypeId: 1,
                monthlyExpensesId: 1
            }
        ]

        this.totalValueExpenses = 0
        for (let item of this.items) {
            this.totalValueExpenses += item.itemValue;
        }

        this.monthlyContracts = [
            this.monthlyContract = {
                description: 'Spotfy',
                contractValue: 24.90,
                contractEnd: '24/02/2026'
            },
            this.monthlyContract = {
                description: 'Prime Vídeo',
                contractValue: 22,
                contractEnd: '24/02/2027'
            }
        ]

        this.totalValueContract = 0;
        for (let contract of this.monthlyContracts) {
            this.totalValueContract += contract.contractValue;
        }

    }

    openInvoiceModal() {
        this.isModalInvoiceVisible = true;
    }

    saveInvoice() {
        this.closeInvoiceModal();
    }

    closeInvoiceModal() {
        this.isModalInvoiceVisible = false;
    }

    openExpensesModal() {
        this.isModalExpensesVisible = true;
    }

    saveExpenses() {
        this.closeExpensesModal()
    }

    closeExpensesModal() {
        this.isModalExpensesVisible = false;
    }

    openContractsModal() {
        this.isModalContractsVisible = true;
    }

    saveContracts() {
        this.closeContractsModal();
    }

    closeContractsModal() {
        this.isModalContractsVisible = false;
    }

    toggleExpenseTable() {
        this.isExpenseCollapsed = !this.isExpenseCollapsed;
    }

    toggleContractsTable() {
        this.isContractsCollapsed = !this.isContractsCollapsed;
    }

    onSelectType(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedTypeExpenses = selectElement.value;
    }

    calculateTotalSpent(): void {
        this.totalValueSpent = this.spentTypes.reduce((sum, SpentType) => sum + SpentType.spentValue, 0);
    }

}
