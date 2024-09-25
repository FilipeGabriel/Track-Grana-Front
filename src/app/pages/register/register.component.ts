import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})

export class RegisterComponent {

    user: User
    success: boolean;
    successMessage: string;
    errorMessage: string;

    constructor( private authService: AuthService ) {
        this.user = new User();
    }

    signUp(){
        this.authService
            .insert(this.user)
            .subscribe({
                next: (response) => {
                    this.user.username = ""
                    this.user.password = ""
                    this.user.email = ""
                },
                error: (error) => {
                    console.log(error)
                }
            })
    }
}
