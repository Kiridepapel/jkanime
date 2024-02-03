import { Component, Input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { ChapterItemComponent } from '../chapter-item/chapter-item.component';

@Component({
  selector: 'app-anime-item',
  standalone: true,
  imports: [TagComponent, ChapterItemComponent],
  templateUrl: './anime-item.component.html',
  styleUrl: './anime-item.component.scss'
})
export class AnimeItemComponent {
  @Input() public name!: string;
  @Input() public imgUrl!: string;
  @Input() public url!: string;

  // For tags
  @Input() public type!: any;
  @Input() public state!: any;

}
