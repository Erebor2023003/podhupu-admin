import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { data } from 'jquery';
import { Observable } from 'rxjs';
// import { TokenService } from 'token.service';

@Injectable({
  providedIn: 'root'
})
export class SangamService {
  CustomersbySangham(customerData: { sanghamId: any; }) {
    throw new Error('Method not implemented.');
  }

  constructor(private httpClient: HttpClient) { }

  // adminLogin

  public adminLogin(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/loginadmin", data)
    } catch (error) { }
  }


   // ChangPassword-adminLogin

   public ChangePasswordAdmin(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/forgotPassword", data)
    } catch (error) { }
  }

  // LIST OF AGENTS

  public getallDetails(): Observable<any> {

    try {
      return this.httpClient.get(environment.baseUrl + "agent/agentslist", {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }
      })
    } catch (error) { }
  }


  // add-agent-details


  public AgentAllDetails(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "agent/registerAgent", data, {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }

      })
    } catch (error) { }
  }


  // Get-Sangham-details


  public GetAddSanghams(data): Observable<any> {
    try {

      return this.httpClient.post(environment.baseUrl + "agent/getAgentSanghams", data, {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }

      });

    } catch (error) { }
  }



  // add-Sangham-data


  public AddSanghamData(data): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "agent/addsangham", data, {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }
      });
    } catch (error) { }
  }

  // Get-Sangham-data


  public getSangham(): Observable<any> {
    try {
      return this.httpClient.get(environment.baseUrl + "agent/getallsanghams", {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }
      });
    } catch (error) { }

  }

  // Get-Customer-data

  public getCustomer(): Observable<any> {

    try {
      return this.httpClient.get(environment.baseUrl + "agent/getallcustomers", {
        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }
      })
    } catch (error) { }
  }


  // Get-Podupu

  public PodupuData(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/getpodupuDetailsbyid", data)
    } catch (error) { }
  }


  //Get-Deposit

  public Depositdata(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/getDepositDetailsById", data)
    } catch (error) { }
  }

  // Add-Podupu

  public AddPodupuData(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/addpodupudetails", data)
    } catch (error) { }

  }

  // Add-Deposit

  public AddDepositData(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "admin/adddepositdetails", data)
    } catch (error) { }

  }

  // List of customers of sangham



  public CustomerBysangham(data: any): Observable<any> {
    try {
      return this.httpClient.post(environment.baseUrl + "customer/customersbysangham", data)
    } catch (error) { }
  }


  // Add of Customers

  public AddNewCustomers(data): Observable<any> {

    try {
      return this.httpClient.post(environment.baseUrl + "customer/addcustomer", data, {

        headers: {
          "Authorization": 'Bearer' + " " + localStorage.getItem("token")
        }

      });
    } catch (error) { }

  }


  // Get-Customer-Appudetails

  public GetAppu(data:any): Observable<any>{

    try{
      return this.httpClient.post(environment.baseUrl + "appu/getcustomerappudetailsbysangham",data)
    } catch(error) {}

  }

  // Add-Appu-Details

  public AppuDetails(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "appu/addappudetails",data)
    } catch(error){}
  }
  // unblock customer
  public UnblockCustomer(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "customer/unblockcustomer",data)
    } catch(error){}
  }

  // Update-Customer-Details

   
  public CustomerUpdate(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "customer/updatecustomer",data)
    }catch(error){}
  }


  // Apdate-Agent-Details

  public AgentUpdate(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "agent/updateAgent",data)
    }catch(error){}
  }

  // Deposit Details of Sangham

  public SanghamNewDeposits(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "sanghamdeposits/getdepositdetailsbyid",data)
    }catch(error){}
  }

  // Add Deposit Details of Sangham


  public GetaddDeposits(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "sanghamdeposits/depositdetailsofsangham",data)
    }catch(error){}
  }

  // Get List of sangham deposits

  public ListSanghamDeposits(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "sanghamdeposits/getsanghamdepositslist",data)
    }catch(error){ }
  }

  // Get List of sangham withdraws

  public ListSanghamWithdraws(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "sanghamdeposits/getsanghamwithdraws",data)
    }catch(error){}
  }

  // Get List of podupu of a customer

  public ListCustomerPodupu(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "admin/podupulistbycustomer",data)
    }catch(error){}
  }

  // Get List of deposits by customer


  public ListCustomerDeposit(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "admin/depositslist",data)
    }catch(error){}
  }

  // Get List of Withdraws by Customer


  public ListCustomerWithdraw(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "admin/withdrawsbycustomer",data)
    }catch(error){}
  }

  // Get List of Appu by Customer


  public ListCustomerAppu(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "appu/searchappubydate",data)
    }catch(error){}
  }


   // Get List of Appu by Customer


   public AddInterest(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "appu/addInterest",data)
    }catch(error){}
  }


  
   // Get List of Appu by Customer


   public GetInterest(): Observable<any>{
    try{
      return this.httpClient.get(environment.baseUrl + "appu/getinterestlist")
    }catch(error){}
  }


  
   // Update-Agent-Details

  public UpdateInterest(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "appu/updateinterest",data)
    }catch(error){}
  }

  
  
   // Delete-Customer-Details

   public CustomerDelete(data:any): Observable<any>{
    try{
      return this.httpClient.post(environment.baseUrl + "customer/deletecustomer",data)
    }catch(error){}
  }


    // Update-Agent-Details

    public UpdateInterestRate(data:any): Observable<any>{
      try{
        return this.httpClient.post(environment.baseUrl + "sanghamdeposits/updatedepositdetailsbyid",data)
      }catch(error){}
    }

      // Update-Agent-Details

      public UpdatePodupuInterest(data:any): Observable<any>{
        try{
          return this.httpClient.post(environment.baseUrl + "admin/updatepodupuDetailsbyid",data)
        }catch(error){}
      }


      
      // Update-Agent-Details

      public UpdateDepositsInterest(data:any): Observable<any>{
        try{
          return this.httpClient.post(environment.baseUrl + "admin/updateDepositDetailsById",data)
        }catch(error){}
      }

      // Recovey

      public SanghamRecovery(data:any): Observable<any>{
        try{
          return this.httpClient.post(environment.baseUrl + "admin/adminpodupurecovery",data)
        }catch(error){}
      }

      // Pending

         public SanghamPending(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "admin/adminpodupuunrecovered",data)
          }catch(error){}
        }


      // viewsanghambalance

       public SanghamBalance(data:any): Observable<any>{
        try{
          return this.httpClient.post(environment.baseUrl + "agent/viewsanghambalance",data)
        }catch(error){}
       }


      //  DepositRecovey

      public DepositRecovery(data:any): Observable<any>{
        try{
          return this.httpClient.post(environment.baseUrl + "admin/admindepositrecovery",data)
        }catch(error){}
      }


        //  DepositRecovey

        public WithdrawRecovery(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "admin/adminwithdrawrecovery",data)
          }catch(error){}
        }

        // AppuRecovey

        public AppuRecovery(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "appu/appupaidrecovery",data)
          }catch(error){}
        }

        // AppuPending

        public AppuPending(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "appu/appuunpaidrecovery",data)
          }catch(error){}
        }


        // Monthlay appu List


        public GetMonthlyAppuList(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "appu/monthlyappulist",data)
          }catch(error){}
        }


        // monthlytransactions

        public TransactionsList(data:any): Observable<any>{
          try{
            return this.httpClient.post(environment.baseUrl + "agent/monthlytransactions",data)
          }catch(error){}
        }
  

































}
