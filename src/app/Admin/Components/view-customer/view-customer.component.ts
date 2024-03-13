import { Component, OnInit } from '@angular/core';
import { SangamService } from 'app/Services/sangam.service';
import { environment } from 'environments/environment';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-customer',
  templateUrl: './view-customer.component.html',
  styleUrls: ['./view-customer.component.scss']
})
export class ViewCustomerComponent implements OnInit {
  customerId: any;
  BaseUrl: string = environment.baseUrl
  CustomerPodupuData: any;
  sanghamId: any;
  CustomerdepositData: any;
  CustomerwithdrawData: any;
  CustomerAppuData: any;
  loginToken: any;

  constructor(private Services: SangamService, private location: Location, private router: Router) { }

  ngOnInit(): void {
    this.GetCustomerPodupu();
    this.GetCustomerDeposits();
    this.GetCustomerWithdraw();
    this.GetCustomerAppu();
    this.customerId = JSON.parse(localStorage.getItem("view-CustomerId"));
    console.log("customersData..........", this.customerId);
    this.sanghamId = JSON.parse(localStorage.getItem("view-SanghamId"));
    console.log("sanghamData..........", this.sanghamId);
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }


  //  START-ALL-CUSTOMER-PODHUPU,DEPOSITS,WITHDRAW,APPU-LISTS



  GetCustomerPodupu() {

    this.customerId = JSON.parse(localStorage.getItem("view-CustomerId"));

    let cusomerdata = {
      customerId: this.customerId.customerId
    };

    this.Services.ListCustomerPodupu(cusomerdata).subscribe((customerResp) => {
      console.log("one-date", customerResp)
      if (customerResp.statusCode == 200) {
        this.CustomerPodupuData = customerResp.data;
        // Iterate over each item in the array and format the date
        this.CustomerPodupuData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
        this.CustomerPodupuData.forEach((item) => {
          item.textColor = (item.status === "unpaid") ? "red" : "black";
        })
        console.log("GetCustomerPodupu-data", this.CustomerPodupuData)
      }
    });



  }


  GetCustomerDeposits() {
    this.customerId = JSON.parse(localStorage.getItem("view-CustomerId"));
    this.sanghamId = JSON.parse(localStorage.getItem("view-SanghamId"));

    let cusomerdata = {
      customerId: this.customerId.customerId,
      sanghamId: this.sanghamId.sanghamId[0].sanghamId
    };

    this.Services.ListCustomerDeposit(cusomerdata).subscribe((customerResp) => {
      console.log("one-date", customerResp)
      if (customerResp.statusCode == 200) {
        this.CustomerdepositData = customerResp.data;
        // Iterate over each item in the array and format the date
        this.CustomerdepositData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
        console.log("GetCustomerDeposit-data", this.CustomerdepositData)
      }
    });



  }

  GetCustomerWithdraw() {
    this.customerId = JSON.parse(localStorage.getItem("view-CustomerId"));
    this.sanghamId = JSON.parse(localStorage.getItem("view-SanghamId"));

    let cusomerdata = {
      customerId: this.customerId.customerId,
      sanghamId: this.sanghamId.sanghamId[0].sanghamId
    };

    this.Services.ListCustomerWithdraw(cusomerdata).subscribe((customerResp) => {
      console.log("one-date", customerResp)
      if (customerResp.statusCode == 200) {
        this.CustomerwithdrawData = customerResp.data;
        // Iterate over each item in the array and format the date
        this.CustomerwithdrawData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
        console.log("GetCustomerwithdraw-data", this.CustomerwithdrawData)
      }
    });



  }

  GetCustomerAppu() {
    this.customerId = JSON.parse(localStorage.getItem("view-CustomerId"));
    this.sanghamId = JSON.parse(localStorage.getItem("view-SanghamId"));

    let cusomerdata = {
      customerId: this.customerId.customerId,
      sanghamId: this.sanghamId.sanghamId[0].sanghamId
    };

    this.Services.ListCustomerAppu(cusomerdata).subscribe((customerResp) => {
      console.log("one-date", customerResp)
      if (customerResp.statusCode == 200) {
        this.CustomerAppuData = customerResp.data;
        // Iterate over each item in the array and format the date
        this.CustomerAppuData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });

        this.CustomerAppuData.forEach((item) => {
          item.dueDate = item.dueDate
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });

        console.log("GetCustomerAppu-data", this.CustomerAppuData)
      }
    });



  }


  //  END-ALL-CUSTOMER-PODHUPU,DEPOSITS,WITHDRAW,APPU-LISTS







}
