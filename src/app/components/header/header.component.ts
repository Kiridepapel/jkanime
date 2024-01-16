import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public navState: boolean = false;

  constructor(private darkModeService: DarkModeService) {}

  public get darkModeIcon(): string {
    return this.darkModeService.darkModeIcon;
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  public toggleNav() {
    this.navState = !this.navState;
  }
}
