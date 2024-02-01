import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() public type!: number;

  // type 0: none
  // type 1: category only
  @Input() public category?: any;
  // type 2: chapter
  @Input() public chapter?: string;
  @Input() public viewed?: boolean = false;

}
