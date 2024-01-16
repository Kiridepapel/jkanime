import { Component } from '@angular/core';
import { DarkModeService } from '../../shared/services/dark-mode.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private darkModeService: DarkModeService) {}
  
  public get darkModeText(): string {
    return this.darkModeService.darkModeText;
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
