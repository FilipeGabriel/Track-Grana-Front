import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../models/user';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ToastrService } from 'ngx-toastr';

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

    constructor(
        private authService: AuthService,
        private router: Router,
        private toastr: ToastrService
    ) {
        this.user = new User();
    }

    signUp(){
        if (!this.user.email || !this.user.password) {
            this.toastr.error('Nenhum dos campos deve estar nulo.');
        } else {
            this.authService
                .insert(this.user)
                .subscribe({
                    next: (response) => {
                        this.toastr.success('Cadastro realizado com sucesso', 'Parabéns!');
                        this.user.email = "";
                        this.user.password = "";
                        this.router.navigate(['/login']);
                    },
                    error: (error) => {
                        this.toastr.error(error.error.error, 'Erro ao cadastrar!');
                    }
                })
        }
    }
}
