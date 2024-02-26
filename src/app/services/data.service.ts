import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment-prod';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  private backendUrl = environment.BACKEND_URL + 'data/';

  constructor(private http: HttpClient) {}

  public async export(dataName: string): Promise<any> {
    let url = this.backendUrl + dataName + '/export';
    
    return this.http.get(url, {
      responseType: 'arraybuffer'
    }).toPromise()
      .then((response: any) => {
        const blob = new Blob([response], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
        const url = window.URL.createObjectURL(blob);
        window.open(url);
      })
      .catch((error: any) => {
        console.log("Error: " + JSON.stringify(error));
      });
  }
}
