import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/individual.model';
import { TopDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent {
  public isLoading = true;
  public uri!: string;
  public name: string = '';
  public topData!: TopDTO;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;

  constructor(
    private animeService: AnimeService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.language = language;
        this.changeTitle();
      }
    );
  }
  
  async ngOnInit(){
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');
    // Realiza la solicitud de los datos
    try {
      await this.animeService.getGenericData("top").then((data: any) => {
        this.topData = data;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  private changeTitle() {
    document.title = this.textTranslate('Top actual', 'Current top');
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
