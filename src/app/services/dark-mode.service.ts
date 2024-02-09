import { Injectable } from '@angular/core';
import { Mode } from '../models/output.model';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkMode: boolean = true;
  private darkModeSubject = new BehaviorSubject<Mode>({
    value: this.darkMode,
    icon: this.darkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon',
    styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
  });

  public initDarkMode() {
    if (!localStorage.getItem('dark')) {
      localStorage.setItem('dark', this.darkMode.toString());
    }

    // Similar to toggleDarkMode
    this.darkMode = localStorage.getItem('dark') === 'true';
    this.saveNext();
    this.updateUI();
  }

  public toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.saveNext();
    this.updateUI();
  }

  public get darkMode$() {
    return this.darkModeSubject.asObservable();
  }

  private saveNext(): void {
    this.darkModeSubject.next({
      value: this.darkMode,
      icon: this.darkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon',
      styles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
    });
  }

  private updateUI() {
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('dark', this.darkMode.toString());
  }
}
