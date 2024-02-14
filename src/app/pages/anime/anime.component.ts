import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';
import { AnimeInfoDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChapterDataDTO } from '../../models/individual.model';
import { FormsModule } from '@angular/forms';
import { ChapterItemComponent } from '../../components/chapter-item/chapter-item.component';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/output.model';
import { LanguageService } from '../../services/language.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ChapterItemComponent],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss',
})
export class AnimeComponent {
  public isLoading = true;
  public uri!: string;
  public animeData!: AnimeInfoDTO;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Variables de idioma
  public showData: Map<string, any> = new Map();
  public showAltTitles: Map<string, any> = new Map();
  public showHistory: Map<string, any> = new Map();
  // Orden de los datos
  private orderData = ["type", "genres", "studio", "director", "language", "cast", "censured", "status", "emited", "chapters", "duration", "quality"];
  private orderAltTitles = ["synonyms", "english", "japanese", "corean"];
  private orderHistory = ["prequel", "sequel", "derived", "other", "alternativeVersion", "completeVersion", "additional", "summary", "includedCharacters"];
  private removeUrlSpecialCases = ["one-piece"]
  // Data
  public trailer!: SafeResourceUrl;
  public activeInfoIndex: number = 0;
  public activeTabIndex: number = 0;
  // Chapters list
  public chapterList: ChapterDataDTO[] = [];
  public chaptersListFormat: string = 'list'; // table, list, cards
  public sort: boolean = false;
  public searchChapter: string = '';

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer,
    private languageService: LanguageService,
  ) {
    this.languageSubscription = this.languageService.language$.subscribe((language: Mode) => {
      this.language = language;
      this.changeTitle();
      if (this.isLoading === false) {
        this.createShowData();
        this.createShowAltTitles();
        this.createShowHistory();
      }
    });
  }

  // Obtiene los datos de la API y espera a que se carguen
  async ngOnInit() {
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');

    try {
      await this.animeService.getGenericData(this.uri).then((data: AnimeInfoDTO) => {
        this.animeData = data;
        this.chapterList = this.animeData.chapterList;
        this.chapterList.length > 12 ? this.chaptersListFormat = 'table' : this.chaptersListFormat = 'list';
        this.manipulateData(data);
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  
  
  ngOnDestroy() {
    this.languageSubscription.unsubscribe();
  }
  
  private manipulateData(data: AnimeInfoDTO) {
    if (this.animeData.data != null) {
      this.animeData.imgUrl = this.animeData.imgUrl.split('?')[0]; // Quita el resize de la imagen
      this.animeData.data = this.reorderData(data.data, this.orderData);
      this.createShowData();
    }
    if (this.animeData.alternativeTitles != null) {
      this.animeData.alternativeTitles = this.reorderData(data.alternativeTitles, this.orderAltTitles);
      this.createShowAltTitles();
    }
    if (this.animeData.history != null) {
      this.animeData.history = this.reorderData(data.history, this.orderHistory);
      this.createShowHistory();
    }
    if (this.animeData.trailer != null) {
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeData.trailer);
    }
  }

  // Crea la url de un capítulo
  public calcChapterUrl(chapter: string): string {
    return this.uri + "/" + parseInt(chapter, 10).toString();
  }

  // Cambia los nombres de las keys de los datos
  public createShowData(): void {
    if (this.animeData.data != null) {
      let map = new Map();
      map.set("emited", this.textTranslate('Emitido', 'Emited'));
      map.set("language", this.textTranslate('Idioma', 'Language'));
      map.set("quality", this.textTranslate('Calidad', 'Quality'));
      map.set("duration", this.textTranslate('Duración', 'Duration'));
      map.set("type", this.textTranslate('Tipo', 'Type'));
      map.set("director", this.textTranslate('Director', 'Director'));
      map.set("censured", this.textTranslate('Censurado', 'Censured'));
      map.set("cast", this.textTranslate('Reparto', 'Cast'));
      map.set("lastUpdate", this.textTranslate('Actualizado', 'Last update'));
      map.set("year", this.textTranslate('Año', 'Year'));
      map.set("studio", this.textTranslate('Estudio', 'Studio'));
      map.set("genres", this.textTranslate('Géneros', 'Genres'));
      map.set("status", this.textTranslate('Estado', 'State'));
      map.set("chapters", this.textTranslate('Capítulos', 'Chapters'));

      this.showData = new Map(); // Reiniciar el map
      this.objectEntries(this.animeData.data).forEach((value) => {
        if (map.get(value[0]) != null) {
          this.showData.set(map.get(value[0]), value[1]);
        }
      });
    }
  }

  public createShowAltTitles(): void {
    if (this.animeData.alternativeTitles != null) {
      let map = new Map();
      map.set("synonyms", this.textTranslate('Sinónimos', 'Synonyms'));
      map.set("english", this.textTranslate('Inglés', 'English'));
      map.set("japanese", this.textTranslate('Japonés', 'Japanese'));
      map.set("corean", this.textTranslate('Coreano', 'Corean'));
      
      this.showAltTitles = new Map(); // Reiniciar el map
      this.objectEntries(this.animeData.alternativeTitles).forEach((value) => {
        if (map.get(value[0]) != null) {
          this.showAltTitles.set(map.get(value[0]), value[1]);
        }
      });
    }
  }

  public createShowHistory(): void {
    if (this.animeData.history != null) {
      let map = new Map();
      map.set("prequel", this.textTranslate('Precuela', 'Prequel'));
      map.set("sequel", this.textTranslate('Secuela', 'Sequel'));
      map.set("derived", this.textTranslate('Derivado', 'Derived'));
      map.set("alternativeVersion", this.textTranslate('Versión alternativa', 'Alternative version'));
      map.set("completeVersion", this.textTranslate('Versión completa', 'Complete version'));
      map.set("additional", this.textTranslate('Adicional', 'Additional'));
      map.set("summary", this.textTranslate('Resumen', 'Summary'));
      map.set("includedCharacters", this.textTranslate('Personajes incluidos', 'Included characters'));
      map.set("other", this.textTranslate('Otro', 'Other'));
      
      this.showHistory = new Map(); // Reiniciar el map
      this.objectEntries(this.animeData.history).forEach((value) => {
        if (map.get(value[0]) != null) {
          this.showHistory.set(map.get(value[0]), value[1]);
        }
      });
    }
  }

  public alterChaptersListFormat() {
    if (this.chaptersListFormat === 'table') {
      this.chaptersListFormat = 'list';
    } else if (this.chaptersListFormat === 'list') {
      this.chaptersListFormat = 'table';
    }
  }

  // Cambia el orden de los datos
  public changeSortChapterList() {
    this.sort = !this.sort;
    this.chapterList.reverse();
  }

  public alterSort() {
    this.sort = !this.sort;
  }

  // Filtra los capítulos
  public filterChapters() {
    if (!this.searchChapter) {
      this.chapterList = this.animeData.chapterList;
    } else {
      this.chapterList = this.animeData.chapterList
        .filter(chapter => chapter.chapter.startsWith(this.searchChapter));
    }
  }
  
  // Valida si el capítulo es nuevo en base a los días especificados
  public isNewestChapter(daysBefore: number): boolean {
    if (this.animeData.lastChapterDate != null) {
      const spanishMonths = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
      let [monthStr, dayStr, yearStr] = this.animeData.lastChapterDate.split(/[\s,]+/);
      let month = spanishMonths.indexOf(monthStr.toLowerCase());
      let day = parseInt(dayStr);
      let year = parseInt(yearStr);
  
      const lastChapterDate = new Date(year, month, day);
      const currentDate = new Date();
      const oneWeekInMillis = daysBefore * 24 * 60 * 60 * 1000; // Milisegundos en una semana
      let value = currentDate.getTime() - lastChapterDate.getTime() <= oneWeekInMillis;
      
      return value;
    } else {
      return false;
    }
  }

  // Calcula la cantidad de personas mirando, visto y por ver
  public calcFromLikes(is: string): number {
    if (this.animeData.likes != null) {
      if (is === 'm') { // mirando
        return Math.floor(this.animeData.likes / 4.5112);
      }
      if (is === 'v') { // visto
        return Math.floor(this.animeData.likes / 2.2523);
      }
      if (is === 'p') { // por ver
        return Math.floor(this.animeData.likes / 16.5232);
      }
    } else {
      this.animeData.likes = 0;
    }
    return 0;
  }

  private reorderData(dataToUse: any, dataToSort: string[]): {[key: string]: any} {
    let orderedData: {[key: string]: any} = {};

    for (let key of dataToSort) {
      if (dataToUse!.hasOwnProperty(key)) {
        orderedData[key] = dataToUse![key];
      }
    }

    return orderedData;
  }

  // Obtiene las keys de un map en forma de array
  public objectEntries(obj: {[key: string]: any}): [string, any][] {
    return Object.entries(obj);
  }

  // Verifica si el value del map es un array
  public isObject(value: any): boolean {
    return typeof value === "object";
  }

  // Muestra el día de la última actualización del anime
  public parseAndFormatDate(value: string, showYear: boolean): string {
    return this.animeService.parseAndFormatDate(value, showYear, this.language.value);
  }

  public searchAnime(url: string): string {
    this.removeUrlSpecialCases.forEach((item) => {
      if (url.includes(item)) {
        url = "search/" + item;
      }
    });

    return url;
  }
  
  // Muestra u oculta la información adicional o la sinopsis
  public selectTab(index: number) {
    this.activeTabIndex = index;
  }

  // Muestra u oculta los titulos alternativos o la historia
  public activateAcc(index: number) {
    document.querySelectorAll(".acc")[index]!.classList.toggle("show");
  }

  private changeTitle() {
    if (this.isLoading) {
      document.title = this.textTranslate('Cargando ', 'Loading ') + '...';
    } else {
      document.title = this.animeData.name;
    }
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }

  public urlTranslate(spanish: string, english?: string) {
    return this.languageService.urlTranslate(spanish, english);
  }
}
