import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Account } from '../../models/account';
import { User } from '../../models/user';
import { AccountService } from '../../services/account.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleComponent, CommonModule, FormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {

    user: User;
    account: Account;
    trueAccount: Account;

    selectedFile: File | null = null;
    imageSrc: string | ArrayBuffer | null = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s" // Para armazenar a URL da imagem
    isModalVisible: boolean = false;

    constructor(private accountService: AccountService, private toastr: ToastrService) {
        this.account = new Account();
        this.trueAccount = new Account();
    }

    ngOnInit() {

        this.user = {
            email: 'teste@gmail.com',
            password: '123456'
        }

        this.accountService
            .getAccount()
            .subscribe({
                next: (response) => {
                    this.account = response;

                    this.trueAccount = { ...this.account };
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Usuário não encontrado!');
                }
        });

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

    onSubmit() {
        this.toastr.success('Usuário atualizado com sucesso');
        this.trueAccount = { ...this.account }
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
