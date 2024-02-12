import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TagComponent } from '../tag/tag.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-chapter-item',
  standalone: true,
  imports: [CommonModule, RouterModule, TagComponent],
  templateUrl: './chapter-item.component.html',
  styleUrl: './chapter-item.component.scss'
})
export class ChapterItemComponent {
  // Configurations
  @Input() public type!: number;
  @Input() public animTo?: string; // None by default
  @Input() public fitPosition?: string; // Center by default
  @Input() public fitObject?: string; // Cover by default

  // General attributes
  @Input() public imgUrl!: string;
  @Input() public url!: string;

  // Tag attributes
  @Input() public category?: string;
  @Input() public chapter?: string;
  @Input() public viewed?: boolean;

}
