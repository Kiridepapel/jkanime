import { Component, Input } from '@angular/core';
import { environment } from '../../../environments/environment-prod';
import { AnimeService } from '../../services/anime.service';
import { ChapterDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  @Input() chapterName!: string; // Nombre del capítulo
  public animeUrl!: string; // Pagina del path del anime

  public isFetchingData = true; // Se vuelve false cuando se termina de recibir todos los datos del backend
  public chapter!: ChapterDTO; // Información del capítulo recibido del backend
  public mainSrcIndex = 0; // Indice del src cargado inicialmente
  public mainSrcOption!: SafeResourceUrl; // Url del src cargado inicialmente

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    document.title = "Cargando...";
    const uri = window.location.href.replace((environment.FRONTEND_URL), "");
    this.animeUrl = uri.split("/")[0];
    
    try {
      await this.animeService.getGenericData(uri).then((data: any) => {
        this.chapter = data;
        document.title = this.chapter.name + " " + this.chapter.actualChapterNumber;
        this.mainSrcOption = this.sanitizer.bypassSecurityTrustResourceUrl(this.chapter.srcOptions[0]?.url);
        this.selectSrc(this.mainSrcIndex, this.chapter.srcOptions[this.mainSrcIndex]?.url);
      });
    } finally {
      this.isFetchingData = false;
    }
  }

  public getPreviousChapterUrl() {
    return `${this.animeUrl}/${Number(this.chapter.actualChapterNumber) - 1}`;
  }

  public goToAnime() {
    window.location.href = this.animeUrl;
  }

  public getNextChapterUrl() {
    return `${this.animeUrl}/${Number(this.chapter.actualChapterNumber) + 1}`;
  }

  public selectSrc(index: number, url: string) {
    const optionsContainer = document.querySelector('.options');

    if (optionsContainer) {
      this.mainSrcOption = this.sanitizer.bypassSecurityTrustResourceUrl(url);

      const links = optionsContainer.querySelectorAll('a');
      links.forEach(link => link.classList.remove('active'));
  
      if (links[index]) {
        links[index].classList.add('active');
      }
    }
  
    this.mainSrcIndex = index;
  }
}
