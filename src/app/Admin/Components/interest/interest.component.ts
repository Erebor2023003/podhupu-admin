import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SangamService } from 'app/Services/sangam.service';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';


declare const $: any;

@Component({
  selector: 'app-interest',
  templateUrl: './interest.component.html',
  styleUrls: ['./interest.component.scss']
})
export class InterestComponent implements OnInit {
  FormInterest: any;
  hasError: any;
  AddInterestsdata: any;
  ToInterests: any;
  editInterestForm: any;
  EditInterestsdata: any;
  interestId: any;
  localToken: any;
  loginToken: any;


  constructor(private Services: SangamService,private router: Router) {
    this.FormInterest = new FormGroup({
      Interest: new FormControl('', [Validators.required]),
    })

    this.editInterestForm = new FormGroup({
      Interest: new FormControl('', [Validators.required]),
    })
  }

  ngOnInit(): void {
    this.getInterestsList();
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }

  getInterestsList() {
    this.Services.GetInterest().subscribe((InterResp) => {
      // console.log("one-date",Sangresp)
      if (InterResp.statusCode == 200) {
        this.ToInterests = InterResp.data;
        console.log("Interest-data", this.ToInterests)
      }
    });
  }

  // START-(ADD)INTEREST-DETAILS

  AddInterest() {
    if (this.FormInterest.valid) {

      let InterestObj = {
        interest: this.FormInterest.value.Interest
      }
      console.log("add....SanghamDeposits", InterestObj)

      this.Services.AddInterest(InterestObj).subscribe((AddInResp) => {

        if (AddInResp.statusCode == 200) {
          this.AddInterestsdata = AddInResp.data;

          Swal.fire({
            icon: 'success',
            text: 'Interest added successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          this.FormInterest.reset();

          // this.SanghamDeposits(AddSanghamResp.data);

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

  // END-(ADD)INTEREST-DETAILS

  onEdit(data) {
    console.log("...........data",data);
    $("#EditInterestModal").modal("show");
    this.interestId = data.interestId;
    this.editInterestForm.controls["Interest"].setValue(data.interest);
    console.log("hole.....", this.editInterestForm)
  }

  upDateInterest() {


    if (this.editInterestForm.valid) {

      let EditInterObj = {
        interestId: this.interestId,
        interest: this.editInterestForm.value.Interest
      }
      console.log("Edit....EditInterObj", EditInterObj);

      this.Services.UpdateInterest(EditInterObj).subscribe((EditResp) => {

        if (EditResp.statusCode == 200) {
          this.EditInterestsdata = EditResp.data;

          Swal.fire({
            icon: 'success',
            text: 'Interest Update successfully',
            showConfirmButton: false,
            timer: 3000,
          });
          // $("#exampleModal0005").modal("show");
          $("#EditInterestModal").modal("hide");
          this.editInterestForm.reset();

          this.getInterestsList();
          // this.SanghamDeposits(AddSanghamResp.data);

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
