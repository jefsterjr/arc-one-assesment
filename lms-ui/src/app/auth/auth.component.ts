import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AlertService} from '../alert/alert.service';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {LoginService} from './login.service';
import {StudentForm} from "../login/student.form";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  viewMode: string = 'login'

  loginForm: FormGroup = this.formBuilder.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private loginService: LoginService,
    private alertService: AlertService,
  ) {
  }


  ngOnInit(): void {
    sessionStorage.setItem('token', '');
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      const user: { username: string, password: string } = this.loginForm.value;
      this.loginService.login(user).subscribe(isValid => {
        if (isValid) {
          sessionStorage.setItem('token', btoa(user.username + ':' + user.password));
          this.router.navigate(['/']);
        } else {
          this.alertService.warning('Authentication failed.');
        }
      });
    }
  }
  studentForm: FormGroup = this.formBuilder.group({
    firstName: ['', Validators.required],
    lastName: ['', Validators.required],
    dateOfBirth: ['', Validators.required],
    email: ['', Validators.required],
    phoneNumber: ['', Validators.required],
    address: ['', Validators.required]
  });

  onSubmitStudent(): void {
    if (this.studentForm.valid) {
      this.alertService.clearAlerts();
      const student: StudentForm = this.studentForm.value;
      this.loginService.createStudent(student).subscribe(() => {
        this.alertService.success('User created, enter your credentials');
       this.viewMode = 'login';
      });
    }
  }
  validateEmail(): void {
    console.log('validateEmail');
  }
  validatePassword(): void {
    const student: StudentForm = this.studentForm.value;
    // tslint:disable-next-line:triple-equals
    if (student.registerPassword != student.registerRepeatedPassword){
      this.alertService.error('Password must be equal!');
    }
  }

  cancel(): void {
    this.viewMode = 'login';
  }
}
