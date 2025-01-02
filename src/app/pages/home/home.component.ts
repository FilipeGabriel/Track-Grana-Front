import { Component, Input, input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../template/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { UserComplete } from '../../models/userClomplete';
import { CommonModule } from '@angular/common';
import { ProfileComponent } from "../profile/profile.component";

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet, CommonModule, ProfileComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    id: string | null;
    firstAccess: boolean;

    constructor(
        private authService: AuthService
    ) {

    }

    ngOnInit() {

        this.authService
            .getUserById()
            .subscribe({
                next: (response) => {
                    const loggedUser = new UserComplete(
                        response.email,
                        response.registrationDate,
                        response.account
                    )
                    if(loggedUser.account == null){
                        this.firstAccess = true
                    } else {
                        this.firstAccess = false
                    }
                    localStorage.setItem('logged_user', JSON.stringify(loggedUser));
                }
        });

    }

}
