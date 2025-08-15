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
import { ContractItem } from '../../models/contract-item';
import { DynamicCurrencyPipe } from '../../pipes/dynamic-currency.pipe';
import { AuthService } from '../../services/auth.service';
import { Account } from '../../models/account';
import { User } from '../../models/user';

@Component({
    selector: 'app-invoice',
    standalone: true,
    imports: [
        TitleComponent,
        CommonModule,
        RealCurrencyPipe,
        DynamicCurrencyPipe,
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
    contractItem: ContractItem;
    user: User;
    account: Account;

    invoices: Invoice[];
    uniqueYears: number[];
    selectedYear: number;
    selectedMonthId: number | null = null;
    selectedSpentType: any;
    monthNameSelected: string;
    filteredMonthNames: string[];

    spentTypes: SpentType[];
    spentTypesModal: SpentType[];
    spentTypeForInvoice: SpentType[];
    totalValueSpent: number = 0;
    totalValueSpentByItem: number = 0;
    expensesItems: ExpensesItem[];
    contractItems: ContractItem[];
    totalValueExpenses: number = 0;
    monthlyContracts: MonthlyContract[];
    totalValueContract: number;

    isModalInvoiceVisible: boolean = false;
    isModalExpensesVisible: boolean = false;
    isModalContractsVisible: boolean = false;
    isEditingExpense: boolean = false;
    isEditingContract: boolean = false;
    isEmpty: boolean = false;
    isLoading: boolean = false;

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
        private monthlyContractService: MonthlyContractService,
        private authService: AuthService
    ) {
        this.expenseItem = new ExpensesItem();
        this.contractItem = new ContractItem();
    }

    ngOnInit() {

        this.getInvoices();

        this.getSpentTypes();

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

    getInvoices(skipSelectLastMonth: boolean = false) {
        this.isLoading = true;

        this.invoiceService
            .getInvoices()
            .subscribe({
                next: (response) => {
                    this.isEmpty = false;
                    this.invoices = response.map(invoice => ({
                        ...invoice,
                        monthName: this.monthTranslate.translate(invoice.monthInvoice.monthName)
                    }));
                    const yearInLocalStorage = localStorage.getItem('selected_year');
                    this.selectedYear = Number(yearInLocalStorage);
                    this.updateFilteredMonthNames();
                    if (!skipSelectLastMonth) {
                        this.selectLastMonth();
                    }
                },
                error: (error) => {
                    this.isEmpty = true;
                },
                complete: () => {
                    this.isLoading = false;
                }
        });
    }

    getDataForMonth(id: number): void {
        this.invoiceService
            .getInvoiceById(id)
            .subscribe({
                next: (response) => {
                    this.invoice = response;
                    const loggedUser = localStorage.getItem('logged_user');
                    let contractItems;
                    if (loggedUser) {
                        const userObject = JSON.parse(loggedUser);
                        contractItems = userObject.account.monthlyContracts.contractItems;
                    } else {
                        this.toastr.error('Usuário não encontrado no localStorage.')
                    }
                    this.expensesItems = this.invoice.monthlyExpenses.expensesItems;
                    this.contractItems = contractItems;
                    this.spentTypeForInvoice = this.invoice.spentTypes;

                    this.expensesItems = this.expensesItems.map(item => ({
                        ...item,
                        spentTypeId: item.spentType ? item.spentType.id : item.spentTypeId
                    }));
                    this.contractItems = this.contractItems.map(item => ({
                        ...item,
                        spentTypeId: item.spentType ? item.spentType.id : item.spentTypeId
                    }));

                    this.calculateTotalSpentByType();
                    this.calculateTotalExpensesItems();
                    this.calculateTotalMonthlyContract();
                    this.calculateTotalSpents();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Erro ao buscar dados do mês');
                }
        });
    }

    getSpentTypes(){
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
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
        this.isEditingExpense = false;
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypesModal = response;
                    this.spentTypesModal.unshift({
                        id: 0,
                        name: 'Selecione...',
                        color: '',
                        paid: false,
                        userId: '',
                        invoices: [],
                        totalValue: 0
                    })
                    this.selectedSpentType = this.spentTypesModal.length > 0 ? this.spentTypesModal[0].id : null;
                }
        });
    }

    openExpensesModalEdit(itemId: number) {
        this.isEditingExpense = true;
        this.expensesItemService
            .getExpenseItemById(itemId)
            .subscribe({
                next: (response) => {
                    this.expenseItem = response;
                    this.expenseItem.itemValue = (this.expenseItem.itemValue ?? 0) * 100;

                    this.spentTypeService
                        .getAllSpentsType()
                        .subscribe({
                            next: (response) => {
                                this.spentTypesModal = response;
                                this.selectedSpentType = this.expenseItem.spentType?.id;
                            }
                    });
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Item não encontrado');
                }
            })
        this.isModalExpensesVisible = true;
    }

    saveExpenses() {
        this.expenseItem.spentTypeId = this.selectedSpentType;
        this.expenseItem.monthlyExpensesId = this.invoice.monthlyExpenses.id;
        this.expenseItem.itemValue = (this.expenseItem.itemValue ?? 0) / 100;

        if (this.isEditingExpense) {
            this.expensesItemService
                .updateExpenseItem(this.expenseItem.id, this.expenseItem)
                .subscribe({
                    next: (response) => {
                        this.expenseItem = response;
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getInvoices(true);
                        this.getSpentTypes();
                        this.toastr.success("Item atualizado com sucesso!");
                        this.closeExpensesModal();
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao atualizar item');
                    }
                });
        } else {
            this.expensesItemService
                .insertExpenseItem(this.expenseItem)
                .subscribe({
                    next: (response) => {
                        this.expenseItem = response;
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getInvoices(true);
                        this.getSpentTypes();
                        this.toastr.success("Item criado com sucesso!");
                        this.closeExpensesModal();
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao cadastrar item');
                    }
                });
        }
    }

    deleteExpenses(itemId: number) {
        const itemName = this.expenseItem.description
        this.expensesItemService
            .deleteExpense(itemId)
            .subscribe({
                next: (response) => {
                    this.getDataForMonth(this.selectedMonthId!);
                    this.getInvoices(true);
                    this.getSpentTypes();
                    this.toastr.success(`Item '${itemName}' excluído com sucesso!`);
                    this.closeExpensesModal();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Item não encontrado');
                }
            })
    }

    closeExpensesModal() {
        this.expenseItem = new ExpensesItem();
        this.isModalExpensesVisible = false;
    }

    openContractsModal() {
        this.isModalContractsVisible = true;
        this.isEditingContract = false;
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypesModal = response;
                    this.spentTypesModal.unshift({
                        id: 0,
                        name: 'Selecione...',
                        color: '',
                        paid: false,
                        userId: '',
                        invoices: [],
                        totalValue: 0
                    })
                    this.selectedSpentType = this.spentTypesModal.length > 0 ? this.spentTypesModal[0].id : null;
                }
        });
    }

    openContractsModalEdit(itemId: number) {
        this.isEditingContract = true
        this.monthlyContractService
            .getContractItemById(itemId)
            .subscribe({
                next: (response) => {
                    this.contractItem = response;
                    if (this.contractItem.endDate && this.contractItem.endDate.includes('/')) {
                        const [day, month, year] = this.contractItem.endDate.split('/');
                        this.contractItem.endDate = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
                    }
                    this.contractItem.itemValue = (this.contractItem.itemValue ?? 0) * 100;

                    this.spentTypeService
                        .getAllSpentsType()
                        .subscribe({
                            next: (response) => {
                                this.spentTypesModal = response;
                                this.selectedSpentType = this.contractItem.spentType?.id;
                            }
                    });
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Item não encontrado');
                }
            })
        this.isModalContractsVisible = true;
    }

    saveContracts() {
        const loggedUser = localStorage.getItem('logged_user');
        let monthlyContractsId;
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            monthlyContractsId = userObject.account.monthlyContracts.id;
        } else {
            this.toastr.error('Usuário não encontrado no localStorage.')
        }
        this.contractItem.spentTypeId = this.selectedSpentType;
        this.contractItem.monthlyContractsId = monthlyContractsId;
        this.contractItem.invoiceId = this.invoice.id;
        if (this.contractItem.endDate && this.contractItem.endDate.includes('-')) {
            const [year, month, day] = this.contractItem.endDate.split('-');
            this.contractItem.endDate = `${day}/${month}/${year}`;
        }
        this.contractItem.itemValue = (this.contractItem.itemValue ?? 0) / 100;

        if (this.isEditingContract) {
            this.monthlyContractService
                .updateContractItem(this.contractItem.id, this.contractItem)
                .subscribe({
                    next: (response) => {
                        this.contractItem = response;
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getAccount();
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getInvoices(true);
                        this.getSpentTypes();
                        this.toastr.success("Item atualizado com sucesso!");
                        this.closeContractsModal();
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Item não encontrado');
                    }
                })
        } else {
            this.monthlyContractService
                .insertContractItem(this.contractItem)
                .subscribe({
                    next: (response) => {
                        this.contractItem = response;
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getAccount();
                        this.getDataForMonth(this.selectedMonthId!);
                        this.getInvoices(true);
                        this.getSpentTypes();
                        this.toastr.success("Item criado com sucesso!");
                        this.closeContractsModal();
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao cadastrar item');
                    }
            })
        }
    }

    deleteContract(itemId: number) {
        const itemName = this.contractItem.description
        this.monthlyContractService
            .deleteContract(itemId)
            .subscribe({
                next: (response) => {
                    this.getDataForMonth(this.selectedMonthId!);
                    this.getAccount();
                    this.getDataForMonth(this.selectedMonthId!);
                    this.getInvoices(true);
                    this.getSpentTypes();
                    this.toastr.success(`Contrato '${itemName}' excluído com sucesso!`);
                    this.closeContractsModal();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Item não encontrado');
                }
            })
    }

    closeContractsModal() {
        this.contractItem = new ContractItem()
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
                this.selectedMonthId = selectedMonth.id;
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

    calculateTotalSpents(): void {
        this.totalValueSpent = this.totalValueExpenses + this.totalValueContract;
    }

    calculateTotalSpentByType() {
        this.spentTypeForInvoice = this.spentTypes.map(spentType => {
            const filteredExpenesItems = this.expensesItems.filter(item => item.spentTypeId === Number(spentType.id));
            const filteredContractItems = this.contractItems.filter(item => item.spentTypeId === Number(spentType.id));

            const totalExpenses = filteredExpenesItems.reduce((sum, item) => sum + (item.itemValue ?? 0), 0);
            const totalContracts = filteredContractItems.reduce((sum, item) => sum + (item.itemValue ?? 0), 0);

            const total = totalExpenses + totalContracts;

            return {
                ...spentType,
                totalValue: total
            };
        });
    }

    // getSpentItems(): void {      verificar necessidade
    //     this.spentItems = [''].concat(this.spentTypes.map(spentType => spentType.name));
    //     this.selectedTypeExpenses = this.spentItems[0];
    // }

    calculateTotalExpensesItems(): void {
        this.totalValueExpenses = this.expensesItems.reduce((sum, expensesItems) => sum + (expensesItems.itemValue ?? 0), 0);
    }

    calculateTotalMonthlyContract(): void {
        this.totalValueContract = this.contractItems.reduce((sum, monthlyContracts) => sum + (monthlyContracts.itemValue ?? 0), 0);
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
            this.selectedMonthId = selectedMonth.id;
            this.getDataForMonth(this.selectedMonthId);
        }
    }

    onItemValueInputExpense(event: Event) {
        const input = event.target as HTMLInputElement;
        const digits = input.value.replace(/\D/g, '');
        this.expenseItem.itemValue = Number(digits);
    }

    onItemValueInputContract(event: Event) {
        const input = event.target as HTMLInputElement;
        const digits = input.value.replace(/\D/g, '');
        this.contractItem.itemValue = Number(digits);
    }

    getAccount(){
        this.authService
                .getUserById()
                .subscribe ({
                    next: (response) => {
                        this.user = response;
                        this.account = { ...this.user.account };
                        this.contractItems = this.account.monthlyContracts.contractItems;
                        localStorage.setItem('logged_user', JSON.stringify(this.user));
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao carregar usuário.');
                    },
            });
    }

    getSpentTypeColor(spentTypeId: number): string {
        const spentType = this.spentTypes.find(type => Number(type.id) === Number(spentTypeId));
        return spentType ? spentType.color : '';
    }

}
