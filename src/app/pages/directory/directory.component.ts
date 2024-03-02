import { Component } from '@angular/core';
import { AnimeService } from '../../services/anime.service';
import { AnimeItemComponent } from '../../components/anime-item/anime-item.component';
import { AnimeDataDTO, Mode } from '../../models/individual.model';
import { environment } from '../../../environments/environment-prod';
import { LanguageService } from '../../services/language.service';
import { Subscription } from 'rxjs/internal/Subscription';
import { DirectoryOptionsDTO } from '../../models/page.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-directory',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, AnimeItemComponent],
  templateUrl: './directory.component.html',
  styleUrl: './directory.component.scss'
})
export class DirectoryComponent {
  public isLoading = true;
  public directoryData!: AnimeDataDTO [];
  public filterData!: DirectoryOptionsDTO;
  public uri!: string;
  public filteredUri!: string;
  public page: number = 1;
  // Subscriptions
  private languageSubscription!: Subscription;
  public language!: Mode;
  // Selectores
  public letters: string[] = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z'];
  public genreSelectedOption: string = '';
  public seasonSelectedOption: string = '';
  public studioSelectedOption: string = '';
  public statusSelectedOption: string = '';
  public typeSelectedOption: string = '';
  public subSelectedOption: string = '';
  public orderSelectedOption: string = '';

  constructor(
    private animeService: AnimeService,
    private languageService: LanguageService,
    private router: Router
  ) {
    this.languageSubscription = this.languageService.language$.subscribe(
      (language) => {
        this.language = language;
        this.changeTitle();
      }
    );
  }

   async ngOnInit(){
    this.uri = window.location.href.replace(environment.FRONTEND_URL, '');
    
    // Realiza la solicitud de las opciones de filtrado
    this.animeService.getGenericData("directory/options").then((data: any) => {
      this.filterData = data;
    });

    // Marca los elementos seleccionados desde la url en los selectores
    this.selectParamFilters();
    // Establece los parámetros de la página
    let params = this.stablishParams();

    // Realiza la solicitud de los datos
    try {
      await this.animeService.getGenericData("directory/" + params).then((data: any) => {
        this.directoryData = data;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
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

        if (key === "genre") this.genreSelectedOption = value;
        if (key === "season") this.seasonSelectedOption = value;
        if (key === "studio") this.studioSelectedOption = value;
        if (key === "status") this.statusSelectedOption = value;
        if (key === "type") this.typeSelectedOption = value;
        if (key === "sub") this.subSelectedOption = value;
        if (key === "order") this.orderSelectedOption = value;
      });
    }
  }

  private stablishParams(): string {
    let uri = window.location.href.split("/");
    let params = uri[uri.length - 1];
    // Si no se indica la página en la url, se redirige a la primera
    if (params === "directorio" || params === "directory") {
      return this.page.toString();
    } else {
      this.page = parseInt(params.split("?")[0]);
      return params;
    }
  }

  public constructLetterUrl(letter: string) {
    this.router.navigate([this.textTranslate('buscar', 'search') + "/" + letter]);
  }

  public async filter() {
    this.isLoading = true;
    this.changeTitle();

    try {
      let searchQuery = ("directory/") + this.page + this.constructFilterQuery();
      // ? En caso se quiera buscar actualizando la página
      // window.location.href = environment.FRONTEND_URL + searchQuery;
      // ? En caso se quiera buscar sin actualizar la página
      await this.animeService.getGenericData(searchQuery).then((data: any) => {
        this.directoryData = data;
      });
    } finally {
      this.isLoading = false;
      this.changeTitle();
    }
  }

  public resetFilters() {
    this.genreSelectedOption = '';
    this.seasonSelectedOption = '';
    this.studioSelectedOption = '';
    this.statusSelectedOption = '';
    this.typeSelectedOption = '';
    this.subSelectedOption = '';
    this.orderSelectedOption = '';
    this.filter();
  }

  public copyFilters() {
    let searchQuery = environment.FRONTEND_URL + (this.textTranslate('directorio', 'directory') + "/" + this.page) + this.constructFilterQuery();
    this.copyToClipboard(searchQuery);
  }

  private constructFilterQuery(): string {
    let searchQuery = "";
    searchQuery += "&genre=" + this.genreSelectedOption;
    searchQuery += "&season=" + this.seasonSelectedOption;
    searchQuery += "&studio=" + this.studioSelectedOption;
    searchQuery += "&status=" + this.statusSelectedOption;
    searchQuery += "&type=" + this.typeSelectedOption;
    searchQuery += "&sub=" + this.subSelectedOption;
    searchQuery += "&order=" + this.orderSelectedOption;

    if (this.genreSelectedOption === '') searchQuery = searchQuery.replace("&genre=", "");
    if (this.seasonSelectedOption === '') searchQuery = searchQuery.replace("&season=", "");
    if (this.studioSelectedOption === '') searchQuery = searchQuery.replace("&studio=", "");
    if (this.statusSelectedOption === '') searchQuery = searchQuery.replace("&status=", "");
    if (this.typeSelectedOption === '') searchQuery = searchQuery.replace("&type=", "");
    if (this.subSelectedOption === '') searchQuery = searchQuery.replace("&sub=", "");
    if (this.orderSelectedOption === '') searchQuery = searchQuery.replace("&order=", "");

    // Elimina el primer & y agregar ?
    searchQuery = searchQuery.slice(1);
    if (searchQuery !== '')
      searchQuery = "?" + searchQuery;

    return searchQuery;
  }

  private copyToClipboard(value: string) {
    const textArea = document.createElement('textarea');
    textArea.value = value;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
  }
  
  public previousSearch() {
    // Si no hay numero en la url
    if (this.uri.split('/').length == 1) {
      return this.uri + '/' + (this.page - 1);
    }
    // Si hay número y/o tiene parámetros
    return this.uri.replace('/' + (this.page), '/' + (this.page - 1));
  }

  public nextSearch() {
    // Si no hay numero en la url
    if (this.uri.split('/').length == 1) {
      return this.uri + '/' + (this.page + 1);
    }
    // Si hay número y/o tiene parámetros
    return this.uri.replace('/' + (this.page), '/' + (this.page + 1));
  }

  private changeTitle() {
    if (this.isLoading) {
      document.title = this.textTranslate('Cargando', 'Loading') + '...';
    } else {
      document.title = this.textTranslate('Directorio página ', 'Directory page ') + this.page;
    }
  }

  public textTranslate(spanish: string, english: string): string {
    return this.languageService.textTranslate(spanish, english);
  }
}
