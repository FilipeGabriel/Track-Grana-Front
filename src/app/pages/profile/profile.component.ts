import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';
import { DateFormatPipe } from '../../pipes/date-format.pipe';

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
    imageSrc: string | ArrayBuffer | null = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s"
    isModalVisible: boolean = false;

    constructor(
        private accountService: AccountService,
        private toastr: ToastrService,
        private dateFormatPipe: DateFormatPipe
    ) {
        this.account = new Account();
        this.trueAccount = new Account();
    }

    ngOnInit() {
        const loggedUser = localStorage.getItem('logged_user')
        if (loggedUser) {
            const userObject = JSON.parse(loggedUser);
            const email = userObject.email;
            this.userEmail = email;
        } else {
            this.toastr.error('Usuário não encontrado no localStorage.')
        }
        this.account.accountImg = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s";
        this.account.userId = localStorage.getItem('user_id')
    }

    onSubmit() {
        if (this.account.birthDate) {
            this.account.birthDate = this.dateFormatPipe.transform(this.account.birthDate);
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
            this.toastr.success('Usuário atualizado com sucesso');
            this.trueAccount = { ...this.account }
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
                this.account.accountImg = e.target.result;
                }
        };
        reader.readAsDataURL(this.selectedFile);
        }
    }

    cancelAlteration() {
        this.account = { ...this.trueAccount }
    }

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
