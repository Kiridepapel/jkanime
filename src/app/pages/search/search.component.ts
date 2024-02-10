import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { SearchDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';
import { ActivatedRoute } from '@angular/router';
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/output.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [AnimeItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public isLoading: boolean = true;
  public name: string = '';
  public searchData!: SearchDTO;
  public searchFront!: string;
  public searchBack!: string;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Translate variables
  private txtSearching: string = 'Buscando ';
  private txtResults: string = 'Resultados de';

  constructor(
    private animeService: AnimeService, 
    private route: ActivatedRoute,
    private languageService: LanguageService
  ) {
    this.languageSubscription = this.languageService.language$.subscribe((language) => {
      this.language = language;
      this.changeTitle();
    });
  }

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.updateSearchData();
    });
  }
  
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }

  private async updateSearchData() {
    document.title = this.txtSearching + 'animes...';
    this.isLoading = true;
    this.defineData();

    try {
      await this.animeService.getGenericData(this.searchBack).then((data: SearchDTO) => {
        this.searchData = data;
        document.title = this.txtResults + this.name;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  private defineData() {
    this.searchBack = window.location.href.replace(environment.FRONTEND_URL, '');
    this.searchFront = this.searchBack.split('/').slice(0, 3).join('/');
    this.searchBack = this.searchFront.replace('buscar', 'search');
    this.name = this.searchBack.split('/')[1].replace(/_/g, ' ');
  }

  private changeTitle() {
    if (this.isLoading) {
      document.title = this.textTranslate('Buscando ', 'Searching ') + 'animes...';
    } else {
      document.title = this.textTranslate('Resultados de ', 'Results for ') + this.name;
    }
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
