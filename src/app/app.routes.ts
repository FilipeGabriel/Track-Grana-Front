import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { GraphicComponent } from './pages/graphic/graphic.component';
import { ProfileComponent } from './pages/profile/profile.component';
import { InvoiceComponent } from './pages/invoice/invoice.component';
import { SpentTypeComponent } from './pages/spent-type/spent-type.component';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent, canActivate: [ authGuard ] },
    { path: 'home', component: HomeComponent,  canActivate: [ authGuard ], children: [
        { path: 'graphic', component: GraphicComponent },
        { path: 'profile', component: ProfileComponent },
        { path: 'invoice', component: InvoiceComponent },
        { path: 'spent', component: SpentTypeComponent }
    ] },
    {path: '', redirectTo: '/login', pathMatch: 'full'}
];
