import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SangamService } from 'app/Services/sangam.service';
import { Location } from '@angular/common';

declare const $: any;
import Swal from 'sweetalert2';
import { environment } from 'environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.scss']
})
export class CustomerComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  tocustomer: any;
  CusomerSanghamId: any;
  showbutton: boolean = true;
  sanghamId: any;
  customerId: any;
  dataMessage: any;
  statusCode: any;
  CustomerAppuDetails: any;
  CustomerAppuForm: FormGroup;
  hasError: any;
  AddCustomerAppuData: any;
  data: any;
  blockedCustomer: any;
  BaseUrl: string = environment.baseUrl;
  editCustomerForm: any;
  registerUserData: any;
  ToInterests: any;
  interestValue: any;
  loginToken: any;
  IsProfileImage: boolean = true;
  IsAadharImage: boolean = true;
  IsAadharImage2: boolean = true;
  editingAadharImage: any;
  editingAadharImage2: any;
  editingProfileImage: any;
  imageFile2: any;
  imageFile3: any;
  imageFile22: any;


  constructor(private Services: SangamService, private location: Location, private renderer: Renderer2, private router: Router) {

    this.CustomerAppuForm = new FormGroup({
      AppuDate: new FormControl('', [Validators.required]),
      Interest: new FormControl('', [Validators.required]),
      TimePeriod: new FormControl('', [Validators.required]),
      Fine: new FormControl('', [Validators.required])
    })

    this.editCustomerForm = new FormGroup({
      FirstName: new FormControl('', [Validators.required]),
      MobileNo: new FormControl('', [Validators.required]),
      AadharNo: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      AadharImage: new FormControl(''),
      AadharImage2: new FormControl(''),
      ProfileImage: new FormControl(''),

    })
  }

  ngOnInit(): void {
    this.Customerlist();
    this.getInterestsList();


    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
    console.log("memo..........", this.sanghamId)
    //  console.log("userName.....................", (this.sanghamId.firstName))
    this.blockedCustomer = JSON.parse(localStorage.getItem("blockedCustomer"))
    this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.loginToken) {
      this.router.navigate(['/']);
    }
  }

  goBack(): void {
    this.location.back();
  }

  openModal(data): void {
    console.log("blockedCustomer", data)
    this.renderer.addClass(this.myModal.nativeElement, 'show');
    this.renderer.setStyle(this.myModal.nativeElement, 'display', 'block');
    this.renderer.setStyle(document.body, 'overflow', 'hidden');
    localStorage.setItem('blockedCustomer', JSON.stringify(data));
    this.blockingText();
  }

  closeModal(): void {
    this.renderer.removeClass(this.myModal.nativeElement, 'show');
    this.renderer.removeStyle(this.myModal.nativeElement, 'display');
    this.renderer.removeStyle(document.body, 'overflow');
  }


  getInterestsList() {
    this.Services.GetInterest().subscribe((InterResp) => {
      // console.log("one-date",Sangresp)
      if (InterResp.statusCode == 200) {
        this.ToInterests = InterResp.data;
        this.interestValue = InterResp.data[0].interest
        console.log("........value", this.interestValue)
        console.log("Customer-data", this.ToInterests)
        this.CustomerAppuForm.controls['Interest'].setValue(this.interestValue)
      }
    });
  }


  // START-LIST OF CUSTOMER //

  Customerlist() {
    this.Services.getCustomer().subscribe((Custresp) => {
      // console.log("one-date",Sangresp)
      if (Custresp.statusCode == 200) {
        this.tocustomer = Custresp.data;
        this.tocustomer.forEach((item) => {
          item.textColor = (item.status === "block") ? "red" : "black";
        })
        console.log("Customer-data", this.tocustomer)
      }
    });
  }

  // END-LIST OF CUSTOMER //

  // START VIEW CUSTOMER  DETAILS STORE ID

  ViewCustomer(data) {
    console.log("viewCustomerdata", data)
    localStorage.setItem('view-CustomerId', JSON.stringify(data));
    console.log("viewCustomer", this.tocustomer);
    localStorage.setItem('view-SanghamId', JSON.stringify(data));
    console.log("viewsanghamId", this.tocustomer);
  }

  // END VIEW CUSTOMER  DETAILS STORE ID






  // START-EDIT-CUSTOMER DETAILS //




  // brand image Edit
  urls2: any[] = [];
  index2: any;
  imageDeleteFrom2!: FormGroup;
  imagePath2: any;
  RemoveImage2: boolean = false;

  selectFiles2(event: any) {
    if (event.target.files.length <= 2 && this.urls2.length <= 2) {
      this.IsAadharImage = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile2 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls2 = [];
          this.urls2.push(event.target.result);
          this.RemoveImage2 = true;
        };
      }
      console.log(this.imageFile2);
    } else this.RemoveImage2 = false;
  }
  removeSelectedFile2(index: any) {
    this.urls2.splice(index, 1);
    console.log(this.urls2);
    this.imageFile2 = "";
    console.log(this.imageFile2);
    this.IsAadharImage = true;
  }


  urls22: any[] = [];
  index22: any;
  imageDeleteFrom22!: FormGroup;
  imagePath22: any;
  RemoveImage22: boolean = false;

  selectFiles22(event: any) {
    if (event.target.files.length <= 2 && this.urls22.length <= 2) {
      this.IsAadharImage2 = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile22 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls22 = [];
          this.urls22.push(event.target.result);
          this.RemoveImage22 = true;
        };
      }
      console.log(this.imageFile22);
    } else this.RemoveImage22 = false;
  }
  removeSelectedFile22(index: any) {
    this.urls22.splice(index, 1);
    console.log(this.urls22);
    this.imageFile22 = "";
    console.log(this.imageFile22);
    this.IsAadharImage = true;
  }


  urls3: any[] = [];
  index3: any;
  imageDeleteFrom3!: FormGroup;
  imagePath3: any;
  RemoveImage3: boolean = false;

  selectFiles3(event: any) {
    if (event.target.files.length <= 2 && this.urls3.length <= 2) {
      this.IsProfileImage = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile3 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls3 = [];
          this.urls3.push(event.target.result);
          this.RemoveImage3 = true;
        };
      }
    } else this.RemoveImage3 = false;
  }
  removeSelectedFile3(index: any) {
    this.urls3.splice(index, 1);
    console.log(this.urls3);
    this.imageFile3 = "";
    console.log(this.imageFile3);
    this.IsProfileImage = true;
  }

  // end brand image Edit






  // ONEDIT

  OnEdit(data) {
    $("#EditCustomerModal").modal("show");
    console.log("object", data);
    this.editCustomerForm.controls["FirstName"].setValue(data.firstName);
    this.editCustomerForm.controls["MobileNo"].setValue(data.mobileNo);
    this.editCustomerForm.controls["AadharNo"].setValue(data.aadharNo);
    this.editCustomerForm.controls["Address"].setValue(data.address);

    this.editCustomerForm.controls["AadharImage"].setValue(data.aadharImage);
    this.editingAadharImage = this.editCustomerForm.controls["AadharImage"].value;

    this.editCustomerForm.controls["AadharImage2"].setValue(data.aadharImage2);
    this.editingAadharImage2 = this.editCustomerForm.controls["AadharImage2"].value;

    this.editCustomerForm.controls["ProfileImage"].setValue(data.profileImage);
    this.editingProfileImage = this.editCustomerForm.controls["ProfileImage"].value;

    this.customerId = data.customerId;
    console.log("dkhkdkbnkbsd", this.customerId)
  }


  updateCustomer() {
    if (this.editCustomerForm.valid) {
      const customerUpdateData = new FormData();

      customerUpdateData.append('customerId', this.customerId);
      console.log("ID123", this.customerId);
      customerUpdateData.append("firstName", this.editCustomerForm.value.FirstName);
      customerUpdateData.append('mobileNo', this.editCustomerForm.value.MobileNo);
      customerUpdateData.append('aadharNo', this.editCustomerForm.value.AadharNo);
      customerUpdateData.append('address', this.editCustomerForm.value.Address);

      if (this.imageFile2) {
        customerUpdateData.append("aadharImage", this.imageFile2);
      }

      if (this.imageFile22) {
        customerUpdateData.append("aadharImage2", this.imageFile22);
      }
      if (this.imageFile3) {
        customerUpdateData.append("profileImage", this.imageFile3);
      }
      console.log("3333", customerUpdateData);

      this.Services.CustomerUpdate(customerUpdateData).subscribe((updateResp) => {
        console.log("igjgjgg", customerUpdateData)
        this.registerUserData = updateResp["registerResponse"];

        if (updateResp.statusCode == 200) {

          Swal.fire({
            icon: "success",
            text: "Customer Details Updated Successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          $("#EditCustomerModal").modal("hide");
          this.Customerlist();
          // this.urls = [];
          // this.urls1 = [];
          // this.imageFile = {};
          // this.imageFile1 = {};
        }

      });


    } else {
      this.hasError = true;
      console.log("dsdsdd");
    }

  }

  // END-EDIT-CUSTOMER DETAILS //



  Ondelete(data) {
    // console.log("delete.........",data);
    this.customerId = data.customerId;

    let deleteObj = {
      customerId: data.customerId,
    };
    Swal.fire({
      title: "Are You Sure?",
      text: "Want To Delete This Item..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    })
      .then((result) => {
        if (result.isConfirmed) {
          this.Services.CustomerDelete(deleteObj).subscribe((deleteResp) => {
            if (deleteResp.statusCode == 200) {
              Swal.fire({
                icon: "success",
                text: "Customer Deleted Successfully",
                showConfirmButton: false,
                timer: 2000,
              });
            }
            this.Customerlist();
          })

        } else if (result.isDenied) {
          Swal.fire("Something went wrong..!", "error");
        }

      });


  }


  //  START-CUSTOMER-APPU 

  // CustomerAppu(data) {
  //   console.log("cust..........",data)
  //   this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
  //   this.customerId = data.customerId;
  //   console.log("side-body", this.sanghamId);

  //   let AppuData = {
  //     customerId: this.customerId,
  //     sanghamId: this.sanghamId.sanghamId
  //   };
  //   console.log("............kdjknsd", AppuData)

  //   this.Services.GetAppu(AppuData).subscribe((appuResp) => {
  //     this.CustomerAppuDetails = {};

  //     if (appuResp.statusCode == 200) {
  //       this.showbutton = false;
  //       console.log('onLoad--->', this.CustomerAppuDetails);
  //       this.dataMessage = appuResp
  //       this.statusCode = appuResp.statusCode;
  //       this.CustomerAppuDetails = appuResp.data[0]
  //       console.log("Get-Appu-Details", this.CustomerAppuDetails)
  //       $("#exampleModal02").modal("show");
  //       // $("#exampleModal02").modal("hide");
  //     } else {
  //       this.showbutton = true;
  //       this.dataMessage = appuResp;
  //       this.statusCode = appuResp.statusCode;
  //       this.CustomerAppuDetails = {};
  //       console.log('onLoad else case--->', this.CustomerAppuDetails);
  //     }

  //   })

  // }

  //  END-CUSTOMER-APPU 

  CustomerListAppu(data) {
    console.log("cust..........", data)

    // this.sanghamId = data.sanghamId;
    if (Array.isArray(data.sanghamId)) {
      // If 'data.sanghamId' is an array, assign it directly
      this.sanghamId = data.sanghamId[0].sanghamId;
    } else {
      // If 'data.sanghamId' is not an array (i.e., a direct field), wrap it in an array
      this.sanghamId = data.sanghamId;
    }
    console.log("......sanghamId", this.sanghamId);
    this.customerId = data.customerId;
    console.log("side-body", this.sanghamId);

    let AppuData = {
      customerId: this.customerId,
      sanghamId: this.sanghamId
    };
    console.log("............kdjknsd", AppuData)

    this.Services.GetAppu(AppuData).subscribe((appuResp) => {
      this.CustomerAppuDetails = {};

      if (appuResp.statusCode == 200) {
        this.showbutton = false;
        console.log('onLoad--->', this.CustomerAppuDetails);
        this.dataMessage = appuResp
        this.statusCode = appuResp.statusCode;
        this.CustomerAppuDetails = appuResp.data[0]
        console.log("Get-Appu-Details", this.CustomerAppuDetails)
        $("#exampleModal02").modal("show");
        // $("#exampleModal02").modal("hide");
      } else {
        this.showbutton = true;
        this.dataMessage = appuResp;
        this.statusCode = appuResp.statusCode;
        this.CustomerAppuDetails = {};
        console.log('onLoad else case--->', this.CustomerAppuDetails);
      }

    })

  }

  //  START-(ADD)CUSTOMER-APPU 

  AddcustomerAppu() {
    if (this.CustomerAppuForm.valid) {
      let appuObj = {
        customerId: this.customerId,
        sanghamId: this.sanghamId,
        appuDate: this.CustomerAppuForm.value.AppuDate,
        interest: this.CustomerAppuForm.value.Interest,
        timePeriod: this.CustomerAppuForm.value.TimePeriod,
        fine: this.CustomerAppuForm.value.Fine
      }
      console.log("appu......", appuObj)
      const [year, month, day] = appuObj.appuDate.split('-');
      appuObj.appuDate = `${day}-${month}-${year}`;
      this.Services.AppuDetails(appuObj).subscribe((AppuResp) => {
        if (AppuResp.statusCode == 200) {
          this.AddCustomerAppuData = AppuResp.data
          Swal.fire({
            icon: 'success',
            text: 'Successfully Add customer appu',
            showConfirmButton: false,
            timer: 3000,
          });
          this.CustomerAppuForm.reset();
          $("#exampleModal0005").modal("show");
          $("#exampleModal0005").modal("hide");
          this.CustomerListAppu(AppuResp.data);
        } else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'Appu Details Already added to this Customer',
          });
        }
      })
    }
  }

  //  END-(ADD)CUSTOMER-APPU 

  // START-CUSTOMER*UNBLOCK

  blockingText() {
    this.blockedCustomer = JSON.parse(localStorage.getItem("blockedCustomer"))
    console.log("this.blockedCustomer", this.blockedCustomer);
    let innerH6 = document.getElementById("innerH6");
    if (this.blockedCustomer.status === "active") {
      innerH6.innerText = "block"
    } else if (this.blockedCustomer.status === "block") {
      innerH6.innerText = "unblock"
    } else {
      innerH6.innerText = "not found"
    }
    console.log(".....text", innerH6.innerText);
  }


  unblockCustomer() {
    this.blockedCustomer = JSON.parse(localStorage.getItem("blockedCustomer"))
    console.log("this.blockedCustomer", this.blockedCustomer);
    let blockcustomerobj = {
      customerId: this.blockedCustomer.customerId
    }
    this.Services.UnblockCustomer(blockcustomerobj).subscribe((blockResp) => {
      if (blockResp.statusCode == 200) {
        this.AddCustomerAppuData = blockResp.data
        Swal.fire({
          icon: 'success',
          text: 'Successfully unblocked customer',
          showConfirmButton: false,
          timer: 3000,
        });
        this.closeModal();
        this.Customerlist();
      } else {
        console.log("Error");
        Swal.fire({
          icon: 'error',
          text: 'Customer not found',
        });
      }
    })
  }

  // END-CUSTOMER*UNBLOCK







  modelClose() {
    //this.addpodupu = {};
    console.log('model Close-->');
  }



}
