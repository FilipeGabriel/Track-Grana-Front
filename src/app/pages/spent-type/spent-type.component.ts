import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { SpentCardComponent } from '../../components/spent-card/spent-card.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-spent-type',
  standalone: true,
  imports: [TitleComponent, SpentCardComponent, CommonModule],
  templateUrl: './spent-type.component.html',
  styleUrl: './spent-type.component.css'
})
export class SpentTypeComponent {

    selectedColor: string = '#B5B0B0';

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
