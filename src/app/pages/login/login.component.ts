import { HttpClientModule } from '@angular/common/http';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterLink, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

    user: User;

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.user = new User();
    }

    onSubmit() {

        this.authService
            .tryLogin(this.user)
            .subscribe({
                next: (response) => {
                    const access_token = JSON.stringify(response);
                    localStorage.setItem('access_token', response.token);
                    localStorage.setItem('user_id', response.id);
                    this.router.navigate(['/home/graphic']);
                },
                error: (error) => {
                    if (this.user.email == null || this.user.password == null) {
                        this.toastr.error('Nenhum dos campos devem estar nulo.', 'Atenção!')
                    }
                    if (this.user.email != null || this.user.password != null) {
                        this.toastr.error('Usuário e/ou senha incorreto!');
                    }
                }
            })

    }

}
