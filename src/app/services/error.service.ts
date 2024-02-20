import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Router } from '@angular/router';
import { ResponseDTO } from '../models/response.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSource = new BehaviorSubject<ResponseDTO>({
    message: "Ocurrió un error inesperado",
    status: 500
  });
  currentError = this.errorSource.asObservable();

  constructor(private router: Router) {}
  
  public constructError(error: any): void {
    let data: any = error;

    if (error.error.message !== undefined && error.status !== 0) {
      // Si es una excepcion o una respuesta de error enviada desde el servidor
      data.message = error.error.message;
      data.status = error.status;
    } else {
      // Si el servidor no responde
      data.message = "El servidor está en mantenimiento";
      data.status = 503;
    }
    
    this.errorSource.next(data);
    this.router.navigate(['/error']);
    throw error;
  }

}
