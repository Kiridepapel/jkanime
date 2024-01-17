import { extract } from '@extractus/article-extractor';
import { Component } from '@angular/core';
import { ButtonComponent } from '../../components/button/button.component';

@Component({
  selector: 'app-jkanime',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './jkanime.component.html',
  styleUrl: './jkanime.component.scss',
})
export class JKAnimeComponent {

  constructor() { }

  async ngOnInit() {
    const value = await extract('https://animeflv.com.ru/');
    console.log("animeflv: " + value)
  }

}
