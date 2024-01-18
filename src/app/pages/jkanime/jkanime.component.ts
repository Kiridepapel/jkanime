import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AnimeService } from '../../services/anime.service';
import { HomePageDTO } from '../../models/page.model';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {
  public isLoading = true;
  public page = 1;
  public homeData: HomePageDTO = new HomePageDTO();
  
  constructor(private animeService: AnimeService) {}

  async ngOnInit() {
    try {
      await this.animeService.getGenericData("page/" + this.page).then((data: any) => {
        this.homeData = data;
        
      });
      
    } finally {
      this.isLoading = false;
    }
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document.getElementsByClassName("buttons")[0].children[alterNumber].classList.remove("active");
    document.getElementsByClassName("buttons")[0].children[index].classList.add("active");

  }
}
