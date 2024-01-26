import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';
import { AnimeInfoDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-anime',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './anime.component.html',
  styleUrl: './anime.component.scss',
})
export class AnimeComponent {
  public isLoading = true; // Cargando los datos recibidos de la API
  public animeData!: AnimeInfoDTO; // Datos del anime
  public trailer!: SafeResourceUrl; // URL del trailer
  public selectedIndex: number = 0; // Tab activo
  // public areAlternativeTitlesVisible: boolean = false;
  private orderData = ["type", "genres", "studio", "director", "language", "year", "cast", "censured", "emited", "status", "lastUpdate", "chapters", "duration", "quality"];
  private orderAltTitles = ["synonyms", "english", "japanese", "corean"];
  private orderHistory = ["prequel", "sequel", "alternativeVersion", "completeVersion", "additional", "summary", "includedCharacters"];

  constructor(
    private animeService: AnimeService,
    private sanitizer: DomSanitizer
  ) {}

  // Obtiene los datos de la API y espera a que se carguen
  async ngOnInit() {
    document.title = 'Cargando...';
    const uri = window.location.href.replace(environment.FRONTEND_URL, '');
    console.log(uri);

    try {
      await this.animeService.getGenericData(uri).then((data: AnimeInfoDTO) => {
        this.manipulateData(data);
      });
    } finally {
      this.isLoading = false;
    }
  }
  
  // Manipula los datos obtenidos de la API
  private manipulateData(data: AnimeInfoDTO) {
    this.animeData = data;
    // Ordenar los títulos alternativos solo si existen (si está disponible el ánime en el proveedor 1)
    if (this.animeData.data) {
      document.title = this.animeData.name;
      this.animeData.imgUrl = this.animeData.imgUrl.split('?')[0];
      this.animeData.data = this.reorderData(data, this.orderData, 'data');
    }
    if (this.animeData.alternativeTitles) {
      this.animeData.alternativeTitles = this.reorderData(data, this.orderAltTitles, 'alternativeTitles');
    }
    if (this.animeData.history) {
      this.animeData.history = this.reorderData(data, this.orderHistory, 'history');
    }
    // Si existe el trailer, sanitizar la url para poder usarla en el iframe (es de YT)
    if (this.animeData.trailer) {
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeData.trailer);
    }
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
  public select(index: number) {
    this.selectedIndex = index;
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

  public searchAnime(value: string): string {
    let cases = ['\\(Serie\\)', '\\(Original\\)', '\\(Especial\\)', '\\(Pelicula\\)', '\\(OVA\\)'];
    let regex = new RegExp(cases.join('|'), 'g');
    return value.replace(' ', '+').replace(regex, '').replace(/\(\)/g, '');
  }

}
