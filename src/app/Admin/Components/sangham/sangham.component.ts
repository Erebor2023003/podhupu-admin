import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SangamService } from 'app/Services/sangam.service';
import Swal from 'sweetalert2';
declare const $: any

@Component({
  selector: 'app-sangham',
  templateUrl: './sangham.component.html',
  styleUrls: ['./sangham.component.scss']
})
export class SanghamComponent implements OnInit {
  tosangham: any;
  showbutton: boolean = true;
  showEditIcon:boolean = true;
  UserSanghamId: any;
  dataMessage: any;
  statusCode: any;
  Sanghampodupu: any;
  SanghamPodupuForm: any;
  hasError: any;
  AddSanghamPodupudata: any;
  Sanghamdeposit: any;
  SanghamdepositForm: any;
  AddSanghamDepositdata: any;
  data: any;
  sanghamId: any;
  SanghamForm: FormGroup;
  AddSanghamdata: any;
  agentId: any;
  loginToken: any;
  editInterestRateForm: any;
  podupuDetailsId: any;
  interest: any;
  sanghamDetailsId: any;
  EditInterestsdata: any;
  SanghamPodupuDetailsId: any;
  editDepositInterestForm: any;
  SanghamDepositsDetailsId: any;
  depositDetailsId: any;

  constructor(private Services: SangamService, private router: Router) {

    this.SanghamForm = new FormGroup({
      StartDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl('', [Validators.required])
    })


    this.SanghamPodupuForm = new FormGroup({
      MonthlyAmount: new FormControl('', [Validators.required]),
      Interest: new FormControl('', [Validators.required]),
      Fine: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
      PodupuPeriod: new FormControl('', [Validators.required]),
    });



    this.SanghamdepositForm = new FormGroup({
      Interest: new FormControl('', [Validators.required]),
      DepositDate: new FormControl('', [Validators.required]),
    })

    this.editInterestRateForm = new FormGroup({
      INTEREST: new FormControl('', [Validators.required]),
    })

    this.editDepositInterestForm = new FormGroup({
      Dpinterest: new FormControl('', [Validators.required]),
    })



  }

  ngOnInit(): void {
    this.Sanghamlist();

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
    // console.log("memo..........", this.sanghamId)  

    this.agentId = JSON.parse(localStorage.getItem("single-agnetdata"));
    // console.log("text", this.agentId)
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }

  }


  // START-LIST OF SANGHAM //

  Sanghamlist() {
    this.Services.getSangham().subscribe((Sangresp) => {
      // console.log("one-date",Sangresp)
      if (Sangresp.statusCode == 200) {
        this.tosangham = Sangresp.data;
        console.log("Sangham-data", this.tosangham)
      }
    });
  }



  // END-LIST OF SANGHAM //

  // START-SANGHAM-CUSTOMERS // 

  customer(data) {
    console.log("object123654", data)
    localStorage.setItem('customer-sanghamId', JSON.stringify(data));
    console.log("cusomer-sanghamId", this.data)
  }

  // END-SANGHAM-CUSTOMERS //

  // START-SANGHAM-PODUPU //


  SanghamPodupu(data) {
    //   console.log("text", data)
    // let demo = data.sanghamId;
    // console.log("ddd", demo)

    this.UserSanghamId = data.sanghamId;
    console.log("get-sanghamId", this.UserSanghamId)

    let PodupuObj = {
      sanghamId: this.UserSanghamId
    };
    console.log("SanghamPodupu", PodupuObj);

    this.Services.PodupuData(PodupuObj).subscribe((podupuResp) => {
      // console.log("success1", podupuResp);
      this.Sanghampodupu = {};
      if (podupuResp.statusCode == 200) {
        this.showbutton = false;
        this.showEditIcon = true;

        console.log('onLoad--->', this.Sanghampodupu);
        this.dataMessage = podupuResp;
        this.statusCode = podupuResp.statusCode;
        this.Sanghampodupu = podupuResp.data[0];
        console.log("Get-Podupu-Details", this.Sanghampodupu);

        $("#exampleModal-003").modal("show");
      } else {
        this.showbutton = true;
        this.showEditIcon = false;
        this.dataMessage = podupuResp;
        this.statusCode = podupuResp.statusCode;
        this.Sanghampodupu = {};
        console.log('onLoad else case--->', this.Sanghampodupu);
      }
    })

  }

  // END-SANGHAM-PODUPU //

  // START-(ADD)SANGHAM-PODUPU //

  AddSanghamPodupu() {
    if (this.SanghamPodupuForm.valid) {

      let PodupuObj = {
        sanghamId: this.UserSanghamId,
        monthlyAmount: this.SanghamPodupuForm.value.MonthlyAmount,
        interest: this.SanghamPodupuForm.value.Interest,
        fine: this.SanghamPodupuForm.value.Fine,
        startDate: this.SanghamPodupuForm.value.StartDate,
        podupuPeriod: this.SanghamPodupuForm.value.PodupuPeriod
      }
      const [year, month, day] = PodupuObj.startDate.split('-');
      PodupuObj.startDate = `${day}-${month}-${year}`;

      console.log("Add-Podupu", PodupuObj);

      this.Services.AddPodupuData(PodupuObj).subscribe((sanghampodupuResp) => {
        // console.log("success", addpodupuResp);
        if (sanghampodupuResp.statusCode == 200) {
          this.AddSanghamPodupudata = sanghampodupuResp.data;
          console.log("Add-Sangham-Podupu-Details", this.AddSanghamPodupudata)
          Swal.fire({
            icon: 'success',
            text: 'Successfully Add Sangham Podupu',
            showConfirmButton: false,
            timer: 3000,
          });
          this.SanghamPodupuForm.reset();
          $("#exampleModal-004").modal("show");
          $("#exampleModal-004").modal("hide");
          this.SanghamPodupu(sanghampodupuResp.data);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'something went wrong',
          });
        }
      })

    }

  }

  // END-(ADD)SANGHAM-PODUPU //


  // START-SANGHAM-DEPOSITS //

  SanghamDeposit(data) {

    this.UserSanghamId = data.sanghamId;
    console.log("get-sanghamId", this.UserSanghamId)

    let DepositObj = {
      sanghamId: this.UserSanghamId
    };

    this.Services.Depositdata(DepositObj).subscribe((depositResp) => {
      console.log("success11111111", depositResp);
      this.Sanghamdeposit = {};
      if (depositResp.statusCode == 200) {
        this.showbutton = false;
        this.showEditIcon = true;
        console.log('onLoad--->', this.Sanghamdeposit);
        this.dataMessage = depositResp;
        this.statusCode = depositResp.statusCode;
        this.Sanghamdeposit = depositResp.data[0];
        console.log("Get-Deposit-Details", this.Sanghamdeposit);

        $("#exampleModal-005").modal("show");
        // $("#exampleModal4").modal("hide");
      } else {
        this.showbutton = true;
        this.showEditIcon = false;
        this.dataMessage = depositResp;
        this.statusCode = depositResp.statusCode;
        this.Sanghamdeposit = {};
        console.log('onLoad else case--->', this.Sanghamdeposit);
      }

    })


  }

  // END-SANGHAM-DEPOSITS //



  onEdit(data) {
    // console.log("...........data",data);
    this.SanghamPodupuDetailsId = data.sanghamId[0];
    this.interest = data.interest;
    // console.log("asdfgh",this.interestRate)
    this.podupuDetailsId = data.podupuDetailsId;
    this.editInterestRateForm.controls["INTEREST"].setValue(data.interest);

    $("#EditInterestRateModal").modal("show");
  }

  upDateInterestRate() {
    if (this.editInterestRateForm.valid) {

      let EditInterRateObj = {
        podupuDetailsId: this.podupuDetailsId,
        interest: this.editInterestRateForm.value.INTEREST
      }
      console.log("Edit....EditInterObj", EditInterRateObj);

      this.Services.UpdatePodupuInterest(EditInterRateObj).subscribe((EditResp) => {

        if (EditResp.statusCode == 200) {
          this.EditInterestsdata = EditResp.data;
          // console.log("sangham",this.EditInterestsRatedata)

          Swal.fire({
            icon: 'success',
            text: 'Interest Update successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          // $("#exampleModal0005").modal("show");
          $("#EditInterestRateModal").modal("hide");
          this.editInterestRateForm.reset();

          // this.SanghamDeposits();
          this.SanghamPodupu(this.SanghamPodupuDetailsId);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Interest already added',
          });
        }

      })


    }


  }





  OnEdit(data) {
    // console.log("...........data",data);
    this.SanghamDepositsDetailsId = data.sanghamId[0];
    this.interest = data.interest;
    // console.log("asdfgh",this.interestRate)
    this.depositDetailsId = data.depositDetailsId;
    this.editDepositInterestForm.controls["Dpinterest"].setValue(data.interest);

    $("#EditDepositInterestModal").modal("show");
  }

  upDateDpInterest() {
    if (this.editDepositInterestForm.valid) {

      let EditInterRateObj = {
        depositDetailsId: this.depositDetailsId,
        interest: this.editDepositInterestForm.value.Dpinterest
      }
      console.log("Edit....EditInterObj", EditInterRateObj);

      this.Services.UpdateDepositsInterest(EditInterRateObj).subscribe((EditResp) => {

        if (EditResp.statusCode == 200) {
          this.EditInterestsdata = EditResp.data;
          // console.log("sangham",this.EditInterestsRatedata)

          Swal.fire({
            icon: 'success',
            text: 'Interest Update successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          // $("#exampleModal0005").modal("show");
          $("#EditDepositInterestModal").modal("hide");
          this.editDepositInterestForm.reset();

          // this.SanghamDeposits();
          this.SanghamDeposit(this.SanghamDepositsDetailsId);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Interest already added',
          });
        }

      })


    }


  }









  // START-(ADD)SANGHAM-DEPOSITS //

  AddSanghamDeposit() {
    if (this.SanghamdepositForm.valid) {
      let DepositObj = {
        sanghamId: this.UserSanghamId,
        // depositLimit: this.DepositForm.value.DepositLimit,
        interest: this.SanghamdepositForm.value.Interest,
        depositDate: this.SanghamdepositForm.value.DepositDate,
      }

      const [year, month, day] = DepositObj.depositDate.split('-');
      DepositObj.depositDate = `${day}-${month}-${year}`;



      console.log(".,,,,,,,", DepositObj)
      this.Services.AddDepositData(DepositObj).subscribe((addDepositResp) => {
        if (addDepositResp.statusCode == 200) {
          this.AddSanghamDepositdata == addDepositResp.data;
          console.log("Add-Deposit-Details", this.AddSanghamDepositdata)

          Swal.fire({
            icon: 'success',
            text: 'Successfully Add Sangham Deposit',
            showConfirmButton: false,
            timer: 3000,
          });
          this.SanghamdepositForm.reset();

          $("#exampleModal-006").modal("show");
          $("#exampleModal-006").modal("hide");
          this.SanghamDeposit(addDepositResp.data);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'something went wrong',
          });
        }

      })

    }

  }

  // END-(ADD)SANGHAM-DEPOSITS //


  // START-AGENT-BY-(ADD)SANGHAM-DETAILS 

  AddSangham() {
    if (this.SanghamForm.valid) {
      let SanghamObj = {
        agentId: this.agentId.agentId,
        startDate: this.SanghamForm.value.StartDate,
        endDate: this.SanghamForm.value.EndDate
      }
      const [year, month, day] = SanghamObj.startDate.split('-');
      SanghamObj.startDate = `${day}-${month}-${year}`;
      const [endyear, endmonth, endday] = SanghamObj.endDate.split('-');
      SanghamObj.endDate = `${endday}-${endmonth}-${endyear}`;



      console.log("demo", SanghamObj);
      this.Services.AddSanghamData(SanghamObj).subscribe((SangamResp) => {
        console.log("success", SangamResp);
        if (SangamResp.statusCode == 200) {
          this.AddSanghamdata = SangamResp.data;
          // localStorage.setItem('token', SangamResp.token);
          Swal.fire({
            icon: 'success',
            text: 'Successfully Logged in',
            showConfirmButton: false,
            timer: 3000,
          });
          this.SanghamForm.reset();

          $("#exampleModal1").modal("show");
          $("#exampleModal1").modal("hide");
          this.Sanghamlist();
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'something went wrong',
          });
        }
      })

    }
  }

  // END-AGENT-BY-(ADD)SANGHAM-DETAILS 




  modelClose() {
    //this.addpodupu = {};
    console.log('model Close-->');
  }



}
