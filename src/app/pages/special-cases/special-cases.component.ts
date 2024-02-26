import { DataService } from './../../services/data.service';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-special-cases',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './special-cases.component.html',
  styleUrl: './special-cases.component.scss'
})
export class SpecialCasesComponent {
  public selectedOption: string = 'translations';

  constructor(private dataService: DataService) { }

  public downloadData(dataName: string) {
    this.dataService.export(dataName);
  }
}
