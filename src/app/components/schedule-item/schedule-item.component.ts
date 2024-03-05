import { Component, Input } from '@angular/core';
import { ChapterDataDTO, Mode } from '../../models/individual.model';
import { ImgComponent } from '../img/img.component';
import { TagComponent } from '../tag/tag.component';
import { Subscription } from 'rxjs';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-schedule-item',
  standalone: true,
  imports: [ImgComponent, TagComponent],
  templateUrl: './schedule-item.component.html',
  styleUrl: './schedule-item.component.scss'
})
export class ScheduleItemComponent {
  @Input() public chapterInfo!: ChapterDataDTO;
  
  @Input() public animTo!: string;
  @Input() public objFit!: string;
  @Input() public objPos!: string;
  
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;

  constructor(private languageService: LanguageService) {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
    });
  }
  
  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
