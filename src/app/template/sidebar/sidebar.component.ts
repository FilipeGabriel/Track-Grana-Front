import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

    isCollapsed = false;
    reducedScreen = false;
    defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSwGsNv23K5shKblMsKePA8o6M2kqBH39PZqA&s';
    userImage: string | ArrayBuffer | null = this.defaultImage;

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.checkScreenWidth();
        this.getUser();
        this.authService.userImage$.subscribe((newImage) => {
            this.userImage = newImage || this.defaultImage;
        });
    }

    @HostListener('window:resize', ['$event'])onResize() {
        this.checkScreenWidth();
    }

    checkScreenWidth() {
        this.reducedScreen = window.innerWidth < 900;
        if (this.reducedScreen) {
          this.isCollapsed = true;
        }
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

    logout() {
        this.userImage = this.defaultImage;
        this.authService.logout();
        this.router.navigate(['/login']);
    }

    getUser() {
        this.authService
            .getUserById()
            .subscribe({
                next: (response) => {
                    this.userImage = response.account?.accountImage || this.defaultImage;
                },
                error: () => {
                    this.userImage = this.defaultImage;
                }
            })
    }

}
