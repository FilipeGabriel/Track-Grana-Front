import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../template/sidebar/sidebar.component';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { Account } from '../../models/account';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

    id: string | null;
    user: User;
    account: Account;

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
                    this.user = response;
                    console.log(this.user)
                }
            });

    }

}
