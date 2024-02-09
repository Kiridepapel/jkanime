// Modules
import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
// Components
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';
import { ChapterItemComponent } from '../../components/chapter-item/chapter-item.component';
// Models
import { Mode } from '../../models/output.model';
import { HomePageDTO } from '../../models/page.model';
import { ChapterDataDTO } from '../../models/individual.model';
// Services
import { DarkModeService } from '../../services/dark-mode.service';
import { AnimeService } from '../../services/anime.service';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [
    CommonModule,
    AnimeItemComponent,
    ChapterItemComponent,
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
  public dark!: Mode;
  // Carousel
  private timerCarousel: any;
  public positionCarousel = 0;
  public startPosition = 0;
  public endPosition = 0;
  public isDragging = false;

  constructor(
    private animeService: AnimeService,
    private darkModeService: DarkModeService,
    private router: Router
  ) {
    this.darkModeSubscription = this.darkModeService.darkMode$.subscribe((mode: Mode) => {
      this.dark = mode;
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
          this.startTimerCarousel();
        });
    } finally {
      this.isLoading = false;
    }
  }
  
  ngOnDestroy() {
    this.darkModeSubscription.unsubscribe();
    if (this.timerCarousel) {
      clearInterval(this.timerCarousel);
    }
  }

  // Carousel
  private startTimerCarousel() {
    clearInterval(this.timerCarousel); // Detener cualquier intervalo existente
    this.timerCarousel = setInterval(() => {
      if (this.homeData && this.homeData.sliderAnimes && this.homeData.sliderAnimes.length > 0) {
        if (this.positionCarousel === this.homeData.sliderAnimes.length - 1) {
          this.positionCarousel = 0;
        } else {
          this.positionCarousel++;
        }
      }
    }, 5000);
  }

  public handleDragStart(event: TouchEvent | MouseEvent) {
    this.startPosition = event instanceof MouseEvent ? event.clientX : event.touches[0].clientX;
    this.isDragging = true; // Inicia el arrastre
    clearInterval(this.timerCarousel); // Detiene el intervalo del carrusel
  }
  
  public handleDragEnd(event: TouchEvent | MouseEvent) {
    if (!this.isDragging) return; // Ignora si no empezó un arrastre
    this.endPosition = event instanceof MouseEvent ? event.clientX : event.changedTouches[0].clientX;
    this.handleSwipeGesture();
    this.isDragging = false; // Termina el arrastre
    this.startTimerCarousel(); // Reinicia el intervalo del carrusel
  }
  
  public handleDragLeave(event: MouseEvent) {
    if (this.isDragging) {
      this.isDragging = false; // Termina el arrastre si el mouse sale del contenedor
      this.handleSwipeGesture();
    }
  }
  
  private handleSwipeGesture() {
    const threshold = 100; // Define un umbral para considerar un movimiento como un deslizamiento (px)
    const swipeRight = this.endPosition > this.startPosition + threshold;
    const swipeLeft = this.endPosition < this.startPosition - threshold;
  
    if (swipeRight) {
      this.prevPosCarousel(); // Mueve a la posición anterior
    } else if (swipeLeft) {
      this.nextPosCarousel(); // Mueve a la siguiente posición
    }
  }

  public changePosCarousel(index: number) {
    this.positionCarousel = index;
  }

  public prevPosCarousel() {
    if (this.positionCarousel > 0) {
      this.positionCarousel--;
    } else {
      this.positionCarousel = this.homeData.sliderAnimes.length - 1;
    }
  }

  public nextPosCarousel() {
    if (this.positionCarousel < this.homeData.sliderAnimes.length - 1) {
      this.positionCarousel++;
    } else {
      this.positionCarousel = 0;
    }
  }

  public toggleDarkMode() {
    this.darkModeService.toggleDarkMode();
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
