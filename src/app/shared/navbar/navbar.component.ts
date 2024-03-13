import { Component, OnInit, Renderer2, ViewChild, ElementRef } from '@angular/core';
import { ROUTES } from '../../sidebar/sidebar.component';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SangamService } from 'app/Services/sangam.service';
import Swal from 'sweetalert2';

declare const $: any;

@Component({
  moduleId: module.id,
  selector: 'navbar-cmp',
  templateUrl: 'navbar.component.html'
})

export class NavbarComponent implements OnInit {
  private listTitles: any[];
  location: Location;
  private nativeElement: Node;
  private toggleButton;
  private sidebarVisible: boolean;
  token; any

  public isCollapsed = true;
  @ViewChild("navbar-cmp", { static: false }) button;

  hasError: any;
  EditAdminLoginForm: any;
  EmailIdRegex: RegExp;



  constructor(location: Location, private renderer: Renderer2, private element: ElementRef, private router: Router,private Services: SangamService) {
    this.location = location;
    this.nativeElement = element.nativeElement;
    this.sidebarVisible = false;

    this.EmailIdRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.EditAdminLoginForm = new FormGroup({
      emailId: new FormControl('', [Validators.required, Validators.pattern(this.EmailIdRegex),
      ]),

      changePassword: new FormControl('', [Validators.required])
    })
  }

  ngOnInit() {
    this.listTitles = ROUTES.filter(listTitle => listTitle);
    var navbar: HTMLElement = this.element.nativeElement;
    this.toggleButton = navbar.getElementsByClassName('navbar-toggle')[0];
    this.router.events.subscribe((event) => {
      this.sidebarClose();
    });
  }
  getTitle() {
    var titlee = this.location.prepareExternalUrl(this.location.path());
    if (titlee.charAt(0) === '#') {
      titlee = titlee.slice(1);
    }
    for (var item = 0; item < this.listTitles.length; item++) {
      if (this.listTitles[item].path === titlee) {
        return this.listTitles[item].title;
      }
    }
    return 'Dashboard';
  }
  sidebarToggle() {
    if (this.sidebarVisible === false) {
      this.sidebarOpen();
    } else {
      this.sidebarClose();
    }
  }
  sidebarOpen() {
    const toggleButton = this.toggleButton;
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    setTimeout(function () {
      toggleButton.classList.add('toggled');
    }, 500);

    html.classList.add('nav-open');
    if (window.innerWidth < 991) {
      mainPanel.style.position = 'fixed';
    }
    this.sidebarVisible = true;
  };
  sidebarClose() {
    const html = document.getElementsByTagName('html')[0];
    const mainPanel = <HTMLElement>document.getElementsByClassName('main-panel')[0];
    if (window.innerWidth < 991) {
      setTimeout(function () {
        mainPanel.style.position = '';
      }, 500);
    }
    this.toggleButton.classList.remove('toggled');
    this.sidebarVisible = false;
    html.classList.remove('nav-open');
  };
  collapse() {
    this.isCollapsed = !this.isCollapsed;
    const navbar = document.getElementsByTagName('nav')[0];
    console.log(navbar);
    if (!this.isCollapsed) {
      navbar.classList.remove('navbar-transparent');
      navbar.classList.add('bg-white');
    } else {
      navbar.classList.add('navbar-transparent');
      navbar.classList.remove('bg-white');
    }

  }

  adminLogout() {
    this.token = localStorage.removeItem("token");
    this.router.navigateByUrl('');
    console.log("macsof", this.token);
    localStorage.clear()
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
