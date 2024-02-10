import { LanguageService } from './../../services/language.service';
import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Mode } from '../../models/output.model';
import { Subscription } from 'rxjs/internal/Subscription';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public navState: boolean = false;
  public searchQuery: string = '';
  public searchPlaceholder: string = '';
  // Subscriptions
  private darkModeSubscription!: Subscription;
  private languageSubscription!: Subscription;
  public dark!: Mode;
  public language!: Mode;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    private languageService: LanguageService,
  ) {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((dark: Mode) => {
      this.dark = dark;
    });
    this.languageSubscription = this.languageService.language$.subscribe((language: Mode) => {
      this.language = language;
    });
  }

  public ngOnInit() {
    this.variablesTranslate();
  }
  
  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  public variablesTranslate(): void {
    this.searchPlaceholder = this.language.value === 'es' ? 'Buscar animes...' : 'Search animes...';
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }

  public urlTranslate(spanish: string, english?: string) {
    return this.languageService.urlTranslate(spanish, english);
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
  }

  public toggleLanguage() {
    this.languageService.toggleLanguage();
    this.variablesTranslate();
  }

  public toggleNav() {
    this.navState = !this.navState;
    const menu = document.getElementById('menuBtn');
    menu?.classList.toggle('opened');
    menu?.setAttribute('aria-expanded', menu.classList.contains('opened').toString());
  }

  public searchAnime(): void {
    // Close keyboard on mobile
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }

    // Close nav on mobile
    if (window.innerWidth < 640) {
      this.toggleNav();
    }

    // Traduction
    let value = this.language.value === 'es' ? '/buscar' : '/search';

    // Format query and navigate to search page with query and page 1
    let formattedQuery = this.searchQuery.trim().replace(/\s+/g, '_');
    this.router.navigate([value, formattedQuery, '1']);
  }
}
