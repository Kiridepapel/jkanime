import { LanguageService } from './../../services/language.service';
import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/individual.model';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;

  @Input() public type!: number;
  @Input() public style?: string = "rounded"; // rounded, square

  // type 0: none
  // type 1: category only
  @Input() public category?: any;
  @Input() public bg?: string = "red"; // red, primary, secondary
  // type 2: chapter
  @Input() public chapter?: string;
  @Input() public viewed?: boolean = false;

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

  public defaultTranslate(text: string): string {
    if (text.includes('Pelicula')) {
      return text.replace('Pelicula', this.textTranslate('Pelicula', 'Movie'));
    }
    if (text.includes('Especial')) {
      return text.replace('Especial', this.textTranslate('Especial', 'Special'));
    }
    return text;
  }

}
