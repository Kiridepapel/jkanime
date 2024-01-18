import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss'
})
export class AnimeComponent {
  public isLoading = true;
  private frontendUrl = environment.FRONTEND_URL;

  constructor(private animeService: AnimeService) {}

  async ngOnInit() {
    const uri = window.location.href.replace((this.frontendUrl), "");
    
    try {
      await this.animeService.getGenericData(uri);
    } finally {
      this.isLoading = false;
    }
  }

}
