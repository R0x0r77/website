import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../config/environment';
import { Observable } from 'rxjs';

interface ContactFormRequest {
  name: string;
  email: string;
  message: string;
}

interface ContactFormResponse {
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class EmailService {
  apiUrl = (environment.production ? '' : environment.apiBaseUrl) + 'api/';

  constructor(private http: HttpClient) {}

  sendEmail(request: ContactFormRequest): Observable<ContactFormResponse> {
    return this.http.post<ContactFormResponse>(`${this.apiUrl}emails`, request);
  }
}
