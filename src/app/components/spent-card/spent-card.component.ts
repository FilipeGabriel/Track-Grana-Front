import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { SpentType } from '../../models/spent-type';
import { FormsModule } from '@angular/forms';
import { SpentTypeService } from '../../services/spent-type.service';

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
        private spentTypeService: SpentTypeService
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
        this.spentType.name = this.tempDescription;
        this.spentType.color = this.tempColor;
        this.isModalVisible = false;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
