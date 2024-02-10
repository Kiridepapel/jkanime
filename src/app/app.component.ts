import { LanguageService } from './services/language.service';
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { DarkModeService } from './services/dark-mode.service';
import { HeaderComponent } from './components/header/header.component';
import { JKAnimeComponent } from './pages/jkanime/jkanime.component';
import { FooterComponent } from './components/footer/footer.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    HttpClientModule,
    CommonModule,
    RouterOutlet,
    HeaderComponent,
    JKAnimeComponent,
    FooterComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'JKanime';

  constructor(
    private darkModeService: DarkModeService,
    private languageService: LanguageService
  ) {}

  ngOnInit() {
    this.darkModeService.initDarkMode();
    this.languageService.initLanguage();
  }
}
