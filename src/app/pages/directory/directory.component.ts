import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent {
  isLoading = true;
  data: any;

  constructor(private animeService: AnimeService) {}
  
  async ngOnInit(){
    try {
      await this.animeService.getGenericData("test").then((data: any) => {
        this.data = data;
      });
    } finally {
      this.isLoading = false;
    }
  }
}
