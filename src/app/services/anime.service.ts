import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment-prod';
import { Router } from '@angular/router';
import { ErrorService } from './error.service';
import { ResponseDTO } from '../models/output.model';

@Injectable({
  providedIn: 'root'
})
export class AnimeService {
  private backendUrl = environment.BACKEND_URL;

  constructor(private http: HttpClient, private errorService: ErrorService, private router: Router) { }

  test() {
    
  }

  public async getGenericData(uri: string): Promise<any> {
    try {
      const data = await this.http.get(this.backendUrl + uri).toPromise();
      console.log("Data: ", data);
      return data;
    } catch (error: any) {
      const errorData: ResponseDTO = {
        message: error.error.message,
        status: error.error.status
      };

      this.errorService.changeError(errorData);
      this.router.navigate(['/error']);
      throw error;
    }
  }
}
