import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DarkModeService {
  private darkMode: boolean = false;

  public initDarkMode() {
    if (!localStorage.getItem('dark')) {
      localStorage.setItem('dark', this.darkMode.toString());
    }
    this.darkMode = localStorage.getItem('dark') === 'true';
    this.updateUI();
  }

  public get darkModeIcon(): string {
    return this.darkMode ? 'fa-regular fa-sun' : 'fa-solid fa-moon';
  }

  public get darkModeText(): string {
    return this.darkMode ? 'Activar modo claro' : 'Activar modo oscuro';
  }

  public toggleDarkMode() {
    this.darkMode = !this.darkMode;
    this.updateUI();
  }

  private updateUI() {
    document.documentElement.classList.toggle('dark', this.darkMode);
    localStorage.setItem('dark', this.darkMode.toString());
  }
}
