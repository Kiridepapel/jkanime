import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DarkMode } from '../models/output.model';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkMode: boolean = true;
  private darkModeSubject = new BehaviorSubject<DarkMode>({
    darkMode: this.darkMode,
    darkModeIcon: this.darkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon',
    darkModeStyles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
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

  public toggleDarkMode(event: Event) {
    event.preventDefault();
    this.darkMode = !this.darkMode;
    this.saveNext();
    this.updateUI();
  }

  public get darkMode$() {
    return this.darkModeSubject.asObservable();
  }

  private saveNext(): void {
    this.darkModeSubject.next({
      darkMode: this.darkMode,
      darkModeIcon: this.darkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon',
      darkModeStyles: this.darkMode ? 'text-2xl max-md:text-2xl' : 'text-3xl max-md:text-3xl',
    });
  }

  private updateUI() {
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('dark', this.darkMode.toString());
  }
}
