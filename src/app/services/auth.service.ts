import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-prod';
import { HttpClient } from '@angular/common/http';
import { AuthRequestDTO } from '../models/auth.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private backendUrl = environment.BACKEND_URL + "auth/";
  
  constructor(
    private http: HttpClient
  ) {}

  public async login(authRequestDTO: AuthRequestDTO): Promise<any> {
    return await this.http.post(this.backendUrl + "login", authRequestDTO).toPromise()
      .then((response: any) => {
        localStorage.setItem('token', response.token);
      })
      .catch((error: any) => {
        console.log("Error: " + error.error.message);
      });
  }
}
