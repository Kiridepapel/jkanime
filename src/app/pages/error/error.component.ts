import { Component } from '@angular/core';
import { ResponseDTO } from '../../models/response.model';
import { ErrorService } from '../../services/error.service';

@Component({
  selector: 'app-error',
  standalone: true,
  imports: [],
  templateUrl: './error.component.html',
  styleUrl: './error.component.scss'
})
export class ErrorComponent {
  public errorData!: ResponseDTO;

  constructor(private errorService: ErrorService) {}

  ngOnInit() {
    this.errorService.currentError.subscribe((data: any) => {
      if (data) {
        this.errorData = data;
        document.title= this.errorData.message + " - " + this.errorData.status;
      }
    });
  }
  
}
