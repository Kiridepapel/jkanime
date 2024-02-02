import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AnimeService } from '../../services/anime.service';
import { HomePageDTO } from '../../models/page.model';
import { Router } from '@angular/router';
import { ChapterDataDTO } from '../../models/individual.model';
import { ChapterItemComponent } from '../../components/chapter-item/chapter-item.component';
import { CommonModule } from '@angular/common';
import { TagComponent } from '../../components/tag/tag.component';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [ButtonComponent, ChapterItemComponent, TagComponent, CommonModule],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {
  public isLoading = true;
  public homeData!: HomePageDTO;
  public activeList!: ChapterDataDTO[];
  public timer: any;
  
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

  public getGridArea(position: number): string {
    switch (position) {
      case 1: return "one"
      case 2: return "two"
      case 3: return "three"
      case 4: return "four"
      case 5: return "five"
      case 6: return "six"
      case 7: return "seven"
      case 8: return "eight"
      case 9: return "nine"
      case 10: return "ten"
    }
    return "";
  }

  public removeTv(url: string): string {
    return url.replace('(TV)', '').trim();
  }
    

  gotTo(url: string) {
    this.router.navigate(["/" + url]);
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document.getElementsByClassName("options")[0].children[alterNumber].classList.remove("active");
    document.getElementsByClassName("options")[0].children[index].classList.add("active");

    this.activeList = index == 0 ? this.homeData.animesProgramming : this.homeData.donghuasProgramming;
  }
}
