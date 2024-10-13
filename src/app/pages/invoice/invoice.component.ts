import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-invoice',
  standalone: true,
  imports: [TitleComponent, CommonModule],
  templateUrl: './invoice.component.html',
  styleUrl: './invoice.component.css'
})
export class InvoiceComponent {

    isModalVisible: boolean = false;

    openModal() {
        this.isModalVisible = true;
    }

    closeModal() {
        this.isModalVisible = false;
    }

}
