import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { SangamService } from 'app/Services/sangam.service';
import { environment } from 'environments/environment';
import { data } from 'jquery';
import Swal from 'sweetalert2';
declare const $: any

@Component({
  selector: 'app-agent-sangham',
  templateUrl: './agent-sangham.component.html',
  styleUrls: ['./agent-sangham.component.scss']
})
export class AgentSanghamComponent implements OnInit {

  tokendetails: any;
  agentId: any;
  AgentSanghamUserId: any;
  token: string;
  user: any
  BaseUrl: string = environment.baseUrl;
  hasError: any;

  SanghamForm: FormGroup;
  AddSanghamdata: any;
  sanghamId: any;
  addpodupu: any;
  data: any;
  dataMessage: any;
  statusCode: any;
  PodupuForm: FormGroup;
  AddPodupudata: any;
  newtext: any;
  UserSanghamId: FormGroup;
  show: any;
  Depositform: any;
  DepositForm: any;
  AddDepositdata: any;
  PodupuData: FormGroup;
  PodupuObj: any[];
  showbutton: boolean = true;
  showEditIcon: boolean= true;
  editLengthForm: any;
  loginToken: any;
EditPodupuInterestForm: any;
  AgentSanghamPodupuDetailsId: any;
  interest: any;
  podupuDetailsId: any;
  EditInterestsdata: any;
editDepositInterestForm: any;
  AgentSanghamDepositsDetailsId: any;
  depositDetailsId: any;

  // registerUserData: any;
  constructor(private Services: SangamService, private router: Router) {

    this.SanghamForm = new FormGroup({
      StartDate: new FormControl('', [Validators.required]),
      EndDate: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      CustomersLimit: new FormControl('',[Validators.required])
    })

    this.PodupuForm = new FormGroup({
      MonthlyAmount: new FormControl('', [Validators.required]),
      Interest: new FormControl('', [Validators.required]),
      Fine: new FormControl('', [Validators.required]),
      StartDate: new FormControl('', [Validators.required]),
      PodupuPeriod: new FormControl('', [Validators.required]),
    })

    this.DepositForm = new FormGroup({
      Interest: new FormControl('', [Validators.required]),
      DepositDate: new FormControl('', [Validators.required]),
    })

    this.EditPodupuInterestForm = new FormGroup({
      EditINTEREST: new FormControl('', [Validators.required]),
    })

    this.editDepositInterestForm = new FormGroup({
      EDITIterest: new FormControl('', [Validators.required]),
    })






  }

  ngOnInit(): void {
    this.getAgentSanghams();

    this.agentId = JSON.parse(localStorage.getItem("single-agnetdata"));
    // console.log("text", this.agentId)
    // console.log("userName.....................", (this.agentId.agentName))
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }


  customer(data) {
    console.log("object123654", data)
    localStorage.setItem('customer-sanghamId', JSON.stringify(data));
    console.log("cusomer-sanghamId", this.data)

  }



  // START-LIST OF AGENTS //

  getAgentSanghams() {
    this.agentId = JSON.parse(localStorage.getItem("single-agnetdata"));
    // console.log("object", this.agentId)

    let sangamdata = {
      agentId: this.agentId.agentId
    };
    // console.log("sangamdata", sangamdata);
    this.Services.GetAddSanghams(sangamdata).subscribe((sangamResp) => {
      // console.log("bbbb", sangamResp)
      if (sangamResp.statusCode == 200) {
        this.AgentSanghamUserId = sangamResp.data;
        console.log("Sangham-List", this.AgentSanghamUserId);
      }
    })
  }

  // END-LIST OF AGENTS //



  // START-AGENT-BY-(ADD)SANGHAM-DETAILS 

  AddSangham() {
    if (this.SanghamForm.valid) {
      let SanghamObj = {
        agentId: this.agentId.agentId,
        startDate: this.SanghamForm.value.StartDate,
        endDate: this.SanghamForm.value.EndDate,
        address: this.SanghamForm.value.Address,
        customersLimit:this.SanghamForm.value.CustomersLimit
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
            text: 'Sangham Added Successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          this.SanghamForm.reset();

          $("#exampleModal1").modal("show");
          $("#exampleModal1").modal("hide");
          this.getAgentSanghams();
        } 
        else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Sangham Already Existed',
          });
        }
      })

    }
  }

  // END-AGENT-BY-(ADD)SANGHAM-DETAILS 


  // START-AGENT-BY-(PODUPU)SANGHAM-DETAILS 

  Podupu(data) {
    // console.log("text", data)
    // let demo = data.sanghamId;
    // console.log("ddd", demo)

    this.UserSanghamId = data.sanghamId;
    console.log("get-sanghamId", this.UserSanghamId)

    let PodupuObj = {
      sanghamId: this.UserSanghamId
    };
    console.log("podup", PodupuObj);

    this.Services.PodupuData(PodupuObj).subscribe((podupuResp) => {
      // console.log("success1", podupuResp);
      this.addpodupu = {};
      if (podupuResp.statusCode == 200) {
        this.showbutton = false;
        this.showEditIcon = true;
        console.log('onLoad--->', this.addpodupu);
        this.dataMessage = podupuResp;
        this.statusCode = podupuResp.statusCode;
        this.addpodupu = podupuResp.data[0];
        console.log("Get-Podupu-Details", this.addpodupu);
        $("#exampleModal2").modal("show");
        // this.addpodupu = {}
        // $("#exampleModal2").modal("hide");
      } else {
        this.showbutton = true;
        this.showEditIcon = false;
        this.dataMessage = podupuResp;
        this.statusCode = podupuResp.statusCode;
        this.addpodupu = {};
        console.log('onLoad else case--->', this.addpodupu);
      }
    })
  }

  // END-AGENT-BY-(PODUPU)SANGHAM-DETAILS 


  // START-AGENT-BY-(DEPOSITS)SANGHAM-DETAILS 

  Deposit(data) {

    this.UserSanghamId = data.sanghamId;
    console.log("get-sanghamId", this.sanghamId)

    let DepositObj = {
      sanghamId: this.UserSanghamId
    };

    this.Services.Depositdata(DepositObj).subscribe((depositResp) => {
      console.log("success11111111", depositResp);
      this.Depositform = {};
      if (depositResp.statusCode == 200) {
        this.showbutton = false;
        this.showEditIcon = true;
        console.log('onLoad--->', this.Depositform);
        this.dataMessage = depositResp;
        this.statusCode = depositResp.statusCode;
        this.Depositform = depositResp.data[0];
        console.log("Get-Deposit-Details", this.Depositform);
        $("#exampleModal4").modal("show");
        // $("#exampleModal4").modal("hide");
      } else {
        this.showbutton = true;
        this.showEditIcon = false;
        this.dataMessage = depositResp;
        this.statusCode = depositResp.statusCode;
        this.Depositform = {};
        console.log('onLoad else case--->', this.Depositform);
      }

    })






  }

  // END-AGENT-BY-(DEPOSITS)SANGHAM-DETAILS 


  // START-AGENT-BY-(ADD-PODUPU)SANGHAM-DETAILS 

  AddPodupu() {
    if (this.PodupuForm.valid) {

      let PodupuObj = {
        sanghamId: this.UserSanghamId,
        monthlyAmount: this.PodupuForm.value.MonthlyAmount,
        interest: this.PodupuForm.value.Interest,
        fine: this.PodupuForm.value.Fine,
        startDate: this.PodupuForm.value.StartDate,
        podupuPeriod: this.PodupuForm.value.PodupuPeriod
      }
      const [year, month, day] = PodupuObj.startDate.split('-');
      PodupuObj.startDate = `${day}-${month}-${year}`;
      console.log("Add-Podupu", PodupuObj);

      this.Services.AddPodupuData(PodupuObj).subscribe((addpodupuResp) => {
        // console.log("success", addpodupuResp);
        if (addpodupuResp.statusCode == 200) {
          this.AddPodupudata = addpodupuResp.data;
          console.log("Add-Podupu-Details", this.AddPodupudata)
          Swal.fire({
            icon: 'success',
            text: 'Successfully Add Podupu',
            showConfirmButton: false,
            timer: 3000,
          });
          this.PodupuForm.reset();
          $("#exampleModal3").modal("show");
          $("#exampleModal3").modal("hide");
          this.Podupu(addpodupuResp.data);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Podupu Already Existed',
          });
        }
      })

    }

  }
  // END-AGENT-BY-(ADD-PODUPU)SANGHAM-DETAILS 


  // START-AGENT-BY-(ADD-DEPOSITS)SANGHAM-DETAILS 

  AddDeposit() {
    if (this.DepositForm.valid) {
      let DepositObj = {
        sanghamId: this.UserSanghamId,
        // depositLimit: this.DepositForm.value.DepositLimit,
        interest: this.DepositForm.value.Interest,
        depositDate: this.DepositForm.value.DepositDate,
      }

      const [year, month, day] = DepositObj.depositDate.split('-');
      DepositObj.depositDate = `${day}-${month}-${year}`;


      console.log(".,,,,,,,", DepositObj)
      this.Services.AddDepositData(DepositObj).subscribe((addDepositResp) => {
        if (addDepositResp.statusCode == 200) {
          this.AddDepositdata == addDepositResp.data;
          console.log("Add-Deposit-Details", this.AddDepositdata)

          Swal.fire({
            icon: 'success',
            text: 'Successfully Add Deposit',
            showConfirmButton: false,
            timer: 3000,
          });
          this.DepositForm.reset();

          $("#exampleModal5").modal("show");
          $("#exampleModal5").modal("hide");
          this.Deposit(addDepositResp.data);

        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Podupu Already Existed',
          });
        }

      })

    }

  }

  // END-AGENT-BY-(ADD-DEPOSITS)SANGHAM-DETAILS 




  OnEdit(data) {
    // console.log("...........data",data);
    this.AgentSanghamPodupuDetailsId = data.sanghamId[0];
    this.interest = data.interest;
    // console.log("asdfgh",this.interestRate)
    this.podupuDetailsId = data.podupuDetailsId;
    this.EditPodupuInterestForm.controls["EditINTEREST"].setValue(data.interest);

    $("#EditPodupuInterestModal").modal("show");
  }

  upDatePodupuInterest() {
    if (this.EditPodupuInterestForm.valid) {

      let EditInterRateObj = {
        podupuDetailsId: this.podupuDetailsId,
        interest: this.EditPodupuInterestForm.value.EditINTEREST
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
          $("#EditPodupuInterestModal").modal("hide");
          this.EditPodupuInterestForm.reset();

          // this.SanghamDeposits();
          this.Podupu(this.AgentSanghamPodupuDetailsId);

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





  onEdit(data) {
    // console.log("...........data",data);
    this.AgentSanghamDepositsDetailsId = data.sanghamId[0];
    this.interest = data.interest;
    // console.log("asdfgh",this.interestRate)
    this.depositDetailsId = data.depositDetailsId;
    this.editDepositInterestForm.controls["EDITIterest"].setValue(data.interest);

    $("#EditDepositInterestModal").modal("show");
  }

  upDateDpInterest() {
    if (this.editDepositInterestForm.valid) {

      let EditInterRateObj = {
        depositDetailsId: this.depositDetailsId,
        interest: this.editDepositInterestForm.value.EDITIterest
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
          this.Deposit(this.AgentSanghamDepositsDetailsId);

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








  modelClose() {
    //this.addpodupu = {};
    console.log('model Close-->');
  }


}
