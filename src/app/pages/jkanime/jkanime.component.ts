import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AnimeService } from '../../services/anime.service';
import { HomePageDTO } from '../../models/page.model';
import { Router } from '@angular/router';
import { ChapterDataDTO } from '../../models/individual.model';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {
  public isLoading = true;
  public homeData!: HomePageDTO;
  public activeList!: ChapterDataDTO[];
  
  constructor(private animeService: AnimeService, private router: Router) {}

  async ngOnInit() {
    document.title = "Cargando...";
    
    try {
      await this.animeService.getGenericData("animes").then((data: HomePageDTO) => {
        this.homeData = data;
        document.title = "Ver ánime online";
        this.activeList = this.homeData.animesProgramming;
      });
    } finally {
      this.isLoading = false;
    }
  }

  gotTo(url: string) {
    this.router.navigate(["/" + url]);
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document.getElementsByClassName("buttons")[0].children[alterNumber].classList.remove("active");
    document.getElementsByClassName("buttons")[0].children[index].classList.add("active");

    this.activeList = index == 0 ? this.homeData.animesProgramming : this.homeData.donghuasProgramming;
  }
}
