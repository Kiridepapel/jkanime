import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DarkModeService } from '../../services/dark-mode.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent, FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public navState: boolean = false;
  public searchQuery: string = '';

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
  ) {}

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  public get darkModeIcon(): string {
    return this.darkModeService.darkModeIcon;
  }

  public get darkModeStyles(): string {
    return this.darkModeService.darkModeStyles;
  }

  public toggleDarkMode(event: Event) {
    this.darkModeService.toggleDarkMode(event);
  }

  public toggleNav() {
    this.navState = !this.navState;
    const menu = document.getElementById('menuBtn');
    menu?.classList.toggle('opened');
    menu?.setAttribute('aria-expanded', menu.classList.contains('opened').toString());
  }

  public searchAnime(): void {
    if (window.innerWidth < 640) {
      this.toggleNav();
    }

    let formattedQuery = this.searchQuery.trim().replace(/\s+/g, '_');
    console.log("buscar: " + '/buscar', formattedQuery, '1');
    this.router.navigate(['/buscar', formattedQuery, '1']);
  }
}
