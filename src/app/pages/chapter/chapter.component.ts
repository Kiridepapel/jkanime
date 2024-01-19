import { Component } from '@angular/core';
import { environment } from '../../../environments/environment-prod';
import { AnimeService } from '../../services/anime.service';
import { SpecificChapterDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-chapter',
  standalone: true,
  imports: [],
  templateUrl: './chapter.component.html',
  styleUrl: './chapter.component.scss'
})
export class ChapterComponent {
  public animeUrl!: string;

  public isLoading = true;
  public chapterData!: SpecificChapterDTO;
  public actualSrcOption!: SafeResourceUrl;
  public loadNumber = 0;

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
      });
    } finally {
      this.isLoading = false;
    }
  }

  public loadSrcOption(url: string) {
    this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document.getElementsByClassName("servers")[0].children[alterNumber].classList.remove("active");
    document.getElementsByClassName("servers")[0].children[index].classList.add("active");
  }
}
