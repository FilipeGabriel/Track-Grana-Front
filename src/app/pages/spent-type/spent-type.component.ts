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

        this.spentTypes = [
            this.spentType = {
                description: 'Inter',
                spentValue: 150,
                color: '#f85c01',
                paid: false,
                userId: "1"
            },
            this.spentType = {
                description: 'Bradesco',
                spentValue: 350,
                color: '#be0202',
                paid: false,
                userId: "1"
            },
            this.spentType = {
                description: 'Nubank',
                spentValue: 200,
                color: '#7700ff',
                paid: false,
                userId: "1"
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

    saveSpentType() {
        this.spentTypeService
            .insertSpentType(this.description, this.color)
            .subscribe({
                next: (response) => {
                    this.spentType = response;
                    this.toastr.success("Tipo de gasto cadastrado com sucesso!");
                    this.closeModal();
                },
                error: (error) => {
                    this.toastr.error(error.error.error);
                }
            })
    }

    closeModal() {
        this.description = null;
        this.color = '#B5B0B0';
        this.selectedColor = '#B5B0B0';
        this.isModalVisible = false;
    }

}
