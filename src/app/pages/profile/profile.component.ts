import { Component, ElementRef, ViewChild } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleComponent, CommonModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

    selectedFile: File | null = null;
    imageSrc: string | ArrayBuffer | null = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s" // Para armazenar a URL da imagem
    isModalVisible: boolean = false;


    @ViewChild('fileInput') fileInput!: ElementRef;

    onFileSelected(event: Event): void {
        const input = event.target as HTMLInputElement;
        if (input.files && input.files.length > 0) {
        this.selectedFile = input.files[0];

        const reader = new FileReader();
        reader.onload = (e) => {
            if (e.target?.result) {
            this.imageSrc = e.target.result; // Armazena a imagem como URL
            }
        };
        reader.readAsDataURL(this.selectedFile); // Lê o arquivo como URL de dados
        }
    }

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
