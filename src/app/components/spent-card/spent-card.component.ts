import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpentType } from '../../models/spent-type';
import { FormsModule } from '@angular/forms';
import { SpentTypeService } from '../../services/spent-type.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-spent-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spent-card.component.html',
  styleUrl: './spent-card.component.css'
})
export class SpentCardComponent {

    @Input() spentType: SpentType;
    tempDescription: string = '';
    tempColor: string = '';
    spentTypeActual: SpentType;

    isModalVisible: boolean = false;

    constructor(
        private spentTypeService: SpentTypeService,
        private toastr: ToastrService,
    ) { }

    openModal() {
        this.tempDescription = this.spentType.name;
        this.tempColor = this.spentType.color;
        this.isModalVisible = true;
    }

    onColorChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.tempColor = inputElement.value;
    }

    saveChanges() {
        this.updateSpentType(this.spentType);
        this.isModalVisible = false;
    }

    closeModal() {
        this.spentType.name = this.tempDescription;
        this.spentType.color = this.tempColor;
        this.isModalVisible = false;
    }

    updateSpentType(spentType: SpentType) {
        this.spentTypeService
            .updateSpentTypeNameColor(spentType)
            .subscribe({
                next: (response) => {
                    this.spentType = response;
                    this.toastr.success("Tipo de gasto atualizado com sucesso!");
                    this.getSpentTypeById(this.spentType.id)
                    this.closeModal();
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Erro Alterar o Tipo de gasto.');
                }
            })
    }

    getSpentTypeById(spentId: number| string) {
        this.spentTypeService
            .getAllSpentsType()
            .subscribe({
                next: (response: SpentType[]) => {
                    const found = response.find(st => st.id === spentId);
                    if (found) {
                        this.spentType = found;
                    } else {
                        this.toastr.warning('Tipo de gasto não encontrado.');
                    }
                },
                error: (error) => {
                    this.toastr.error(error.error.error, 'Erro ao buscar o tipo de gasto.');
                }
            });
    }

}
