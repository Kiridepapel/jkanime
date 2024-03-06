import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { Mode } from '../../models/individual.model';
import { TopDTO } from '../../models/page.model';
import { environment } from '../../../environments/environment-prod';
import { FormsModule } from '@angular/forms';

export class TopFilterOptions {
  name: string = '';
  value: string = '';
}

@Component({
  selector: 'app-top',
  standalone: true,
  imports: [RouterModule, CommonModule, FormsModule],
  templateUrl: './top.component.html',
  styleUrl: './top.component.scss'
})
export class TopComponent {
  public isLoading = true;
  public uri!: string;
  public name: string = '';
  public topData!: TopDTO;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Variables
  public actualYear: number = new Date().getFullYear();
  public seasonList: TopFilterOptions[] = [];
  public yearList: String[] = [];
  public seasonSelectedOption: string = '';
  public yearSelectedOption: string = this.actualYear.toString();

  constructor(
    private animeService: AnimeService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.language = language;
        this.createFilterLists();
        this.changeTitle();
      }
    );
  }
  
  async ngOnInit(){
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');

    // Crea las listas de filtros
    this.createFilterLists();
    // Marca los filtros en base a la URL
    this.selectParamFilters();
    // Seleccione los parámetros de la URL
    let params = this.constructFilterQuery();

    try {
      await this.animeService.getGenericData("top" + params).then((data: any) => {
        this.topData = data;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  private createFilterLists() {
    // Temporadas
    this.seasonList = [];
    this.seasonList = [
      { name: this.textTranslate('Temporada actual', 'Current season'), value: '' },
      { name: this.textTranslate('Primavera', 'Spring'), value: 'spring' },
      { name: this.textTranslate('Verano', 'Summer'), value: 'summer' },
      { name: this.textTranslate('Otoño', 'Autumn'), value: 'fall' },
      { name: this.textTranslate('Invierno', 'Winter'), value: 'winter' }
    ];

    // Años
    this.yearList = [];
    for (let i = this.actualYear; i >= 2020; i--) {
      this.yearList.push(i.toString());
    }
  }

  private selectParamFilters() {
    if (this.uri.includes("?")) {
      let paramsUri: string = this.uri.split("?")[1];
      let listParams: string[] = [];

      // Si viene más de un parámetro, se guardan por separado, si no, se guarda el único que viene en la url
      paramsUri.includes("&") ? listParams = paramsUri.split("&") : listParams.push(paramsUri);
      
      listParams.forEach(item => {
        let key: string = item.split("=")[0];
        let value: string = item.split("=")[1];

        if (key === "season") this.seasonSelectedOption = value;
        if (key === "year") this.yearSelectedOption = value;
      });
    }
  }

  private constructFilterQuery(): string {
    return "?season=" + this.seasonSelectedOption + "&year=" + this.yearSelectedOption;
  }

  public onYearChange(): void {
    // Si el año seleccionado es diferente al actual, elimina la opción de "Temporada actual"
    if (this.yearSelectedOption !== this.actualYear.toString()) {
      // Si existe, elimina la opción de "Temporada actual"
      if (this.seasonList.some(season => season.value === '')) {
        this.seasonList.shift();
        this.seasonSelectedOption = this.seasonList[0].value;
      }
    } else {
      // Si no existe, vuelve a agregar en la primera posición la opción de "Temporada actual"
      if (!this.seasonList.some(season => season.value === '')) {
        this.seasonList.unshift({ name: this.textTranslate('Temporada actual', 'Current season'), value: '' });
        this.seasonSelectedOption = this.seasonList[0].value;
      }

    }
  }

  public async filter() {
    this.isLoading = true;
    this.changeTitle();

    try {
      let params = this.constructFilterQuery();
      await this.animeService.getGenericData("top" + params).then((data: any) => {
        this.topData = data;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  private changeTitle() {
    if (this.isLoading) {
      document.title = this.textTranslate('Cargando', 'Loading') + '...';
    } else {
      if (this.seasonSelectedOption === '' && this.yearSelectedOption === this.actualYear.toString()) {
        document.title = this.textTranslate('Top actual', 'Current top');
      } else {
        let realSeasonName = this.seasonList.find(item => item.value === this.seasonSelectedOption)?.name;
        document.title = this.textTranslate('Top de ', 'Top of ') + realSeasonName + ' - ' + this.yearSelectedOption;
      }
    }
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
