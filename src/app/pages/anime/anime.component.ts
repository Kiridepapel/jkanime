import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';
import { AnimeInfoDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss',
})
export class AnimeComponent {
  public isLoading = true;
  public animeData!: AnimeInfoDTO;
  public trailer!: SafeResourceUrl;

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    document.title = 'Cargando...';
    const uri = window.location.href.replace(environment.FRONTEND_URL, '');

    try {
      await this.animeService.getGenericData(uri).then((data: AnimeInfoDTO) => {
        this.manipulateData(data);
      });
    } finally {
      this.isLoading = false;
    }
  }

  private manipulateData(data: AnimeInfoDTO) {
    this.animeData = data;
    document.title = this.animeData.name;
    // Trailer
    if (this.animeData.trailer) {
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeData.trailer);
    }
  }
}
