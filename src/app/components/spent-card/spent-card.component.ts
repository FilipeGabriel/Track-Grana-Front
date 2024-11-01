import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SpentType } from '../../models/spent-type';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-spent-card',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './spent-card.component.html',
  styleUrl: './spent-card.component.css'
})
export class SpentCardComponent {

    @Input()
    spentType: SpentType;
    tempDescription: string = '';
    tempColor: string = '';

    isModalVisible: boolean = false;

    constructor() {
    }

    openModal() {
        this.tempDescription = this.spentType.description;
        this.tempColor = this.spentType.color;
        this.isModalVisible = true;
    }

    onColorChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.tempColor = inputElement.value;
    }

    saveChanges() {
        this.spentType.description = this.tempDescription;
        this.spentType.color = this.tempColor;
        this.isModalVisible = false;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
