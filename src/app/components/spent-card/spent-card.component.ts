import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { SpentType } from '../../models/spent-type';

@Component({
  selector: 'app-spent-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spent-card.component.html',
  styleUrl: './spent-card.component.css'
})
export class SpentCardComponent {

    @Input()
    spentType: SpentType;

    selectedColor: string = '#000000';

    isModalVisible: boolean = false;

    constructor() {
    }

    onColorChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.spentType.color = inputElement.value;
    }

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
