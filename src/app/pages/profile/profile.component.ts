import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from '../../pipes/date-format.pipe';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
  providers: [DateFormatPipe]
})

export class ProfileComponent {

    user: User;
    account: Account;
    trueAccount: Account;
    userEmail: string;
    @Input() firstAccess: boolean;

    selectedFile: File | null = null;
    isModalVisible: boolean = false;

    constructor(
        private accountService: AccountService,
        private authService: AuthService,
        private toastr: ToastrService,
        private dateFormatPipe: DateFormatPipe
    ) {
        this.user = new User();
        this.user.account = new Account(); //
        this.account = new Account();
        this.trueAccount = new Account();
    }

    ngOnInit() {
        const userId = localStorage.getItem('user_id');

        const loggedUser = localStorage.getItem('logged_user');
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            const email = userObject.email;
            this.userEmail = email;
        } else {
            this.toastr.error('Usuário não encontrado no localStorage.')
        }
        this.account.accountImage = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s";
        this.account.userId = userId;

        if (!this.firstAccess) {
            this.authService
                .getUserById(userId)
                .subscribe ({
                    next: (response) => {
                        if (response.account.birthDate) {
                            const [day, month, year] = response.account.birthDate.split('/');
                            response.account.birthDate = `${year}-${month}-${day}`;
                        };
                        this.user = response;
                        this.trueAccount = { ...this.user.account };
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao carregar usuário.');
                    },
            });
        };

    }

    onSubmit() {

        if (this.firstAccess && this.account.birthDate) {
            this.account.birthDate = this.formatDateToSend(this.account.birthDate);
        } else if (!this.firstAccess && this.user.account.birthDate) {
            this.user.account.birthDate = this.formatDateToSend(this.user.account.birthDate);
        }

        if(this.firstAccess){
            this.accountService
            .insertAccount(this.account)
            .subscribe({
                next: (response) => {
                    this.account = response;
                    window.location.reload();
                    this.toastr.success('Cadastro de usuário finalizado com sucesso!');
                },
                error: (error) => {
                    this.toastr.error(error.error.error);
                }
            });
        } else {
            this.accountService
                .updateAccount(this.trueAccount.id, this.user.account)
                .subscribe({
                    next: (response) => {
                        if (response.birthDate) {
                            const [day, month, year] = response.birthDate.split('/');
                            response.birthDate = `${year}-${month}-${day}`;
                        };
                        this.user.account = response;
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error);
                    }
            });
            this.toastr.success('Usuário atualizado com sucesso');
            this.trueAccount = { ...this.user.account }
        }
    }

    @ViewChild('fileInput') fileInput!: ElementRef;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
            this.selectedFile = input.files[0];

            const reader = new FileReader();
            reader.onload = (e) => {
                if (e.target?.result) {
                    if (this.firstAccess) {
                        this.account.accountImage = e.target.result;
                    } else {
                        this.user.account.accountImage = e.target.result;
                    }

                }
        };
        reader.readAsDataURL(this.selectedFile);
        }
    }

    cancelAlteration() {
        this.user.account = { ...this.trueAccount };
        const [day, month, year] = this.user.account.birthDate.split('/');
        this.user.account.birthDate = `${year}-${month}-${day}`;
    }

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

    private formatDateToSend(date: string | Date): string {
        const parsedDate = new Date(date);
        const day = String(parsedDate.getUTCDate()).padStart(2, '0');
        const month = String(parsedDate.getUTCMonth() + 1).padStart(2, '0');
        const year = parsedDate.getUTCFullYear();

        return `${day}/${month}/${year}`;
    }

}
