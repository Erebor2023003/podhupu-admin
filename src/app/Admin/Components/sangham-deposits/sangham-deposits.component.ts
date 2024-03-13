import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SangamService } from 'app/Services/sangam.service';
import Swal from 'sweetalert2';
declare const $: any;


@Component({
  selector: 'app-sangham-deposits',
  templateUrl: './sangham-deposits.component.html',
  styleUrls: ['./sangham-deposits.component.scss']
})
export class SanghamDepositsComponent implements OnInit {
  showbutton: boolean = true;
  showEditIcon: boolean = true;
  DepositsanghamId: any;
  SanghamDepositsDetails: any;
  data: any;
  dataMessage: any;
  DepositsSangham: any;
  hasError: any;
  agentId: any;
  DepositsSanghamForm: any;
  DepositsDetails: any;
  FormDeposits: FormGroup
  AddSanghamDeposotsdata: any;
  loginToken: any;
  editInterestRateForm: any;
  interestRate: any;
  sanghamdepositDetailsId: any;
  EditInterestsRatedata: any;
  sanghamDetailsId: any;


  constructor(private Services: SangamService, private router: Router) {

    this.FormDeposits = new FormGroup({
      InterestRate: new FormControl('', [Validators.required]),
      DepositDate: new FormControl('', [Validators.required])
    })

    this.editInterestRateForm = new FormGroup({
      InterestsRate: new FormControl('', [Validators.required]),
    })




  }

  ngOnInit(): void {
    this.Sanghamlist();
    this.agentId = JSON.parse(localStorage.getItem("single-agnetdata"));
    // console.log("text", this.agentId)
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }

  // START VIEW DEPOSITS-WITHDRAW DETAILS STORE ID

  DepositsWithdraw(data) {
    localStorage.setItem('set-sanghamId', JSON.stringify(data));
    console.log("get-SanghamDepositsDetails", this.SanghamDepositsDetails);
  }
  // END VIEW DEPOSITS-WITHDRAW DETAILS STORE ID



  // START-LIST OF SANGHAM //

  Sanghamlist() {
    this.Services.getSangham().subscribe((Sangresp) => {
      // console.log("one-date",Sangresp)
      if (Sangresp.statusCode == 200) {
        this.SanghamDepositsDetails = Sangresp.data;
        console.log("SanghamDepositDetails-data", this.SanghamDepositsDetails)
      }
    });
  }

  // END-LIST OF SANGHAM //

  //  START-SANGHAM-DEPOSITS-DETAILS


  SanghamDeposits(data) {
    this.DepositsanghamId = data.sanghamId;
    console.log("SanghamDepositsId", this.DepositsanghamId);

    let DepositsObj = {
      sanghamId: this.DepositsanghamId
    }
    console.log("SanghamDeposits", DepositsObj);

    this.Services.SanghamNewDeposits(DepositsObj).subscribe((DepositResp) => {
      if (DepositResp.statusCode == 200) {
        this.DepositsDetails = {}
        this.showbutton = false;
        this.showEditIcon = true;
        console.log('onLoad--->', this.DepositsDetails);
        this.dataMessage = DepositResp;
        this.DepositsDetails = DepositResp.data;
        console.log("Get-SanghamDepositsDetails", this.DepositsDetails);

        $("#exampleModal-001").modal("show");

      } else {

        this.showbutton = true;
        this.showEditIcon = false;
        this.dataMessage = DepositResp;
        this.DepositsDetails = {};
        console.log('onLoad else case--->', this.DepositsDetails);

      }
    })



  }

  // END-SANGHAM-DEPOSITS-DETAILS 

  // START-(ADD)SANGHAM-DEPOSITS-DETAILS

  AddSanghamDeposits() {
    if (this.FormDeposits.valid) {

      let SanghamDepObj = {
        sanghamId: this.DepositsanghamId,
        agentId: this.agentId.agentId,
        interestRate: this.FormDeposits.value.InterestRate,
        depositDate: this.FormDeposits.value.DepositDate
      }

      const [year, month, day] = SanghamDepObj.depositDate.split('-');
      SanghamDepObj.depositDate = `${day}-${month}-${year}`;




      console.log("add....SanghamDeposits", SanghamDepObj)

      this.Services.GetaddDeposits(SanghamDepObj).subscribe((AddSanghamResp) => {

        if (AddSanghamResp.statusCode == 200) {
          this.AddSanghamDeposotsdata = AddSanghamResp.data;

          Swal.fire({
            icon: 'success',
            text: 'Sangham Deposit Details Added Successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          this.FormDeposits.reset();
          $("#exampleModal-002").modal("show");
          $("#exampleModal-002").modal("hide");
          this.SanghamDeposits(AddSanghamResp.data);

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

  // END-(ADD)SANGHAM-DEPOSITS-DETAILS

  onEdit(data) {
    // console.log("...........data",data);
    this.sanghamDetailsId = data;
    this.interestRate = data.interestRate;
    // console.log("asdfgh",this.interestRate)
    this.sanghamdepositDetailsId = data.sanghamdepositDetailsId;
    this.editInterestRateForm.controls["InterestsRate"].setValue(data.interestRate);

    $("#EditInterestRateModal").modal("show");
  }

  upDateInterestRate() {
    if (this.editInterestRateForm.valid) {

      let EditInterRateObj = {
        sanghamdepositDetailsId: this.sanghamdepositDetailsId,
        interestRate: this.editInterestRateForm.value.InterestsRate
      }
      console.log("Edit....EditInterObj", EditInterRateObj);

      this.Services.UpdateInterestRate(EditInterRateObj).subscribe((EditResp) => {

        if (EditResp.statusCode == 200) {
          this.EditInterestsRatedata = EditResp.data;
          // console.log("sangham",this.EditInterestsRatedata)

          Swal.fire({
            icon: 'success',
            text: 'Interest Rate Update successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          // $("#exampleModal0005").modal("show");
          $("#EditInterestRateModal").modal("hide");
          this.editInterestRateForm.reset();

          // this.SanghamDeposits();
          this.SanghamDeposits(this.sanghamDetailsId);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'InterestRate already added',
          });
        }

      })


    }


  }




  modelClose() {
    console.log('model Close-->');
  }

}
