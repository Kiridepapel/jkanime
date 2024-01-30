import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment-prod';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ResponseDTO } from '../models/output.model';
import { parse, format } from 'date-fns';
import { es } from 'date-fns/locale';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private backendUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router) { }

  public async getGenericData(uri: string): Promise<any> {
    try {
      const data = await this.http.get(this.backendUrl + uri).toPromise();
      console.log("Data: ", data);
      return data;
    } catch (error: any) {
      let errorData: ResponseDTO = {
        message: error.error.message,
        status: error.error.status
      };
      if (errorData.message === undefined || errorData.message === null) {
        errorData.message = error.error;
        errorData.status = error.status
      }
      this.errorService.changeError(errorData);
      this.router.navigate(['/error']);
      throw error;
    }
  }

  // Escribe la primera letra en mayúscula de los values de las keys
  public firstUppercase(value: any): string {
    if (typeof value === 'string') {
      return value.charAt(0).toUpperCase() + value.slice(1);
    } else {
      return value.toString();
    }
  }
  
  public parseAndFormatDate(value: string, showYear: boolean): string {
    try {
      let date = parse(value, 'MMMM d, yyyy', new Date(), { locale: es });
      let formattedDate!: string;

      if (showYear) {
        formattedDate = format(date, "EEEE d 'de' MMMM 'de' yyyy", { locale: es });
      } else {
        formattedDate = format(date, "EEEE d 'de' MMMM", { locale: es });
      }

      return this.firstUppercase(formattedDate);
    } catch (error) {
      console.error('Error al parsear la fecha:', error);
      return "Desconocido"
    }
  }

  public modifyDate(date: string, daysToAdd: number, index: number): string {
    
    let newDate = parse(date, 'MMMM d, yyyy', new Date(), { locale: es });
    newDate.setDate(newDate.getDate() + (daysToAdd * index));

    return format(newDate, 'MMMM d, yyyy', { locale: es });
  }
}
