import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SangamService } from 'app/Services/sangam.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
declare const $: any

@Component({
  selector: 'app-sangham-recovery',
  templateUrl: './sangham-recovery.component.html',
  styleUrls: ['./sangham-recovery.component.scss']
})
export class SanghamRecoveryComponent implements OnInit {
  FormRecovery: any;
  hasError: any;
  BaseUrl: string = environment.baseUrl;
  dataRecovery: any;
  sanghamId: any;
  RecoveryCount: any;
  dataPending: any;
  dataPendingCount: any;
  ViewSanghamBalanceData: any;
  ViewMessage: any;
  DepositRecoverydata: any;
  DepositRecoveryCount: any;
  WithdraRecoverydata: any;
  WithdraRecoveryCount: any;
  appuRecoverydata: any;
  appuRecoveryCount: any;
  appuPendingdata: any;
  appuPendingCount: any;
  MonthlyAppuListData: any;
  MonthlyMessage: any;
  appuRecoveryTotal: any;
  MonthlytransactionsData: any;

  constructor(private Services: SangamService, private router: Router) {

    this.FormRecovery = new FormGroup({
      CustomerName: new FormControl('', [Validators.required]),
      Date: new FormControl('', [Validators.required])

    })

  }

  ngOnInit(): void {
    this.AddRecovery();
    this.AddPending();
    this.AddDeposit();
    this.AddWithdraw();
    this.AddAppuRecovery();
    this.AddAppuPending();
    this.ViewSanghamBalance();
    this.MonthlyAppuList();
    this.Monthlytransactions();
    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
    console.log("memo..........", this.sanghamId)
  }


  ViewSanghamBalance(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    let balanceObj = {
      sanghamId: this.sanghamId.sanghamId,
    }

    this.Services.SanghamBalance(balanceObj).subscribe((balanceResp)=>{
      
      if(balanceResp.statusCode == 200){
        this.ViewSanghamBalanceData = balanceResp.data;
        this.ViewMessage = balanceResp;
        console.log("View-blns", this.ViewSanghamBalanceData)
      }
    })

  }


  AddRecovery() {

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let RecoveObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", RecoveObj);

      this.Services.SanghamRecovery(RecoveObj).subscribe((RecoveResp) => {
        if (RecoveResp.statusCode == 200) {
          this.dataRecovery = RecoveResp.data;
          this.RecoveryCount = RecoveResp.count
           // Iterate over each item in the array and format the date
        this.dataRecovery.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${RecoveResp.message}`,
          });
        }
      })

    }


  }


  AddPending(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let PendingObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", PendingObj);

      this.Services.SanghamPending(PendingObj).subscribe((PendingResp) => {
        if (PendingResp.statusCode == 200) {
          this.dataPending = PendingResp.data;
          this.dataPendingCount = PendingResp.count
           // Iterate over each item in the array and format the date
        this.dataPending.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${PendingResp.message}`,
          });
        }
      })

    }


  }

  AddDeposit(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let RecoveObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", RecoveObj);

      this.Services.DepositRecovery(RecoveObj).subscribe((depRecoveResp) => {
        if (depRecoveResp.statusCode == 200) {
          this.DepositRecoverydata = depRecoveResp.data;
          this.DepositRecoveryCount = depRecoveResp.count
           // Iterate over each item in the array and format the date
        this.DepositRecoverydata.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${depRecoveResp.message}`,
          });
        }
      })

    }


  }

  AddWithdraw(){
    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let RecoveObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", RecoveObj);

      this.Services.WithdrawRecovery(RecoveObj).subscribe((WithdraRecoveResp) => {
        if (WithdraRecoveResp.statusCode == 200) {
          this.WithdraRecoverydata = WithdraRecoveResp.data;
          this.WithdraRecoveryCount = WithdraRecoveResp.count
           // Iterate over each item in the array and format the date
        this.WithdraRecoverydata.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${WithdraRecoveResp.message}`,
          });
        }
      })

    }


  }

  AddAppuRecovery() {

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let RecoveObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", RecoveObj);

      this.Services.AppuRecovery(RecoveObj).subscribe((RecoveResp) => {
        if (RecoveResp.statusCode == 200) {
          this.appuRecoverydata = RecoveResp.data;
          this.appuRecoveryCount = RecoveResp.count;
          this.appuRecoveryTotal = RecoveResp.total;
          console.log("recover", this.appuRecoveryTotal);
           // Iterate over each item in the array and format the date
        this.appuRecoverydata.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${RecoveResp.message}`,
          });
        }
      })

    }


  }


  AddAppuPending(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    if (this.FormRecovery) {
      let PendingObj = {
        sanghamId: this.sanghamId.sanghamId,
        customerName: this.FormRecovery.value.CustomerName,
        date: this.FormRecovery.value.Date
      }
      console.log("recover", PendingObj);

      this.Services.AppuPending(PendingObj).subscribe((PendingResp) => {
        if (PendingResp.statusCode == 200) {
          this.appuPendingdata = PendingResp.data;
          this.appuPendingCount = PendingResp.count
           // Iterate over each item in the array and format the date
        this.appuPendingdata.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
          // Swal.fire({
          //   icon: 'success',
          //   text: `${RecoveResp.message}`,
          //   showConfirmButton: false,
          //   timer: 3000,
          // });
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: `${PendingResp.message}`,
          });
        }
      })

    }


  }



  MonthlyAppuList(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    let MonthObj = {
      sanghamId: this.sanghamId.sanghamId,
    }

    this.Services.GetMonthlyAppuList(MonthObj).subscribe((monthlyResp)=>{
      
      if(monthlyResp.statusCode == 200){
        this.MonthlyAppuListData = monthlyResp.data;
        this.MonthlyMessage = monthlyResp;
        console.log("Monthly-data", this.MonthlyAppuListData)
        this.MonthlyAppuListData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
            item.dueDate = item.dueDate
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
      }
    })

  }


  Monthlytransactions(){

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));

    let transactionObj = {
      sanghamId: this.sanghamId.sanghamId,
    }

    this.Services.TransactionsList(transactionObj).subscribe((MonthlyResp)=>{
      
      if(MonthlyResp.statusCode == 200){
        this.MonthlytransactionsData = MonthlyResp.data;
        console.log("Monthly-List", this.MonthlytransactionsData)
      }
      this.MonthlytransactionsData.forEach((item) => {
        item.date = item.date
          .split(' ')
          .slice(1, 4)
          .join(' ')
          .trim();
      });
    })

  }

}
