import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SangamService } from 'app/Services/sangam.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';
import { Router } from '@angular/router';


declare const $: any;


@Component({
  selector: 'app-customer-sangham',
  templateUrl: './customer-sangham.component.html',
  styleUrls: ['./customer-sangham.component.scss']
})
export class CustomerSanghamComponent implements OnInit {
  @ViewChild('myModal') myModal: ElementRef;
  sanghamId: any;
  CustomerId: any;
  dataCount: any;
  CustomerForm: any;
  hasError: any;
  passValidator: any;
  imageFile: any;
  imageFile1: any;
  imageFile11: any;
  newcustomerResp: any;
  AddNewCustomers: any;
  textappu: any;
  customerId: any;
  AppuData: any;
  AppuDetails: any;
  dataMessage: any;
  AppuForm: FormGroup;
  AddAppuData: any;
  CustomerView: any;
  // editCustomerForm: any;
  imageFile2: any;
  imageFile3: any;
  IsProfileImage: boolean = true;
  IsAadharImage: boolean = true;
  IsAadharImage2: boolean = true;
  editingAadharImage: any;
  editingAadharImage2: any;
  editingProfileImage: any;
  editPassValidator: boolean = false;
  registerUserData: any;
  showbutton: boolean = true;
  statusCode: any;
  BaseUrl: string = environment.baseUrl;
  editCustomerForm: any;
  blockedCustomer: any;
  AddCustomerAppuData: any;
  ToInterests: any;
  interestValue: any;
  loginToken: any;
  imageFile22: any;


  constructor(private Services: SangamService,private location: Location,private renderer: Renderer2, private router: Router) {

    this.CustomerForm = new FormGroup({
      // sanghamId: new FormControl('',),
      FirstName: new FormControl('', [Validators.required]),
      MobileNo: new FormControl('', [Validators.required]),
      AadharNo: new FormControl('', [Validators.required]),
      Address: new FormControl('', [Validators.required]),
      AadharImage: new FormControl(''),
      AadharImage2: new FormControl(''),
      ProfileImage: new FormControl(''),
    })

    this.AppuForm = new FormGroup({
      AppuDate: new FormControl('', [Validators.required]),
      Interest: new FormControl("", [Validators.required]),
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

  openModal(data): void {
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

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    this.getCustomers();
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


  getInterestsList() {
    this.Services.GetInterest().subscribe((InterResp) => {
      // console.log("one-date",Sangresp)
      if (InterResp.statusCode == 200) {
        this.ToInterests = InterResp.data;
        this.interestValue = InterResp.data[0].interest
        console.log("........value", this.interestValue)
        console.log("Customer-data", this.ToInterests)
       this.AppuForm.controls['Interest'].setValue(this.interestValue)
      }
    });
  }


  getCustomers() {

    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
    console.log("memo..........", this.sanghamId)

    let customerData = {
      sanghamId: this.sanghamId.sanghamId
    };
    console.log("mmmmmmm", customerData)

    this.Services.CustomerBysangham(customerData).subscribe((customerResp) => {
      if (customerResp.statusCode == 200) {
        this.CustomerId = customerResp.data
        this.dataCount = customerResp
        this.CustomerId.forEach((item) => {
          // item.textColor = (item.status === "block") ? "red" : "black";
          if(item.status === 'block') {
            item.textColor = "red"
          } else {
            item.textColor = "black"
          }
        })
        console.log("Get-Podupu-Details", this.CustomerId)
      }
    });
  }





  // {....................Add-Images -Start.....................}

  urls: any[] = [];
  index: any;
  imageDeleteFrom!: FormGroup;
  imagePath: any;
  RemoveImage: boolean = false;

  selectFiles(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        console.log(event.target.files, "event.....");
        this.imageFile = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls = [];
          this.urls.push(event.target.result);
          console.log(this.urls, "urls.....");
          this.RemoveImage = true;
        };
      }
    } else this.RemoveImage = false;
  }

  removeSelectedFile(index: any) {
    this.urls = this.urls.slice(index + 1);
    console.log(this.urls.slice(index), ".......slice");
    this.imageFile = "null";
  }


  urls1: any[] = [];
  index1: any;
  imageDeleteFrom1!: FormGroup;
  imagePath1: any;
  RemoveImage1: boolean = false;

  selectFiles1(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile1 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls1 = [];
          this.urls1.push(event.target.result);
          console.log(this.urls1);
          this.RemoveImage1 = true;
        };
      }
    } else this.RemoveImage1 = false;
  }

  removeSelectedFile1(index: any) {
    this.urls1 = this.urls1.slice(index + 1);
    console.log(this.urls1.slice(index), ".......slice");
    this.imageFile1 = "null";
  }


  urls11: any[] = [];
  index11: any;
  imageDeleteFrom11!: FormGroup;
  imagePath11: any;
  RemoveImage11: boolean = false;

  selectFiles11(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile11 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls11 = [];
          this.urls11.push(event.target.result);
          console.log(this.urls11);
          this.RemoveImage11 = true;
        };
      }
    } else this.RemoveImage11 = false;
  }

  removeSelectedFile11(index: any) {
    this.urls11 = this.urls11.slice(index + 1);
    console.log(this.urls11.slice(index), ".......slice");
    this.imageFile11 = "null";
  }



  AddCustomers() {
    if (this.CustomerForm.valid && !this.passValidator) {
      const CustomerForm = new FormData();
      CustomerForm.append("sanghamId", this.sanghamId.sanghamId);
      CustomerForm.append("firstName", this.CustomerForm.value.FirstName);
      CustomerForm.append("mobileNo", this.CustomerForm.value.MobileNo);
      CustomerForm.append("aadharNo", this.CustomerForm.value.AadharNo);
      CustomerForm.append("address", this.CustomerForm.value.Address);

      if (this.imageFile) {
        CustomerForm.append("aadharImage", this.imageFile);
      }

      if (this.imageFile11) {
        CustomerForm.append("aadharImage2", this.imageFile11);
      }

      if (this.imageFile1) {
        CustomerForm.append("profileImage", this.imageFile1);
      }
      console.log("3333", CustomerForm);


      this.Services.AddNewCustomers(CustomerForm).subscribe((newcustomerResp) => {

        if (newcustomerResp.statusCode == 200) {

          this.AddNewCustomers = newcustomerResp.data

          Swal.fire({
            icon: 'success',
            text: 'add Customer Successfully',
            showConfirmButton: false,
            timer: 2000,
          });
          // this.router.navigateByUrl('/agent')
          $("#exampleModal01").modal("show");
          // this.AgentForm.reset();
          $("#exampleModal01").modal("hide");
          this.getCustomers();
          this.urls = [];
          this.urls1 = [];
          this.imageFile = {};
          this.imageFile1 = {};
          this.passValidator = false;
        } else {
          Swal.fire({
            icon: 'error',
            text: '"Something went wrong',
          });
        }

      });

    } else {
      console.log("Errrrrr")
    }



  }


  Appu(data) {
    this.sanghamId = JSON.parse(localStorage.getItem("customer-sanghamId"));
    this.customerId = data.customerId;
    console.log("side-body", this.sanghamId[0]);

    let AppuData = {
      customerId: this.customerId,
      sanghamId: this.sanghamId.sanghamId
    };
    console.log("............kdjknsd", AppuData)

    this.Services.GetAppu(AppuData).subscribe((appuResp) => {
      this.AppuDetails = {};

      if (appuResp.statusCode == 200) {
        this.showbutton = false;
        console.log('onLoad--->', this.AppuDetails);
        this.dataMessage = appuResp
        this.statusCode = appuResp.statusCode;
        this.AppuDetails = appuResp.data[0]
        console.log("Get-Appu-Details", this.AppuDetails)
        $("#exampleModal02").modal("show");
        // $("#exampleModal02").modal("hide");
      } else {
        this.showbutton = true;
        this.dataMessage = appuResp;
        this.statusCode = appuResp.statusCode;
        this.AppuDetails = {};
        console.log('onLoad else case--->', this.AppuDetails);
      }

    })
  }


  // Onview(data) {
  //   $("#CustomerViewModal").modal("show");
  //   console.log("data", data)
  //   this.CustomerView = data;
  // }


  // brand image Edit
  urls2: any[] = [];
  index2: any;
  imageDeleteFrom2!: FormGroup;
  imagePath2: any;
  RemoveImage2: boolean = false;

  selectFiles2(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
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
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
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
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
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

  Ondelete(data){
    // console.log("delete.........",data);
    this.customerId = data.customerId;

    let deleteObj = {
      customerId: data.customerId,
    };
    Swal.fire({
      title: "Are You Sure?",
      text: "Want To Delete This Customer..!",
      icon: "warning",
      confirmButtonText: "Yes, Delete it",
      showCancelButton: true,
    })
      .then((result)=>{
        if(result.isConfirmed){
          this.Services.CustomerDelete(deleteObj).subscribe((deleteResp)=>{
            if(deleteResp.statusCode == 200){
              Swal.fire({
                icon: "success",
                text: "Customer Deleted Successfully",
                showConfirmButton: false,
                timer: 2000,
              });
            }
            this.getCustomers();
          })

        }else if (result.isDenied) {
          Swal.fire("Something went wrong..!", "error");
        }

    });
    

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
          this.getCustomers();
          this.urls = [];
          this.urls1 = [];
          this.imageFile = {};
          this.imageFile1 = {};

        }  else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'something went wrong',
          });
        }

      });


    } else {
      this.hasError = true;
      console.log("dsdsdd");
    }

  }



  AddAppu() {
    if (this.AppuForm.valid) {
      let appuObj = {
        customerId: this.customerId,
        sanghamId: this.sanghamId.sanghamId,
        appuDate: this.AppuForm.value.AppuDate,
        interest: this.AppuForm.value.Interest,
        timePeriod: this.AppuForm.value.TimePeriod,
        fine: this.AppuForm.value.Fine
      }

      const [year, month, day] = appuObj.appuDate.split('-');
      appuObj.appuDate = `${day}-${month}-${year}`;


      console.log("appu......", appuObj)
      this.Services.AppuDetails(appuObj).subscribe((AppuResp) => {
        if (AppuResp.statusCode == 200) {
          this.AddAppuData = AppuResp.data
          Swal.fire({
            icon: 'success',
            text: 'Successfully Add customer appu',
            showConfirmButton: false,
            timer: 3000,
          });
          this.AppuForm.reset();

          $("#exampleModal03").modal("show");
          $("#exampleModal03").modal("hide");
          this.Appu(AppuResp.data);
        }
         else {
          console.log("Error");
          Swal.fire({
            icon: 'error',
            text: 'something went wrong',
          });
        }
      })
    }
  }








  
  ViewCustomer(data) {
    console.log("viewCustomerdata",data)
    localStorage.setItem('view-CustomerId', JSON.stringify(data));
    console.log("viewCustomer", this.CustomerId);
    localStorage.setItem('view-SanghamId', JSON.stringify(data));
    console.log("viewsanghamId", this.CustomerId);
  }

  blockingText() {
    this.blockedCustomer = JSON.parse(localStorage.getItem("blockedCustomer"))
    console.log("this.blockedCustomer", this.blockedCustomer);
    let innerH6 = document.getElementById("innerH6");
    if(this.blockedCustomer.status === "active") {
      innerH6.innerText = "block"
    } else if(this.blockedCustomer.status === "block") {
      innerH6.innerText = "unblock"
    } else {
      innerH6.innerText = "not found"
    }
    console.log(".....text",innerH6.innerText);
  }


  unblockCustomer() {
    this.blockedCustomer = JSON.parse(localStorage.getItem("blockedCustomer"))
    console.log("this.blockedCustomer",this.blockedCustomer);
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
        // this.CustomerAppuForm.reset();
        // $("#exampleModal0005").modal("show");
        // $("#exampleModal0005").modal("hide");
        this.closeModal();
        this.getCustomers();
      } else {
        console.log("Error");
        Swal.fire({
          icon: 'error',
          text: 'Appu Details Already added to this Customer',
        });
      }
    })
  }







  modelClose() {
    //this.addpodupu = {};
    console.log('model Close-->');
  }




}
