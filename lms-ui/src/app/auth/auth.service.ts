import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Student} from "../student/student.model";
import {catchError} from "rxjs/operators";
import {AlertService} from "../alert/alert.service";
import {AppService} from "../app.service";

@Injectable({
  providedIn: 'root'
})
export class LoginService extends AppService{

  loginApiUrl = '/api/login';
  studentApiUrl = '/api/student';

  constructor(private http: HttpClient, protected alertService: AlertService) {
    super(alertService);
  }

  login(user: any): Observable<any> {
    return this.http.post(this.loginApiUrl, user);
  }


  createStudent(student: Student): Observable<any> {
    return this.http.post(this.studentApiUrl, student)
      .pipe(
        catchError(err => this.handleError(err))
      );
  }
}
