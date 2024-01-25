import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { environment } from '../../../environments/environment-prod';
import { AnimeInfoDTO } from '../../models/page.model';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { parse, format } from 'date-fns';
import { es } from 'date-fns/locale';

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
  private order = ["type", "genres", "studio", "director", "language", "year", "cast", "censured", "emited", "status", "lastUpdate", "chapters", "duration", "quality"];

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
    this.animeData.imgUrl = this.animeData.imgUrl.split('?')[0];
    this.animeData.data = this.reorderData(data.data);
    document.title = this.animeData.name;
    if (this.animeData.trailer) {
      this.trailer = this.sanitizer.bypassSecurityTrustResourceUrl(this.animeData.trailer);
    }
  }

  private reorderData(data: {[key: string]: any}): {[key: string]: any} {
    let orderedData: {[key: string]: any} = {};
  
    for (let key of this.order) {
      if (data.hasOwnProperty(key)) {
        orderedData[key] = data[key];
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

  // Escribir el nombre de la key en español
  public changeName(name: string): string {
    let map = new Map();
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
    let list = ["Actor", "Director"]; 
    return list.includes(name);
  }

  // Verifica si el título y el título alternativo son iguales
  public isEquals(value1: string, value2: string): boolean {
    return value1 === value2;
  }

  // Escribe la primera letra en mayúscula de los values de las keys
  public firstUppercase(value: string): string {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  // Muestra el día de la última actualización del anime
  public parseAndFormatDate(value: string): string {
    try {
      let date = parse(value, 'MMMM d, yyyy', new Date(), { locale: es });
      // aumentarle 7 dias
      date.setDate(date.getDate() + 7);
      const formattedDate = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
      return this.firstUppercase(formattedDate);
    } catch (error) {
      console.error('Error al parsear la fecha:', error);
      return "Desconocido"
    }
  }

}
