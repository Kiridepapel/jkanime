import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Mode } from '../models/output.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  private language: string = 'es';
  private languageSubject = new BehaviorSubject<Mode>({
    value: this.language,
    icon:
      this.language === 'es'
        ? 'assets/svgs/en-circle.svg'
        : 'assets/svgs/es-circle.svg',
  });

  public initLanguage() {
    if (!localStorage.getItem('language')) {
      localStorage.setItem('language', this.language);
    }

    this.language = localStorage.getItem('language') || 'es';
    this.saveNext();
    this.saveLocalStorage();
  }

  public get language$() {
    return this.languageSubject.asObservable();
  }

  public toggleLanguage() {
    this.language = this.language === 'es' ? 'en' : 'es';
    this.saveNext();
    this.saveLocalStorage();
  }

  private saveNext(): void {
    this.languageSubject.next({
      value: this.language,
      icon:
        this.language === 'es'
          ? 'assets/svgs/en-circle.svg'
          : 'assets/svgs/es-circle.svg',
    });
  }

  private saveLocalStorage() {
    localStorage.setItem('language', this.language);
  }

  public textTranslate(spanish: string, english?: string): string {
    if (spanish != null && this.language === 'es') {
      return spanish;
    } else if (english != null && this.language === 'en') {
      return english!;
    }

    return spanish;
  }

  public urlTranslate(spanish: string, english?: string) {
    if (spanish != null && this.language === 'es') {
      return spanish;
    } else if (english != null && this.language === 'en') {
      return english!;
    }

    return spanish;
  }
}
