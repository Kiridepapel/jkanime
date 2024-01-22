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

  myData: any = {
    title: 'JKanime',
    description: 'JKanime es un sitio web de anime online gratis sin restricciones.',
    image: 'https://jkanime.net/img/logo.png',
    url: 'https://jkanime.net/',
  };

  constructor(private darkModeService: DarkModeService) {}

  ngOnInit() {
    this.darkModeService.initDarkMode();
  }
}
