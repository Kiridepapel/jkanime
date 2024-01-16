import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  public goTo(route: string, noCloseNav?: boolean) {
    this.router.navigate([route]);
    
    if (!noCloseNav) {
      const menu = document.querySelector('.menu');
      menu?.classList.toggle('opened');
      this.toggleNav();
    }
  }

  public get darkModeIcon(): string {
    return this.darkModeService.darkModeIcon;
  }

  public toggleDarkMode(event: Event) {
    this.darkModeService.toggleDarkMode(event);
  }

  public toggleNav() {
    this.navState = !this.navState;
  }
}
