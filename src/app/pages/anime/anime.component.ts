import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';
import { AnimeInfoDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { ChapterDataDTO } from '../../models/individual.model';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss',
})
export class AnimeComponent {
  public isLoading = true; // Cargando los datos recibidos de la API
  public animeData!: AnimeInfoDTO; // Datos del anime
  public chapterList!: ChapterDataDTO[]; // Lista de capítulos
  // Chapters list
  public chaptersListFormat: string = 'table'; // table, list, cards
  public sort: boolean = false;
  public searchChapter: string = '';

  public trailer!: SafeResourceUrl; // URL del trailer
  public activeInfoIndex: number = 0;
  public activeTabIndex: number = 0;
  public uri!: string;
  // public areAlternativeTitlesVisible: boolean = false;
  private orderData = ["type", "genres", "studio", "director", "language", "year", "cast", "censured", "emited", "status", "lastUpdate", "chapters", "duration", "quality"];
  private orderAltTitles = ["synonyms", "english", "japanese", "corean"];
  private orderHistory = ["prequel", "sequel", "other", "alternativeVersion", "completeVersion", "additional", "summary", "includedCharacters"];
  private removeUrlSpecialCases = [
    "one-piece"
  ]

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer
  ) {}

  // Obtiene los datos de la API y espera a que se carguen
  async ngOnInit() {
    document.title = 'Cargando...';
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');

    try {
      await this.animeService.getGenericData(this.uri).then((data: AnimeInfoDTO) => {
        this.manipulateData(data);
      });
    } finally {
      this.isLoading = false;
    }
  }
  
  // Manipula los datos recibidos de la API
  private manipulateData(data: AnimeInfoDTO) {
    this.animeData = data;

    if (this.animeData.data != null) {
      document.title = this.animeData.name;
      this.animeData.imgUrl = this.animeData.imgUrl.split('?')[0];
      this.animeData.data = this.reorderData(data, this.orderData, 'data');
    }
    if (this.animeData.alternativeTitles != null) {
      this.animeData.alternativeTitles = this.reorderData(data, this.orderAltTitles, 'alternativeTitles');
    }
    if (this.animeData.history != null) {
      this.animeData.history = this.reorderData(data, this.orderHistory, 'history');
    }
    if (this.animeData.trailer != null) {
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeData.trailer);
    }
    if (this.animeData.firstChapter != null && this.animeData.lastChapter != null) {
      this.chapterList = this.createChapterList(this.animeData.firstChapter, this.animeData.lastChapter);
    }
  }

  public alterChaptersListFormat() {
    if (this.chaptersListFormat === 'table') {
      this.chaptersListFormat = 'list';
    } else if (this.chaptersListFormat === 'list') {
      this.chaptersListFormat = 'table';
    // } else {
    //   this.chaptersListFormat = 'table';
    }
  }

  public changeSortChapterList() {
    this.sort = !this.sort;
    this.chapterList.reverse();
  }

  public alterSort() {
    this.sort = !this.sort;
  }

  public filterChapters() {
    console.log(this.searchChapter);
    if (!this.searchChapter) {
      // Si el input está vacío, mostrar todos los capítulos
      this.chapterList = this.createChapterList(this.animeData.firstChapter, this.animeData.lastChapter);
    } else {
      // Filtrar la lista de capítulos
      this.chapterList = this.createChapterList(this.animeData.firstChapter, this.animeData.lastChapter)
        .filter(chapter => chapter.chapter.startsWith(this.searchChapter));
    }
  }

  private createChapterList(first: number, last: number): ChapterDataDTO[] {
    let list: ChapterDataDTO[] = [];
    let counter: number = last - 1;

    for (let i = first; i <= last; i++) {
      let chapterData: ChapterDataDTO = {
        // hacer que el string 1 se convierta en 01 y asi los primeros 9 numeros
        name: this.animeData.name,
        imgUrl: this.animeData.imgUrl,
        chapter: i.toString(),
        url: this.uri + "/" + i.toString(),
        date: this.firstUppercase(this.modifyDate(this.animeData.lastChapterDate, -(counter * 7), first))
      };
      list.push(chapterData);
      counter--;
    }

    return list;
  }

  public modifyDate(date: string, quantity: number, index: number) {
    if (index === this.animeData.lastChapter) {
      return date;
    } else {
      return this.animeService.modifyDate(date, quantity, index);
    }
  }
  
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

  public calcFromLikes(is: string): number {
    if (!this.animeData.likes) {
      this.animeData.likes = 0;
    }

    if (is === 'm') { // calcula la cantidad de personas mirando en base a los likes (siempre debe)
      return Math.floor(this.animeData.likes / 4.5112);
    }
    if (is === 'v') { // calcula la cantidad de personas visto en base a los likes
      return Math.floor(this.animeData.likes / 2.2523);
    }
    if (is === 'p') { // calcula la cantidad de personas por ver en base a los likes
      return Math.floor(this.animeData.likes / 16.5232);
    }

    return 0;
  }

  private reorderData(animeData: AnimeInfoDTO, list: string[], type: string): {[key: string]: any} {
    // Valor inicial
    let dataToUse;
    let orderedData: {[key: string]: any} = {};

    // Seleccionar el tipo de dato a usar
    if (type === 'data') {
      dataToUse = animeData.data;
    } else if (type === 'alternativeTitles') {
      dataToUse = animeData.alternativeTitles;
    } else if (type === 'history') {
      dataToUse = animeData.history;
    }

    // Ordenar los datos
    for (let key of list) {
      if (dataToUse!.hasOwnProperty(key)) {
        orderedData[key] = dataToUse![key];
      }
    }

    return orderedData;
  }
  
  // Selecciona el tab activo
  public selectInfo(index: number) {
    this.activeInfoIndex = index;
  }

  public selectTab(index: number) {
    this.activeTabIndex = index;
  }

  // Obtiene las keys de un map en forma de array
  public objectEntries(obj: {[key: string]: any}): [string, any][] {
    return Object.entries(obj);
  }

  // Verifica si el value del map es un array
  public isObject(value: any): boolean {
    return typeof value === "object";
  }

  // Escribir el nombre de las keys en español
  public changeName(name: string): string {
    let map = new Map();
    // Data
    map.set("emited", "Emitido");
    map.set("language", "Idioma");
    map.set("quality", "Calidad");
    map.set("duration", "Duracion");
    map.set("type", "Tipo");
    map.set("director", "Director");
    map.set("censured", "Censura");
    map.set("cast", "Actor");
    map.set("lastUpdate", "Actualizado");
    map.set("year", "Año");
    map.set("studio", "Estudio");
    map.set("genres", "Género");
    map.set("status", "Estado");
    map.set("chapters", "Capítulos");
    // History
    map.set("prequel", "Precuela");
    map.set("sequel", "Secuela");
    map.set("alternativeVersion", "Versión alternativa");
    map.set("completeVersion", "Versión completa");
    map.set("additional", "Adicional");
    map.set("summary", "Resumen");
    map.set("includedCharacters", "Personajes incluidos");
    map.set("other", "Otro");
    // Recomendations
    return map.get(name);
  }

  public changeNameAltTitle(name: string): string {
    let map = new Map();
    // Alternative titles
    map.set("synonyms", "Sinónimos");
    map.set("english", "Inglés");
    map.set("japanese", "Japonés");
    map.set("corean", "Coreano");
    return map.get(name);
  }

  // Escribe el nombre de la key en singular o plural
  public singularOrPlural(name: string, list: any[]): string {
    let newName = this.changeName(name);
    let isIrregular = this.isIrregularPlural(newName);
    return list.length > 1 ? (isIrregular ? newName + "es" : newName + "s") : newName;
  }

  // Verifica si el nombre de la key es irregular
  private isIrregularPlural(name: string): boolean {
    let list = ["Actor", "Director", "Adicional", "Resumen"]; 
    return list.includes(name);
  }

  // Escribe la primera letra en mayúscula de los values de las keys
  public firstUppercase(value: any): string {
    return this.animeService.firstUppercase(value);
  }

  // Muestra el día de la última actualización del anime
  public parseAndFormatDate(value: string, showYear: boolean): string {
    return this.animeService.parseAndFormatDate(value, showYear);
  }

  public searchAnime(url: string): string {
    this.removeUrlSpecialCases.forEach((item) => {
      if (url.includes(item)) {
        url = "search/" + item;
      }
    });

    return url;
  }

  public activate(index: number) {
    document.querySelectorAll(".acc")[index]!.classList.toggle("show");
  }

}
