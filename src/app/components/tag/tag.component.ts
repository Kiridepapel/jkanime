import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-tag',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './tag.component.html',
  styleUrl: './tag.component.scss'
})
export class TagComponent {
  @Input() public type!: number;

  // type 0: none
  // type 1: category only
  @Input() public category?: any;
  @Input() public bg?: string = "red"; // red, primary, secondary
  // type 2: chapter
  @Input() public chapter?: string;
  @Input() public viewed?: boolean = false;

}
