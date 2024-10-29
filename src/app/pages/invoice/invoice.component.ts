import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { ExpensesItem } from '../../models/expenses-item';
import { SpentType } from '../../models/spent-type';
import { MonthlyContract } from '../../models/monthly-contract';
import { Invoice } from '../../models/invoice';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TitleComponent, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

    invoice: Invoice;
    invoices: Invoice[];
    spentType: SpentType;
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

    constructor() {
    }

    ngOnInit() {

        this.invoices = [
            this.invoice = {
                month: 6,
                monthName: 'Junho',
                year: 2024
            },
            this.invoice = {
                month: 7,
                monthName: 'Julho',
                year: 2024
            },
            this.invoice = {
                month: 8,
                monthName: 'Agosto',
                year: 2024
            },
            this.invoice = {
                month: 9,
                monthName: 'Setembro',
                year: 2024
            },
            this.invoice = {
                month: 10,
                monthName: 'outubro',
                year: 2024
            }
        ]

        this.spentTypes = [
            this.spentType = {
                description: 'Inter',
                spentValue: 150,
                color: '#f85c01',
                paid: false
            },
            this.spentType = {
                description: 'Bradesco',
                spentValue: 350,
                color: '#be0202',
                paid: false
            },
            this.spentType = {
                description: 'Nubank',
                spentValue: 200,
                color: '#7700ff',
                paid: false
            }
        ]

        this.totalValueSpent = 0;
        for (let spent of this.spentTypes) {
            this.totalValueSpent += spent.spentValue;
        }

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

    closeInvoiceModal() {
        this.isModalInvoiceVisible = false;
    }

    openExpensesModal() {
        this.isModalExpensesVisible = true;
    }

    closeExpensesModal() {
        this.isModalExpensesVisible = false;
    }

    openContractsModal() {
        this.isModalContractsVisible = true;
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

}
