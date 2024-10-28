import { Component, OnInit } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { SpentCardComponent } from '../../components/spent-card/spent-card.component';
import { CommonModule } from '@angular/common';
import { SpentType } from '../../models/spent-type';

@Component({
  selector: 'app-spent-type',
  standalone: true,
  imports: [TitleComponent, SpentCardComponent, CommonModule],
  templateUrl: './spent-type.component.html',
  styleUrl: './spent-type.component.css'
})
export class SpentTypeComponent implements OnInit{

    spentType: SpentType;
    spentTypes: SpentType[];

    selectedColor: string = '#B5B0B0';

    isModalVisible: boolean = false;

    constructor() {
        this.spentType = new SpentType();
    }

    ngOnInit() {

        this.spentTypes = [
            this.spentType = {
                description: 'Inter',
                spentValue: 150,
                color: '#f85c01',
                paid: false
            },
            this.spentType = {
                description: 'Bradesco',
                spentValue: 350,
                color: '#be0202',
                paid: false
            },
            this.spentType = {
                description: 'Nubank',
                spentValue: 200,
                color: '#7700ff',
                paid: false
            }
        ]

    }

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
