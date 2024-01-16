import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { DarkModeService } from './shared/services/dark-mode.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'JKanime';

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.initDarkMode()
  }

  public get darkModeText(): string {
    return this.darkModeService.darkModeText;
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }
}
