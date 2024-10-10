import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GraphicComponent } from './pages/graphic/graphic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'home', component: HomeComponent, children: [
        { path: 'graphic', component: GraphicComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'invoice', component: InvoiceComponent }
    ] }
];
