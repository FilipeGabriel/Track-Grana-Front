import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../template/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Account } from '../../models/account';
import { UserComplete } from '../../models/userClomplete';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
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
        this.id = this.authService.getUserId();

        this.authService
            .getUserById(this.id)
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
                    console.log(this.firstAccess)
                    localStorage.setItem('logged_user', JSON.stringify(loggedUser));
                }
        });

    }

}
