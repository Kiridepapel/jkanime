import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DarkModeService } from '../../services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public navState: boolean = false;

  constructor(
    private darkModeService: DarkModeService,
  ) {}

  public goTo(route: string, noCloseNav?: boolean) {
    window.location.href = route;
    
    if (!noCloseNav) {
      const menu = document.querySelector('.menu');
      menu?.classList.toggle('opened');
      this.toggleNav();
    }
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
  }
}
