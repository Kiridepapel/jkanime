import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';
import { TagComponent } from '../tag/tag.component';

@Component({
  selector: 'app-img',
  standalone: true,
  imports: [CommonModule, RouterModule, TagComponent],
  templateUrl: './img.component.html',
  styleUrl: './img.component.scss'
})
export class ImgComponent {
  @Input() public imgUrl!: string;
  @Input() public url!: string;

  @Input() public animTo!: string; // None by default
  @Input() public objFit!: string; // Cover by default
  @Input() public objPos!: string; // Center by default

  @Input() public iconClass!: string;
  @Input() public iconSize!: string;

  ngOnInit() {
    if (this.animTo === undefined) this.animTo = 'none';
    if (this.objFit === undefined) this.objFit = 'cover';
    if (this.objPos === undefined) this.objPos = 'center';
    if (this.iconClass === undefined) this.iconClass = 'fa-solid fa-circle-play';
    if (this.iconSize === undefined) this.iconSize = 'text-6xl';
  }
}
