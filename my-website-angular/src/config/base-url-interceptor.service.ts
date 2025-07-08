import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../config/environment';

@Injectable()
export class BaseUrlInterceptor implements HttpInterceptor {
  private baseUrl = environment.apiUrl;

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // Skip if request is already absolute (starts with http:// or https://)
    if (/^https?:\/\//i.test(req.url)) {
      return next.handle(req);
    }

    const normalizedUrl = req.url.replace(/^\/+/, ''); // remove leading slashes
    const apiReq = req.clone({ url: this.baseUrl + normalizedUrl });

    return next.handle(apiReq);
  }
}
