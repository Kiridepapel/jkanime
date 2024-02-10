import { Component } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/output.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;

  constructor(private languageService: LanguageService) {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
    });
  }

  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }

}
