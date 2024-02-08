import { Component, Input } from '@angular/core';
import { DarkModeService } from '../../services/dark-mode.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DarkMode } from '../../models/output.model';
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
  // Darkmode
  private darkModeSubscription!: Subscription;
  public mode!: DarkMode;

  constructor(
    private router: Router,
    private darkModeService: DarkModeService,
  ) {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((mode: DarkMode) => {
      this.mode = mode;
    });
  }
  
  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }

  public goTo(route: string) {
    this.router.navigate([route]);
  }

  public toggleDarkMode(event: Event) {
    this.darkModeService.toggleDarkMode(event);
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

    // Format query and navigate to search page with query and page 1
    let formattedQuery = this.searchQuery.trim().replace(/\s+/g, '_');
    this.router.navigate(['/buscar', formattedQuery, '1']);
  }
}
