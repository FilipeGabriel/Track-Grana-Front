import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, MatTooltipModule, RouterLink],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

    isCollapsed = false;
    reducedScreen = false

    constructor(
        private authService: AuthService,
        private router: Router
    ) { }

    ngOnInit() {
        this.checkScreenWidth();
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
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
