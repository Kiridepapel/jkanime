import { LanguageService } from './../../services/language.service';
import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Mode } from '../../models/individual.model';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from '../../services/auth.service';
import { AuthRequestDTO } from '../../models/auth.model';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  public navState: boolean = false;
  public searchPlaceholder: string = '';
  public authBlock: boolean = false;
  public timer: any;
  public isLogged: boolean = false;
  // Forms
  public searchForm!: FormGroup;
  public authForm!: FormGroup;
  // Subscriptions
  private darkModeSubscription!: Subscription;
  private languageSubscription!: Subscription;
  public dark!: Mode;
  public language!: Mode;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
    private languageService: LanguageService,
    private authService: AuthService,
    private formBuilder: FormBuilder
  ) {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((dark: Mode) => {
      this.dark = dark;
    });
    this.languageSubscription = this.languageService.language$.subscribe((language: Mode) => {
      this.language = language;
    });
  }

  ngOnInit() {
    this.variablesTranslate();
    this.reactiveForms();
    
    if (localStorage.getItem('token')) {
      this.isLogged = true;
    }
  }
  
  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
    this.languageSubscription.unsubscribe();
  }

  reactiveForms(): void {
    this.searchForm = this.formBuilder.group({
      search: ['', [Validators.required]],
    });

    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  public startTimer() {
    this.authBlock = false;
    this.timer = setTimeout(() => {
      this.authBlock = true;
    }, 1000);
  }

  public checkTimer() {
    clearTimeout(this.timer);
  }
  
  public stopPropagation(event: MouseEvent) {
    event.stopPropagation();
  }

  public login() {
    let data: AuthRequestDTO = {
      email: this.authForm.get('email')?.value,
      password: this.authForm.get('password')?.value,
    };
    
    if (this.authForm.valid) {
      this.authService.login(data)
        .then(() => {
          // this.authBlock = false;
          this.isLogged = true;
          this.authForm.reset();
        })
    }
  }

  public logout() {
    localStorage.removeItem('token');
    this.isLogged = false;
  }

  public goToRouter(pathEs: string, pathEn: string) {
    // Close nav on mobile
    if (window.innerWidth < 1024) {
      this.toggleNav();
    }

    this.router.navigate([this.textTranslate(pathEs, pathEn)]);
  }

  public variablesTranslate(): void {
    this.searchPlaceholder = this.language.value === 'es' ? 'Buscar animes...' : 'Search animes...';
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
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
    let pathValue = this.language.value === 'es' ? '/buscar' : '/search';
    let search = this.searchForm.get('search')?.value.trim().replace(/\s+/g, '_')

    // Format query and navigate to search page with query and page 1
    this.router.navigate([pathValue, search, '1']);
  }
}
