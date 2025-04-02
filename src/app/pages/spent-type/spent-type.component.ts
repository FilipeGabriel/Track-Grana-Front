import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { SpentCardComponent } from '../../components/spent-card/spent-card.component';
import { CommonModule } from '@angular/common';
import { SpentType } from '../../models/spent-type';
import { SpentTypeService } from '../../services/spent-type.service';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spent-type',
  standalone: true,
  imports: [TitleComponent, SpentCardComponent, CommonModule, FormsModule],
  templateUrl: './spent-type.component.html',
  styleUrl: './spent-type.component.css'
})
export class SpentTypeComponent implements OnInit{

    description: string | null;
    color: string | null = '#B5B0B0';

    spentType: SpentType;
    spentTypes: SpentType[];

    selectedColor: string = '#B5B0B0';

    isModalVisible: boolean = false;

    constructor(
        private toastr: ToastrService,
        private spentTypeService: SpentTypeService
    ) {
        this.spentType = new SpentType();
    }

    ngOnInit() {

        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
                },
                error: (error) => {
                    this.toastr.error("Nenhum tipo de gasto encontrado");
                }
            })

    }

    onColorChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.selectedColor = inputElement.value;
    }

    openModal() {
        this.isModalVisible = true;
    }

    saveSpentType() {
        this.spentTypeService
            .insertSpentType(this.description, this.color)
            .subscribe({
                next: (response) => {
                    this.spentType = response;
                    this.toastr.success("Tipo de gasto cadastrado com sucesso!");
                    this.closeModal();
                    this.refreshSpentTypes();
                },
                error: (error) => {
                    this.toastr.error(error.error.message);
                }
            })
    }

    refreshSpentTypes() {
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response) => {
                    this.spentTypes = response;
                }
            });
    }

    closeModal() {
        this.description = null;
        this.color = '#B5B0B0';
        this.selectedColor = '#B5B0B0';
        this.isModalVisible = false;
    }
}
