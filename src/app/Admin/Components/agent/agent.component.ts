import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SangamService } from 'app/Services/sangam.service';
import { environment } from 'environments/environment';
import Swal from 'sweetalert2';
import { Router, RouterLink } from '@angular/router';

declare const $: any

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.scss']
})
export class AgentComponent implements OnInit {
  token: any;
  tokendetails: any;
  emailidRegex: any;
  AgentForm: any;
  hasError: any;
  imageFile: any;
  imageFile1: any;
  imageFile11: any;
  imageFile2: any;
  passValidator: any;
  registerUserData: any;
  viewtokendetails: any;
  AgentSanghamUserId: any;
  agentId: any;
  EditAgentForm: any;
  IsAadharImage: boolean = true;
  IsAadharImage2: boolean = true;
  IsTenthMemo: boolean = true;
  IsProfileImage: boolean = true;
  BaseUrl: string = environment.baseUrl;
  imageFile3: any;
  imageFile4: any;
  imageFile44: any;
  imageFile5: any;
  editingTenthMemo: any;
  editingAadharImage: any;
  editingAadharImage2: any;
  editingProfileImage: any;
  editPassValidator: any;
  
 







  constructor(private Services: SangamService, private router: Router) {

    let emailidRegex = /^[a-zA-Z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;

    this.AgentForm = new FormGroup({

      AgentName: new FormControl('', [Validators.required]),
      MobileNo: new FormControl('', [Validators.required]),
      EmailId: new FormControl('', [Validators.required, Validators.pattern(this.emailidRegex),]),
      AadharNo: new FormControl('', [Validators.required]),
      AadharImage: new FormControl(''),
      AadharImage2:new FormControl(''),
      Tenthmemo: new FormControl(''),
      Address: new FormControl('', [Validators.required]),
      Password: new FormControl('', [Validators.required]),
      ProfilePic: new FormControl('',)

    })

    this.EditAgentForm = new FormGroup({
      EditAgentName: new FormControl('', [Validators.required]),
      EditMobileNo: new FormControl('', [Validators.required]),
      EditEmailId: new FormControl('', [Validators.required, Validators.pattern(this.emailidRegex)]),
      EditAadharNo: new FormControl('', [Validators.required]),
      EditAddress: new FormControl('', [Validators.required]),
      EditAadhaImages: new FormControl(''),
      EditAadhaImages2: new FormControl(''),
      EditTenthMemos: new FormControl(''),
      EditProfileImages: new FormControl(''),
    })

  }

  ngOnInit(): void {
    this.agentId = localStorage.getItem("infodata");
    // console.log("text", this.agentId)
    this.token = localStorage.getItem("token");
    // console.log("data-token", this.token);
    this.getDetails();
        // this.loginToken = JSON.parse(localStorage.getItem("token"));
    if (!this.token) {``
      this.router.navigate(['/']);
    }

  }

  // START VIEW AGENT  DETAILS STORE ID

  Viewproduct(data) {
    localStorage.setItem('single-agnetdata', JSON.stringify(data));
    console.log("viewtokendetails", this.tokendetails);
  }

  // END VIEW AGENT  DETAILS STORE ID

  // START-LIST OF AGENTS //

  getDetails() {
    this.Services.getallDetails().subscribe((getResp) => {
      // console.log("hjkldss",getResp)
      if (getResp.statusCode == 200) {
        this.tokendetails = getResp.data;
        console.log('Agent-data..................', this.tokendetails);
      }
    });
  }

  // END-LIST OF AGENTS //


  // START-ADD-AGENTS DETAILS //

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

  urls2: any[] = [];
  index2: any;
  imageDeleteFrom2!: FormGroup;
  imagePath2: any;
  RemoveImage2: boolean = false;

  selectFiles2(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile2 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls2 = [];
          this.urls2.push(event.target.result);
          console.log(this.urls2, "urls.....");
          this.RemoveImage2 = true;
        };
      }
    } else this.RemoveImage2 = false;
  }

  removeSelectedFile2(index: any) {
    this.urls2 = this.urls2.slice(index + 1);
    console.log(this.urls2.slice(index), ".......slice");
    this.imageFile2 = "null";
  }


  AgentFormDetails() {
    if (this.AgentForm.valid && !this.passValidator) {
      const AgentData = new FormData();

      AgentData.append("agentName", this.AgentForm.value.AgentName);
      AgentData.append("mobileNo", this.AgentForm.value.MobileNo);
      AgentData.append("emailId", this.AgentForm.value.EmailId);
      AgentData.append("aadharNo", this.AgentForm.value.AadharNo);
      //  AgentData.append("aadharImage",this.AgentForm.AadharImage)
      //  AgentData.append("tenthmemo",this.AgentForm.value.Tenthmemo);
      AgentData.append("address", this.AgentForm.value.Address);
      AgentData.append("password", this.AgentForm.value.Password);
      //  AgentData.append("profilePicture",this.AgentForm.value.ProfilePic);
      // AgentData.append("aadharImage", this.imageFile);
      // AgentData.append("tenthmemo", this.imageFile1);
      // AgentData.append("profilePicture", this.imageFile2);

      if (this.imageFile) {
        AgentData.append("aadharImage", this.imageFile);
      }
      if(this.imageFile11){
        AgentData.append("aadharImage2",this.imageFile11);
      }
      if (this.imageFile1) {
        AgentData.append("tenthmemo", this.imageFile1);
      }

      if (this.imageFile2) {
        AgentData.append("profilePicture", this.imageFile2);
      }

      console.log("123", AgentData);

      this.Services.AgentAllDetails(AgentData).subscribe((agentResp) => {
        console.log("info", agentResp);
        if (agentResp.statusCode == 200) {
          this.registerUserData = agentResp["registerResponse"];
          // localStorage.setItem('token', agentResp.token);
          // window.location.href = "/";
          Swal.fire({
            icon: 'success',
            text: 'User Details Created Successfully',
            showConfirmButton: false,
            timer: 2000,
          });
          // this.router.navigateByUrl('/agent')
          $("#exampleModal").modal("show");
          // this.AgentForm.reset();
          $("#exampleModal").modal("hide");
          this.getDetails();
          this.urls = [];
          this.urls1 = [];
          this.urls11= [];
          this.imageFile = {};
          this.imageFile1 = {};
          this.imageFile11 = {};
          this.passValidator = false;

        }
        else {
          Swal.fire({
            icon: 'error',
            text: 'Agent Already Existed',
          });
        }

      });

    } else {
      console.log("Errrrrr")
    }

  }

  // END-ADD-AGENTS DETAILS //


  // START-EDIT-AGENTS DETAILS //

  // brand image Edit 1

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

  // brand image Edit 2
  urls4: any[] = [];
  index4: any;
  imageDeleteFrom4!: FormGroup;
  imagePath4: any;
  RemoveImage4: boolean = false;

  selectFiles4(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsAadharImage = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile4 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls4 = [];
          this.urls4.push(event.target.result);
          this.RemoveImage4 = true;
        };
      }
      // console.log(this.imageFile4);
    } else this.RemoveImage4 = false;
  }
  removeSelectedFile4(index: any) {
    this.urls4.splice(index, 1);
    console.log(this.urls4);
    this.imageFile4 = "";
    console.log(this.imageFile4);
    this.IsAadharImage = true;
  }





  urls44: any[] = [];
  index44: any;
  imageDeleteFrom44!: FormGroup;
  imagePath44: any;
  RemoveImage44: boolean = false;

  selectFiles44(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsAadharImage2 = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile44 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls44 = [];
          this.urls44.push(event.target.result);
          this.RemoveImage44 = true;
        };
      }
      // console.log(this.imageFile4);
    } else this.RemoveImage44 = false;
  }
  removeSelectedFile44(index: any) {
    this.urls44.splice(index, 1);
    console.log(this.urls44);
    this.imageFile44 = "";
    console.log(this.imageFile44);
    this.IsAadharImage2 = true;
  }

  // brand image Edit 3

  urls5: any[] = [];
  index5: any;
  imageDeleteFrom5!: FormGroup;
  imagePath5: any;
  RemoveImage5: boolean = false;

  selectFiles5(event: any) {
    if (event.target.files.length <= 2 && this.urls.length <= 2) {
      this.IsTenthMemo = false;
      for (var i = 0; i < event.target.files.length; i++) {
        this.imageFile5 = event.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(event.target.files[i]);
        reader.onload = (event: any) => {
          this.urls5 = [];
          this.urls5.push(event.target.result);
          this.RemoveImage5 = true;
        };
      }
      //  console.log(this.imageFile2);
    } else this.RemoveImage5 = false;
  }
  removeSelectedFile5(index: any) {
    this.urls5.splice(index, 1);
    console.log(this.urls5);
    this.imageFile5 = "";
    console.log(this.imageFile5);
    this.IsTenthMemo = true;
  }

  // START ONEDIT

  onEdit(data) {
    this.agentId = data.agentId;
    console.log("dkhkdkbnkbsd", this.agentId)
    $("#EditAgentModal").modal("show");
    console.log("agentEdit", data);
    // this.EditAgentFormDetails = data;
    this.EditAgentForm.controls["EditAgentName"].setValue(data.agentName);
    this.EditAgentForm.controls["EditMobileNo"].setValue(data.mobileNo);
    this.EditAgentForm.controls["EditEmailId"].setValue(data.emailId);
    this.EditAgentForm.controls["EditAadharNo"].setValue(data.aadharNo);
    this.EditAgentForm.controls["EditAddress"].setValue(data.address);

    this.EditAgentForm.controls["EditAadhaImages"].setValue(data.aadharImage);
    this.editingAadharImage = this.EditAgentForm.controls["EditAadhaImages"].value;

    this.EditAgentForm.controls["EditAadhaImages2"].setValue(data.aadharImage2);
    this.editingAadharImage2 = this.EditAgentForm.controls["EditAadhaImages2"].value;

    this.EditAgentForm.controls["EditTenthMemos"].setValue(data.tenthmemo);
    this.editingTenthMemo = this.EditAgentForm.controls["EditTenthMemos"].value;

    this.EditAgentForm.controls["EditProfileImages"].setValue(data.profilePicture);
    this.editingProfileImage = this.EditAgentForm.controls["EditProfileImages"].value;

    // this.agentId = data.agentId;
    // console.log("dkhkdkbnkbsd", this.agentId)

  }

  // END ONEDIT


  updateAgent() {
    if (this.EditAgentForm.valid) {
      const agentUpdateData = new FormData();
      agentUpdateData.append('agentId', this.agentId);
      console.log("3333333666", this.agentId);
      agentUpdateData.append("agentName", this.EditAgentForm.value.EditAgentName);
      agentUpdateData.append("mobileNo", this.EditAgentForm.value.EditMobileNo);
      agentUpdateData.append("emailId", this.EditAgentForm.value.EditEmailId);
      agentUpdateData.append("aadharNo", this.EditAgentForm.value.EditAadharNo);
      agentUpdateData.append("address", this.EditAgentForm.value.EditAddress);

      if (this.imageFile4) {
        agentUpdateData.append("aadharImage", this.imageFile4);
      }

      if(this.imageFile44){
        agentUpdateData.append("aadharImage2", this.imageFile44);
      }
      if (this.imageFile5) {
        agentUpdateData.append("tenthmemo", this.imageFile5);
      }

      if (this.imageFile3) {
        agentUpdateData.append("profilePicture", this.imageFile3);
      }
      
      console.log("onetwo", agentUpdateData);

      this.Services.AgentUpdate(agentUpdateData).subscribe((updateResp) => {
        console.log("igjgjgg", agentUpdateData)
        this.registerUserData = updateResp["registerResponse"];

        if (updateResp.statusCode == 200) {

          Swal.fire({
            icon: "success",
            text: "Agent Details Updated Successfully",
            timer: 2000,
            showConfirmButton: false,
          });
          $("#EditAgentModal").modal("hide");
          this.getDetails();
          this.urls3 = [];
          this.urls4 = [];
          // this.urls44 = [];
          this.urls5 = [];
          this.imageFile3 = {};
          this.imageFile4 = {};
          // this.imageFile44 = {};
          this.imageFile5 = {};

        } else{
          Swal.fire({
            icon: 'error',
            text: 'Agent Not Found',
          });
        }

      });

    }
  }

  // END-EDIT-AGENTS DETAILS //
}

