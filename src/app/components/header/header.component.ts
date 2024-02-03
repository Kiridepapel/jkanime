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

  // Así se clierra el menú de navegación
  // public closeNavWithAnimation(closeNav?: boolean) {
  //   if (closeNav) {
  //     const menu = document.querySelector('.menu');
  //     menu?.classList.toggle('opened');
  //     this.toggleNav();
  //   }
  // }

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
  }

  public searchAnime(): void {
    let formattedQuery = this.searchQuery.trim().replace(/\s+/g, '_');
    console.log("buscar: " + '/buscar', formattedQuery, '1');
    this.router.navigate(['/buscar', formattedQuery, '1']);
  }
}
