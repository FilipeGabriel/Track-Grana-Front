import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-spent-card',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './spent-card.component.html',
  styleUrl: './spent-card.component.css'
})
export class SpentCardComponent {

    selectedColor: string = '#000000';

    isModalVisible: boolean = false;

    onColorChange(event: Event) {
        const inputElement = event.target as HTMLInputElement;
        this.selectedColor = inputElement.value;
    }

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
