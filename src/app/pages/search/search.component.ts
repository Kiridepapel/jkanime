import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { SearchDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';
import { ActivatedRoute } from '@angular/router';
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';

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

  public searchFront!: string;
  public searchBack!: string;
  public searchData!: SearchDTO;

  test: string = 'Hola';

  constructor(
    private animeService: AnimeService, 
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.params.subscribe(() => {
      this.updateSearchData();
    });
  }
  
  private async updateSearchData() {
    document.title = 'Buscando animes...';
    this.isLoading = true;
    this.defineData();

    try {
      await this.animeService.getGenericData(this.searchBack).then((data: SearchDTO) => {
        this.searchData = data;
        document.title = 'Resultados de ' + this.name;
      });
    } finally {
      this.isLoading = false;
    }
  }

  private defineData() {
    this.searchBack = window.location.href.replace(environment.FRONTEND_URL, '');
    console.log('searchBack: ' + this.searchBack);
    this.searchFront = this.searchBack.split('/').slice(0, 3).join('/');
    this.searchBack = this.searchFront.replace('buscar', 'search');
    this.name = this.searchBack.split('/')[1].replace(/_/g, ' ');
  }
}
