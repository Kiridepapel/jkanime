import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseDTO } from '../models/output.model';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {
  private errorSource = new BehaviorSubject<any>(null);
  currentError = this.errorSource.asObservable();

  constructor() { }

  changeError(data: ResponseDTO) {
    this.errorSource.next(data);
  }

}
