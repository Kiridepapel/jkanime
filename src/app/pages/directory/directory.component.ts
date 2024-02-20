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
    let uri = window.location.href.split("/");
    let name = uri[uri.length - 1];

    try {
      await this.animeService.getGenericData(name).then((data: any) => {
        this.data = data;
      });
    } finally {
      this.isLoading = false;
    }
  }
}
