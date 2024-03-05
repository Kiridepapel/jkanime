import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AnimeService } from '../../services/anime.service';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { ChapterDataDTO, Mode } from '../../models/individual.model';
import { ScheduleDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';
import { FormsModule } from '@angular/forms';
import { ScheduleItemComponent } from '../../components/schedule-item/schedule-item.component';
import { ExternalScriptService } from '../../services/external-script.service';

@Component({
  selector: 'app-schedule',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, ScheduleItemComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss'
})
export class ScheduleComponent {
  public isLoading = true;
  public uri!: string;
  public name: string = '';
  public scheduleData!: ScheduleDTO;
  public animeList: ChapterDataDTO[] = [];
  public filter: string = '';
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Variables
  public selectedDay!: number;
  public daysMap = new Map<number, ChapterDataDTO[]>();
  public allDaysMap: ChapterDataDTO[] = [];
  public filteredAnimes: ChapterDataDTO[] = [];
  public daysList: string[] = ['', '', '', '', '', '', '']; // Asignado en changeDayNames()

  constructor(
    private animeService: AnimeService,
    private languageService: LanguageService,
    private externalScript: ExternalScriptService
  ) {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.language = language;
        this.changeTitle();
        this.setDayNames();
      }
    );
  }

  async ngOnInit(){
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');
    this.setDayNames();

    try {
      await this.animeService.getGenericData("schedule").then((data: any) => {
        // Información de la API
        this.scheduleData = data;
        // Asignar la lista de dias a un mapa
        this.setDaysInfo();
        // Asignar todos los animes con su índice a un solo mapa para permitir el filtrado y seleccion automática
        for(const [key, value] of this.daysMap.entries()) {
          value.forEach((chapter) => {
            this.allDaysMap.push(chapter);
          });
        }
        // Carga el script de Disqus
        this.externalScript.loadDisqusScript();
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  public selectDay(index: number) {
    this.filter = '';
    if (index !== this.selectedDay) {
      this.selectedDay = index;
    }
  }

  private setDayNames() {
    // Asignar los nombres de los días en base al idioma
    this.daysList = [
      this.textTranslate('Lunes', 'Monday'),
      this.textTranslate('Martes', 'Tuesday'),
      this.textTranslate('Miércoles', 'Wednesday'),
      this.textTranslate('Jueves', 'Thursday'),
      this.textTranslate('Viernes', 'Friday'),
      this.textTranslate('Sábado', 'Saturday'),
      this.textTranslate('Domingo', 'Sunday')
    ];
  }

  public getDayAndMonthFromDate(date: string) {
    let day = date.substring(0, 2);
    let month = date.substring(6, date.length);

    let months: Map<String, String> = new Map([
      ['Enero', '01'],
      ['Febrero', '02'],
      ['Marzo', '03'],
      ['Abril', '04'],
      ['Mayo', '05'],
      ['Junio', '06'],
      ['Julio', '07'],
      ['Agosto', '08'],
      ['Septiembre', '09'],
      ['Octubre', '10'],
      ['Noviembre', '11'],
      ['Diciembre', '12']
    ]);

    // 02 de Marzo
    return day + '/' + months.get(month);
  }

  private setDaysInfo() {
    // Selecciona el día actual
    this.selectedDay = this.scheduleData.todayValue;

    // Asignar los animes de cada día a un mapa con su índice para mostrarlos en base al día seleccionado
    this.daysMap = new Map([
      [0, this.scheduleData.monday],
      [1, this.scheduleData.tuesday],
      [2, this.scheduleData.wednesday],
      [3, this.scheduleData.thursday],
      [4, this.scheduleData.friday],
      [5, this.scheduleData.saturday],
      [6, this.scheduleData.sunday]
    ]);
  }

  private changeTitle() {
    document.title = this.textTranslate('Horario', 'Schedule');
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }

  public filters() {
    // Filtrar los animes en base al texto ingresado
    if (this.filter.trim() === '') {
      this.setDaysInfo();
    } else {
      // Convertir el filtro a minúsculas
      const filterLowerCase = this.filter.trim().toLowerCase();
      this.selectedDay = -1;

      // Limpiar la lista de animes filtrados antes de realizar una nueva búsqueda
      this.filteredAnimes = [];

      // Iterar sobre todos los elementos de this.allDaysMap
      for (const chapter of this.allDaysMap) {
        if (chapter.name!.toLowerCase().includes(filterLowerCase)) {
          this.filteredAnimes.push(chapter);
        }
      }
    }
  }
}
