import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
})
export class ButtonComponent {
  @Input() text?: string;
  @Input() type: string = 'text';
  @Input() icon?: string;

  public tam!: string;

  ngOnInit() {
    if (this.type === 'text') {
      this.tam = 'px-5 py-3';
    } else if (this.type === 'icon') {
      this.tam = 'w-12 h-12 grid place-items-center';
    }
  }
}
