import { Component } from '@angular/core';
import { TitleComponent } from '../../components/title/title.component';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [TitleComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

}
