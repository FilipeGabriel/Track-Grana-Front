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
import { ExpensesItemService } from '../../services/expenses-item.service';
import { MonthlyContractService } from '../../services/monthly-contract.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TitleComponent, CommonModule, RealCurrencyPipe, FormsModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit {

    month: number | null = null;
    year: number | null = null;
    invoice: Invoice;

    invoices: Invoice[];
    uniqueYears: number[];
    selectedYear: number;
    filteredMonthNames: string[];

    spentTypes: SpentType[];
    totalValueSpent: number;
    expensesItems: ExpensesItem[];
    totalValueExpenses: number;
    monthlyContracts: MonthlyContract[];
    totalValueContract: number;

    isModalInvoiceVisible: boolean = false;
    isModalExpensesVisible: boolean = false;
    isModalContractsVisible: boolean = false;

    isExpenseCollapsed = false;
    isContractsCollapsed = false;

    spentItems: string[];
    selectedTypeExpenses: string;

    constructor(
        private toastr: ToastrService,
        private monthTranslate: MonthTranslateService,
        private invoiceService: InvoiceService,
        private spentTypeService: SpentTypeService,
        private expensesItemService: ExpensesItemService,
        private monthlyContractService: MonthlyContractService
    ) { }

    ngOnInit() {

        this.invoiceService
            .getInvoices()
            .subscribe({
                next: (response) => {
                    this.invoices = response.map(invoice => ({
                        ...invoice,
                        monthName: this.monthTranslate.translate(invoice.monthInvoice.monthName)
                    }));
                    this.uniqueYears = [...new Set(this.invoices.map(invoice => this.getYear(invoice.monthInvoice.monthYear)))];
                    this.selectedYear = this.uniqueYears[1];
                    this.updateFilteredMonthNames();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado');
                }
        });

        this.spentTypeService
            .getSpentTypes()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
                    this.calculateTotalSpent();
                    this.getSpentItems();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado');
                }
        });

        this.expensesItemService
            .getExpensesItem()
            .subscribe({
                next: (response) => {
                    this.expensesItems = response;
                    this.calculateTotalExpensesItems();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado!');
                }
        });

        this.monthlyContractService
            .getMonthlyContracts()
            .subscribe({
                next: (response) => {
                this.monthlyContracts = response;
                this.calculateTotalMonthlyContract();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado!');
                }
        });

    }

    openInvoiceModal() {
        this.isModalInvoiceVisible = true;
    }

    insertInvoice() {
        this.invoiceService
            .insertInvoice(this.month, this.year)
            .subscribe({
                next: (response) => {
                    this.invoice = response;
                    this.closeInvoiceModal();
                    this.toastr.success("Fatura criada com sucesso!");
                },
                error: (error) => {
                    this.toastr.error(error.error.message);
                }
        });



    }

    closeInvoiceModal() {
        this.month = null;
        this.year = null;
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

    updateFilteredMonthNames() {
       this.filteredMonthNames = this.invoices
          .filter(invoice => this.getYear(invoice.monthInvoice.monthYear) === this.selectedYear)
           .map(invoice => invoice.monthName);
    }

    onYearChange(event: Event) {
       const selectElement = event.target as HTMLSelectElement;
       this.selectedYear = Number(selectElement.value);
       this.updateFilteredMonthNames();
    }

    calculateTotalSpent(): void {
        this.totalValueSpent = this.spentTypes.reduce((sum, SpentType) => sum + SpentType.spentValue, 0);
    }

    getSpentItems(): void {
        this.spentItems = [''].concat(this.spentTypes.map(spentType => spentType.description));
        this.selectedTypeExpenses = this.spentItems[0];
    }

    calculateTotalExpensesItems(): void {
        this.totalValueExpenses = this.expensesItems.reduce((sum, expensesItems) => sum + expensesItems.itemValue, 0);
    }

    calculateTotalMonthlyContract(): void {
        this.totalValueContract = this.monthlyContracts.reduce((sum, monthlyContracts) => sum + monthlyContracts.contractValue, 0);
    }

    getYear(date: string): number {
        const dateString = date;
        const parts = dateString.split("/");
        const year = parseInt(parts[2],10);
        return year;
    }

}
