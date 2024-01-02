import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthapiService } from '../apiService/authapi.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup | any;
  hidePassword: boolean = true;
  loginSuccess: boolean | null = null;
  loading: boolean = false;
  errorMsg: string | any;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthapiService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', [Validators.required, Validators.pattern(/^\S.*\S$/)]],
      password: ['', [Validators.required, Validators.pattern(/^\S*$/)]],
    });
  }
  //checking leading and trailing spaces--Validators.pattern(/^\S.*\S$/)
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }
    this.loading = true;
    // Access form values
    const formValues = this.loginForm.value;
    // console.log(formValues);
    this.authService.loginUser(formValues).subscribe(
      (res) => {
        // console.log(res);
        localStorage.setItem('accessToken', res.accessToken);//fix--me in case json stringyfy
        localStorage.setItem('username', res.username);
        localStorage.setItem('email', res.email);
        console.log(res.roles[0].name);
        localStorage.setItem('role', res.roles[0].name);
        console.log(JSON.stringify(res.roles[0].name));
        this.loginSuccess = true;
        this.loading = false;
        this.router.navigate(['/news']);
      },
      (err) => {
        console.log("000000000000000000000000000000000000")
        console.log(err.message);
        if (err.status == 0) {
          this.errorMsg = 'net::ERR_CONNECTION_REFUSED';
          this.loginSuccess = false;
          this.loading = false;
        } else {
          this.errorMsg = err.error;
          this.loginSuccess = false;
          this.loading = false;
        }
        this.openAlert(this.errorMsg, false);
      }
    );
  }
  //login success or failed
  openAlert(message: string, processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height: '300px',
      data: { message, processSuccess },
    });
  }
}
