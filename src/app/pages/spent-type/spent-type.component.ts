import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';
import { SpentCardComponent } from '../../components/spent-card/spent-card.component';

@Component({
  selector: 'app-spent-type',
  standalone: true,
  imports: [TitleComponent, SpentCardComponent],
  templateUrl: './spent-type.component.html',
  styleUrl: './spent-type.component.css'
})
export class SpentTypeComponent {

}
