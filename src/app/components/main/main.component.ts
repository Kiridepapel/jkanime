import { Component } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';
import { ButtonComponent } from '../button/button.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private darkModeService: DarkModeService, private router: Router) {}

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  public get darkModeText(): string {
    return this.darkModeService.darkModeText;
  }

  public toggleDarkMode(event: Event) {
    this.darkModeService.toggleDarkMode(event);
  }
}
