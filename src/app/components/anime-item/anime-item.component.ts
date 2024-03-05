import { Component, Input } from '@angular/core';
import { ImgComponent } from '../img/img.component';
import { TagComponent } from '../tag/tag.component';
import { AnimeDataDTO } from '../../models/individual.model';

@Component({
  selector: 'app-anime-item',
  standalone: true,
  imports: [ImgComponent, TagComponent],
  templateUrl: './anime-item.component.html',
  styleUrl: './anime-item.component.scss'
})
export class AnimeItemComponent {
  @Input() public animeInfo!: AnimeDataDTO;
  
  @Input() public animTo!: string;
  @Input() public objFit!: string;
  @Input() public objPos!: string;
}
