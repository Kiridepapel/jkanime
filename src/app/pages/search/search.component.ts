import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { SearchDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/individual.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [RouterModule, AnimeItemComponent],
  templateUrl: './search.component.html',
  styleUrl: './search.component.scss',
})
export class SearchComponent {
  public isLoading: boolean = true;
  public uri!: string;
  public uriBack!: string;
  public name: string = '';
  public search: string = '';
  public page: number = 1;
  public searchData!: SearchDTO;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Translate variables
  private txtSearching: string = 'Buscando ';
  private txtResults: string = 'Resultados de';

  constructor(
    private animeService: AnimeService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguageService
  ) {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.language = language;
        this.changeTitle();
      }
    );
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
    this.isLoading = true;
    this.defineData();

    try {
      await this.animeService
        .getGenericData(this.uriBack)
        .then((data: SearchDTO) => {
          this.searchData = data;
          document.title = this.txtResults + this.name;
        });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  private defineData() {
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');
    this.uriBack = this.uri.replace('buscar', 'search');

    let splitUri = this.uri.split('/');

    // Si no se indica la pagina
    if (splitUri.length === 2) {
      splitUri.push('1');
      this.uriBack = this.uriBack + '/1';
    }

    this.search = splitUri[1];
    this.name = this.search.replaceAll('_', ' ');
    this.page = parseInt(splitUri[2]);

    console.log('page', this.page);
  }

  public previousSearch() {
    let splitUri = this.uri.split('/');
    return this.textTranslate('buscar', 'search') + '/' + splitUri[1] + '/' + (this.page - 1);
  }

  public nextSearch() {
    let splitUri = this.uri.split('/');
    return this.textTranslate('buscar', 'search') + '/' + splitUri[1] + '/' + (this.page + 1);
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
