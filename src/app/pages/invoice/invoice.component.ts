import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { ExpensesItem } from '../../models/expenses-item';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TitleComponent, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent implements OnInit {

    item: ExpensesItem;
    items: ExpensesItem[];
    totalValueExpenses: number;

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
