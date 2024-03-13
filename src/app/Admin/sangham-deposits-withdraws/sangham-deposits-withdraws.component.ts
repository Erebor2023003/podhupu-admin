import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SangamService } from 'app/Services/sangam.service';

@Component({
  selector: 'app-sangham-deposits-withdraws',
  templateUrl: './sangham-deposits-withdraws.component.html',
  styleUrls: ['./sangham-deposits-withdraws.component.scss']
})
export class SanghamDepositsWithdrawsComponent implements OnInit {
  sanghamId: any;
  SanghamDepositsData: any;
  SanghamWithdrawData: any;
  trimmedDate: any;
  loginToken: any;

  constructor(private Services: SangamService, private router: Router) { }

  ngOnInit(): void {
    this.GetSanghamDeposits();
    this.GetSanghamWithdraws();
    
    this.sanghamId = JSON.parse(localStorage.getItem("set-sanghamId"));
    console.log("memo..........", this.sanghamId)
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }


  GetSanghamDeposits() {

    this.sanghamId = JSON.parse(localStorage.getItem("set-sanghamId"));

    let Depdata = {
      sanghamId: this.sanghamId.sanghamId
    };

    this.Services.ListSanghamDeposits(Depdata).subscribe((SangDepResp) => {
      console.log("one-date", SangDepResp)
      if (SangDepResp.statusCode == 200) {
        this.SanghamDepositsData = SangDepResp.data;
        // Iterate over each item in the array and format the date
        this.SanghamDepositsData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
        console.log(" GetSanghamDeposits-data", this.SanghamDepositsData)
      }
    });

  }

  GetSanghamWithdraws() {
    this.sanghamId = JSON.parse(localStorage.getItem("set-sanghamId"));

    let WithdataObj = {
      sanghamId: this.sanghamId.sanghamId
    };

    this.Services.ListSanghamWithdraws(WithdataObj).subscribe((WithdResp) => {

      if (WithdResp.statusCode == 200) {
        this.SanghamWithdrawData = WithdResp.data;
        // Iterate over each item in the array and format the date
        this.SanghamWithdrawData.forEach((item) => {
          item.date = item.date
            .split(' ')
            .slice(1, 4)
            .join(' ')
            .trim();
        });
        console.log("GetSanghamWithdraw-data", this.SanghamWithdrawData)
      }

    });




  }













}
