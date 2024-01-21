import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';
import { AnimeService } from '../../services/anime.service';
import { HomePageDTO } from '../../models/page.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {
  public isLoading = true;
  public page = 1;
  public homeData!: HomePageDTO;
  
  constructor(private animeService: AnimeService, private router: Router) {}

  async ngOnInit() {
    try {
      await this.animeService.getGenericData("animes").then((data: any) => {
        this.homeData = data;
      });
    } finally {
      this.isLoading = false;
    }
  }

  showHeight(event: MouseEvent): void {
    // Acceder al elemento que disparó el evento
    const target = event.target as HTMLElement;

    // Obtener el tamaño del elemento
    const height = target.offsetHeight;
    const width = target.offsetWidth;

    // Aquí puedes hacer lo que necesites con las dimensiones
    console.log(`Altura: ${height}, Ancho: ${width}`);
}

  gotTo(url: string) {
    this.router.navigate(["/" + url]);
  }

  public select(index: number) {
    let alterNumber = index == 0 ? 1 : 0;
    document.getElementsByClassName("buttons")[0].children[alterNumber].classList.remove("active");
    document.getElementsByClassName("buttons")[0].children[index].classList.add("active");
  }
}
