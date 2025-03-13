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
    imports: [
        TitleComponent,
        CommonModule,
        RealCurrencyPipe,
        FormsModule
    ],
    templateUrl: './invoice.component.html',
    styleUrl: './invoice.component.css'
})

export class InvoiceComponent implements OnInit {

    month: number | null = null;
    year: number | null = null;
    invoice: Invoice;
    expenseItem: ExpensesItem;

    invoices: Invoice[];
    uniqueYears: number[];
    selectedYear: number;
    selectedMonthId: number | null = null;
    selectedSpentType: any;
    monthNameSelected: string;
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
    ) {
        this.expenseItem = new ExpensesItem();
    }

    ngOnInit() {

        this.getInvoices();

        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
                    this.calculateTotalSpent();
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
        this.month = null;
        this.isModalInvoiceVisible = true;
    }

    insertInvoice() {
        const selectedYear = localStorage.getItem('selected_year');
        if (selectedYear) {
            this.invoiceService
                .insertInvoice(this.month, this.year)
                .subscribe({
                    next: (response) => {
                        this.invoice = response;
                        this.closeInvoiceModal();
                        this.getInvoices();
                        this.toastr.success("Fatura criada com sucesso!");
                    },
                    error: (error) => {
                        this.toastr.error(error.error.message);
                    }
            });
        } else {
            this.invoiceService
                .insertInvoice(this.month, this.year)
                .subscribe({
                    next: (response) => {
                        this.invoice = response;
                        const year = this.getYear(this.invoice.monthInvoice.monthYear).toString();
                        localStorage.setItem('selected_year', year)
                        this.closeInvoiceModal();
                        this.getInvoices();
                        this.toastr.success("Fatura criada com sucesso!");
                    },
                    error: (error) => {
                        this.toastr.error(error.error.message);
                    }
            });
        }


    }

    getInvoices() {
        this.invoiceService
            .getInvoices()
            .subscribe({
                next: (response) => {
                    this.invoices = response.map(invoice => ({
                        ...invoice,
                        monthName: this.monthTranslate.translate(invoice.monthInvoice.monthName)
                    }));
                    const yearInLocalStorage = localStorage.getItem('selected_year');
                    this.selectedYear = Number(yearInLocalStorage);
                    this.updateFilteredMonthNames();
                    this.selectLastMonth();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Nenhum item encontrado');
                }
        });
    }

    getDataForMonth(id: number): void {
        this.invoiceService
            .getInvoiceById(id)
            .subscribe({
                next: (response) => {
                    this.invoice = response;
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Erro ao buscar dados do mês');
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
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
                    this.spentTypes.unshift({
                        id: 0,
                        name: 'Selecione...',
                        totalBankValue: 0,
                        color: '',
                        paid: false,
                        userId: ''
                    })
                    this.calculateTotalSpent();
                }
        });
    }

    saveExpenses() { //fazer a requisição para salvar
        this.expenseItem.spentTypeId = this.selectedSpentType;
        this.expenseItem.monthlyExpensesId = this.invoice.monthlyExpenses.id;

        this.closeExpensesModal();
    }

    closeExpensesModal() {
        this.expenseItem.description = '';
        this.expenseItem.installment = null;
        this.expenseItem.itemValue = null;
        this.expenseItem.spentTypeId = null; // continuar daqui para ao fechar o modal selecionar o primeiro item do select (finalizado)
        this.selectedSpentType = this.spentTypes.length > 0 ? this.spentTypes[0].id : null;
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
            .sort((a, b) => new Date(a.monthInvoice.monthYear).getTime() - new Date(b.monthInvoice.monthYear).getTime())
            .map(invoice => invoice.monthName);
    }

    selectLastMonth(): void {
        if (this.filteredMonthNames.length > 0) {
            const latestMonth = this.filteredMonthNames[this.filteredMonthNames.length - 1];
            this.monthNameSelected = latestMonth;
            this.month = this.getMonthNumber(latestMonth);

            const selectedMonth = this.invoices.find(invoice => this.getMonthNumber(invoice.monthName) === this.month);
            if (selectedMonth) {
                this.selectedMonthId = selectedMonth.monthInvoice.id;
                this.getDataForMonth(this.selectedMonthId);
            }
        }
    }

    getMonthNumber(monthName: string): number {
        const months: Record<string, number> = {
            'Janeiro': 1, 'Fevereiro': 2, 'Março': 3, 'Abril': 4, 'Maio': 5, 'Junho': 6,
            'Julho': 7, 'Agosto': 8, 'Setembro': 9, 'Outubro': 10, 'Novembro': 11, 'Dezembro': 12
        };

        return months[monthName as keyof typeof months] || 1;
    }

    onYearChange(event: Event) {
        const selectElement = event.target as HTMLSelectElement;
        this.selectedYear = Number(selectElement.value);
        this.updateFilteredMonthNames();
    }

    calculateTotalSpent(): void {
        this.totalValueSpent = this.spentTypes.reduce((sum, SpentType) => sum + SpentType.totalBankValue, 0);
    }

    getSpentItems(): void {
        this.spentItems = [''].concat(this.spentTypes.map(spentType => spentType.name));
        this.selectedTypeExpenses = this.spentItems[0];
    }

    calculateTotalExpensesItems(): void {
        this.totalValueExpenses = this.expensesItems.reduce((sum, expensesItems) => sum + (expensesItems.itemValue ?? 0), 0);
    }

    calculateTotalMonthlyContract(): void {
        this.totalValueContract = this.monthlyContracts.reduce((sum, monthlyContracts) => sum + monthlyContracts.contractValue, 0);
    }

    getYear(date: string): number {
        const parts = date.split("/");
        return parseInt(parts[2], 10);
    }

    onMonthSelect(month: string): void {
        this.monthNameSelected = month;
        this.month = this.getMonthNumber(month);

        const selectedMonth = this.invoices.find(invoice => invoice.monthName === month);
        if (selectedMonth) {
            this.selectedMonthId = selectedMonth.monthInvoice.id;
            this.getDataForMonth(this.selectedMonthId);
        }
    }

}
