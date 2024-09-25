import { CommonModule } from '@angular/common';
import { Component, HostListener, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css'
})
export class SidebarComponent implements OnInit{

    isCollapsed = false;
    reducedScreen = false

    ngOnInit() {
        this.checkScreenWidth();
    }

    @HostListener('window:resize', ['$event'])onResize() {
        this.checkScreenWidth();
    }

    checkScreenWidth() {
        this.reducedScreen = window.innerWidth < 800;
        if (this.reducedScreen) {
          this.isCollapsed = true;
        }
    }

    toggleSidebar() {
        this.isCollapsed = !this.isCollapsed;
    }

}
