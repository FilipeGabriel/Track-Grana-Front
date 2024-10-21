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

    isModalVisible: boolean = false;

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
