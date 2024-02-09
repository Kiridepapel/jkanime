import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Mode } from '../models/output.model';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {
  private language: string = 'es';
  private languageSubject = new BehaviorSubject<Mode>({
    value: this.language,
    icon: this.language === 'es' ? 'spanish_icon' : 'english_icon',
    // styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
  });

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
      icon: this.language === 'es' ? 'spanish_icon' : 'english_icon',
      // styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
    });
  }
}
