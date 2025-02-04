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
                    localStorage.setItem('access_token', response.token);
                    localStorage.setItem('user_id', response.id);
                    localStorage.setItem('selected_year', '');

                    this.authService
                        .getUserById()
                        .subscribe({
                            next: (userData) => {
                                const loggedUser = {
                                    email: userData.email,
                                    registrationDate: userData.registrationDate,
                                    account: userData.account
                                };
                                localStorage.setItem('logged_user', JSON.stringify(loggedUser));

                                this.router.navigate(['/home/graphic']);
                            },
                            error: (error) => {
                                this.toastr.error('Erro ao buscar dados do usuário.');
                            }
                    });
                },
                error: (error) => {
                    if (!this.user.email || !this.user.password) {
                        this.toastr.error('Nenhum dos campos deve estar nulo.', 'Atenção!');
                    } else {
                        this.toastr.error('Usuário e/ou senha incorreto!');
                    }
                }
        });
    }

}
