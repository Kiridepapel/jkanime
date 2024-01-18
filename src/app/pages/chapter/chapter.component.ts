import { Component } from '@angular/core';
import { environment } from '../../../environments/environment-prod';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
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
