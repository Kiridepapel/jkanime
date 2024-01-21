import { Component } from '@angular/core';
import { environment } from '../../../environments/environment-prod';
import { AnimeService } from '../../services/anime.service';
import { SpecificChapterDTO } from '../../models/page.model';
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
  public animeUrl!: string; // Pagina del anime
  public actualSrcLoadIndex = 0; // Indice del src option cargado actualmente
  public actualSrcOption!: SafeResourceUrl; // Url del src option cargado actualmente

  public isLoading = true; // Se vuelve false cuando se termina de recibir todos los datos del backend
  public chapterData!: SpecificChapterDTO; // Información del capítulo recibido del backend

  constructor(
    private animeService: AnimeService, 
    private sanitizer: DomSanitizer
  ) {}

  async ngOnInit() {
    const uri = window.location.href.replace((environment.FRONTEND_URL), "");
    this.animeUrl = uri.split("/")[0];
    
    try {
      await this.animeService.getGenericData(uri).then((data: any) => {
        this.chapterData = data;
        this.chapterData.name = this.chapterData.name.toUpperCase();
        // Sanear la URL antes de asignarla
        this.actualSrcOption = this.sanitizer.bypassSecurityTrustResourceUrl(this.chapterData.srcOptions[0]?.url);
        this.select(this.actualSrcLoadIndex);
      });
    } finally {
      this.isLoading = false;
    }
  }

  public loadSrcOption(index: number, url: string) {
    // this.actualSrcOption = url;
    // this.sanitizer.bypassSecurityTrustResourceUrl(url);
    this.select(index);
  }

  public select(index: number) {
    console.log(index);
    // Encuentra el contenedor padre con la clase 'options'
    const optionsContainer = document.querySelector('.options');
  
    if (optionsContainer) {
      // Obtiene todos los elementos 'a' dentro del contenedor
      const links = optionsContainer.querySelectorAll('a');
  
      // Elimina la clase 'active' de todos los enlaces
      links.forEach(link => link.classList.remove('active'));
  
      // Agrega la clase 'active' al enlace en el índice especificado
      if (links[index]) {
        links[index].classList.add('active');
      }
    }
  
    this.actualSrcLoadIndex = index;
  }
}
