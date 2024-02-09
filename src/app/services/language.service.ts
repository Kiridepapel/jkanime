import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Mode } from '../models/output.model';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language: string = 'es';
  private languageSubject = new BehaviorSubject<Mode>({
    value: this.language,
    icon: this.language === 'es' ? 'assets/svgs/es.svg' : 'assets/svgs/en.svg',
    // styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
  });

  constructor(private router: Router) {}

  public get language$() {
    return this.languageSubject.asObservable();
  }

  public toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
    this.saveNext();
  }

  private saveNext(): void {
    this.languageSubject.next({
      value: this.language,
      icon: this.language === 'es' ? 'assets/svgs/es.svg' : 'assets/svgs/en.svg',
      // styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
    });
  }

  public textTranslate(spanish: string, english: string): string {
    if (this.language === 'es') {
      return spanish;
    } else if (this.language === 'en') {
      return english;
    }
    return spanish;
  }

  public goToTranslate(spanish: string, english?: string) {
    if (this.language === 'es') {
      this.router.navigate([spanish]);
    } else if (this.language === 'en') {
      this.router.navigate([english]);
    }

    return spanish;
  }
}
