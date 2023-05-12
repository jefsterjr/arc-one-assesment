import { Injectable } from '@angular/core';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';
import {Observable} from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JwtInterceptorService implements HttpInterceptor{

  constructor() { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token =  sessionStorage.getItem('token');
    if (token) {
      // @ts-ignore
      req = req.clone({
        headers: req.headers.set('Authorization', token),
        url: environment.baseURL + req.url
      });
    }
    return next.handle(req);
  }
}
