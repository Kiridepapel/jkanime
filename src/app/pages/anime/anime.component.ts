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
  public ytSrcTrailer!: SafeResourceUrl;

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    document.title = 'Cargando...';
    const uri = window.location.href.replace(environment.FRONTEND_URL, '');

    try {
      await this.animeService.getGenericData(uri).then((data: AnimeInfoDTO) => {
        document.title = data.name;
        this.animeData = data;
        this.ytSrcTrailer = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${data.ytTrailerId}`);
      });
    } finally {
      this.isLoading = false;
    }
  }
}
