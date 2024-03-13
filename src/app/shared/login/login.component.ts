import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { SangamService } from 'app/Services/sangam.service';
declare const $: any;




@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  EmailIdRegex: RegExp;
  LoginForm: FormGroup;
  hasError: any;
EditAdminLoginForm: any;



  constructor(private router: Router, private Services: SangamService) {

    this.EmailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.LoginForm = new FormGroup({
      EmailId: new FormControl('', [Validators.required,Validators.pattern(this.EmailIdRegex),
      ]),

      Password: new FormControl('', [Validators.required])
    })



    this.EmailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.EditAdminLoginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.pattern(this.EmailIdRegex),
      ]),

      changePassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit(): void {
    localStorage.clear();
  }

  SignIn() {

    if (this.LoginForm.valid) {
      let adminObj = {
        emailId: this.LoginForm.value.EmailId,
        password: this.LoginForm.value.Password
      };
      console.log(adminObj);
      this.Services.adminLogin(adminObj).subscribe((signResp) => {
        if (signResp.statusCode == 200) {
          localStorage.setItem('token', signResp.token);
          
          Swal.fire({
            icon: 'success',
            text: 'Successfully Logged in',
            showConfirmButton: false,
            timer: 3000,
          });
          this.router.navigateByUrl('/dashboard')
        } else {
          Swal.fire({
            icon: 'error',
            text: 'Please Enter Valid Credentials',
          });
        }
      });
    }
    // console.log("shanmukh")
    // this.router.navigateByUrl("Dashboard");
  }

  adminChangePassword() {
    $("#changePasswordModal").modal("show");
  }

  changeAdminPassword() {
    if (this.EditAdminLoginForm.valid) {
      let adminObj = {
        emailId: this.EditAdminLoginForm.value.emailId,
        password: this.EditAdminLoginForm.value.changePassword
      };

      this.Services.ChangePasswordAdmin(adminObj).subscribe((passwordResp) => {
        if(passwordResp.statusCode == 200){
          Swal.fire({
            icon:"success",
            text: "Password Changed Successfully ",
            showConfirmButton: false,
            timer: 3000,
          })
          $("#changePasswordModal").modal("hide");
          this.router.navigateByUrl('');
        }else{
          Swal.fire({
            icon:"error",
            text: "In Correct Password",
            showConfirmButton: false,
            timer: 3000,
          })
        }
      })


    }

  }

  modelReset() {
    this.EditAdminLoginForm.reset();
  }

}
