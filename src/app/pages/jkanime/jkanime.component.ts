// Modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
// Components
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';
import { ChapterItemComponent } from '../../components/chapter-item/chapter-item.component';
// Models
import { DarkMode } from '../../models/output.model';
import { HomePageDTO } from '../../models/page.model';
import { ChapterDataDTO } from '../../models/individual.model';
// Services
import { DarkModeService } from '../../services/dark-mode.service';
import { AnimeService } from '../../services/anime.service';
// Others
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [
    CommonModule,
    AnimeItemComponent,
    ChapterItemComponent,
    CarouselModule,
  ],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {
  // Home page
  public isLoading = true;
  public homeData!: HomePageDTO;
  public activeList!: ChapterDataDTO[];
  public timer: any;
  // Darkmode
  private darkModeSubscription!: Subscription;
  public mode!: DarkMode;
  // Owl carousel
  carouselOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoWidth: true,
    autoplayTimeout: 5000,
    autoplaySpeed: 900,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    dots: true,
    navSpeed: 900,
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 1
      },
      740: {
        items: 1
      },
      940: {
        items: 1
      }
    },
    // nav: true
  };

  constructor(
    private animeService: AnimeService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((mode: DarkMode) => {
      this.mode = mode;
    });
  }

  async ngOnInit() {
    document.title = 'Cargando...';

    try {
      await this.animeService
        .getGenericData('animes')
        .then((data: HomePageDTO) => {
          this.homeData = data;
          document.title = 'Ver ánime online';
          this.activeList = this.homeData.animesProgramming;
        });
    } finally {
      this.isLoading = false;
    }
  }
  
  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
  }

  public toggleDarkMode(event: Event) {
    this.darkModeService.toggleDarkMode(event);
  }

  public getGridArea(position: number): string {
    switch (position) {
      case 1:
        return 'one';
      case 2:
        return 'two';
      case 3:
        return 'three';
      case 4:
        return 'four';
      case 5:
        return 'five';
      case 6:
        return 'six';
      case 7:
        return 'seven';
      case 8:
        return 'eight';
      case 9:
        return 'nine';
      case 10:
        return 'ten';
    }
    return '';
  }

  public removeTv(url: string): string {
    return url.replace('(TV)', '').trim();
  }
  
  public randomAnime() {
    let random = Math.floor(Math.random() * this.homeData.animesProgramming.length);
    this.goTo(this.homeData.animesProgramming[random].url.split('/')[0]);
  }

  public goTo(url: string) {
    this.router.navigate(['/' + url]);
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document
      .getElementsByClassName('options')[0]
      .children[alterNumber].classList.remove('active');
    document
      .getElementsByClassName('options')[0]
      .children[index].classList.add('active');

    this.activeList =
      index == 0
        ? this.homeData.animesProgramming
        : this.homeData.donghuasProgramming;
  }
}
