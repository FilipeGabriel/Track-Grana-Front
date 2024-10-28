import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { ExpensesItem } from '../../models/expenses-item';
import { SpentType } from '../../models/spent-type';

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
    itemColor: string;
    totalValueExpenses: number;
    spentType: SpentType;
    spentTypes: SpentType[];
    totalValueSpent: number;

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

        this.spentTypes = [
            this.spentType = {
                description: 'Inter',
                value: 150,
                color: '#f85c01',
                paid: false
            },
            this.spentType = {
                description: 'Bradesco',
                value: 350,
                color: '#be0202',
                paid: false
            },
            this.spentType = {
                description: 'Nubank',
                value: 200,
                color: '#7700ff',
                paid: false
            }
        ]

        this.totalValueSpent = 0;
        for (let spent of this.spentTypes) {
            this.totalValueSpent += spent.value;
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
