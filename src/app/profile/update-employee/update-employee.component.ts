  import { Component, OnInit } from '@angular/core';
  import { FormControl, FormGroup, Validators } from '@angular/forms';
  import { Employee} from './../_interfaces/employee.model';
  import {  RepositoryService } from './../../ShareData/repository.service';
  import { Router,ParamMap, ActivatedRoute} from '@angular/router';
  import { AuthServiceService } from "./../../AuthGards/auth-service.service";
 
  

  @Component({
    selector: 'app-update-employee',
    templateUrl: './update-employee.component.html',
    styleUrls: ['./update-employee.component.css']
  })
  export class UpdateEmployeeComponent implements OnInit {
  
    public errorMessage: string='';
    public ownerForm: FormGroup;
    public departments:any;
    public roles:any;
    public employee:any;
    public employeeId:any;
    public isAdmin:any;
    public userId:any;
    public FileImage : File;
    public ImageUrl :any;
    public profileImage:any="assets/_image/cslogo.png";

    constructor(private route: ActivatedRoute ,private router: Router,  private repository : RepositoryService,private auth:AuthServiceService) { }
  
    ngOnInit() {
    //  this.ImageUrl = "assets/_image/cslogo.png";
    this.ImageUrl = this.repository.ImageUrl;
  
     this.isAdmin = this.auth.isAdmin();
     this.userId = this.auth.tokencheckId();
      this.getDepartment();
      this.getRole();
      this.getEmployee();
     

      this.ownerForm = new FormGroup({
        id:new FormControl({value: '', disabled: !this.isAdmin},[Validators.required,Validators.maxLength(6)]),
        name:new FormControl('',[Validators.required]),
        contact:new FormControl('',[Validators.required, Validators.pattern(/[0-9'-]$/)]),
        address1:new FormControl('',[Validators.required]),
        address2:new FormControl('',[Validators.required]),
        email:new FormControl('',[Validators.required,Validators.email]),
        role:new FormControl({value: '', disabled: !this.isAdmin},[Validators.required]),
        password:new FormControl({value: '', disabled:(!(this.userId==this.employeeId))},[Validators.required]),
      
        department:new FormControl('',[Validators.required]),
        gender:new FormControl('',[Validators.required])
      })
      
    }
  
    public validateControl(controlName: string) {
      if (this.ownerForm.controls[controlName].invalid && this.ownerForm.controls[controlName].touched)
        return true;
  
      return false;
    }
  
    public hasError(controlName: string, errorName: string) {
      if (this.ownerForm.controls[controlName].hasError(errorName))
        return true;
  
      return false;
    }
  
    public createOwner(value) {
      
      if (this.ownerForm.valid) {
      
        // let owner: Employee = {
        //   EmpId: ownerFormValue.id,
        //   EmpName: ownerFormValue.name,
        //   EmpContact: ownerFormValue.contact,
        //   EmpAddress1: ownerFormValue.address1,
        //   EmpAddress2: ownerFormValue.address2,
        //   EmpEmail: ownerFormValue.email,
        //   PositionPId: ownerFormValue.role,
        //   EmpPassword:  ownerFormValue.password,
        //   DepartmentDprtId: ownerFormValue.department,
        //   EmpGender: ownerFormValue.gender,
        // };
       let formData = new FormData();
      formData.append('EmpId', value.id);
      formData.append('EmpName',value.name);
      formData.append('EmpContact', value.contact);
      formData.append('EmpAddress1',value.address1);
      formData.append('EmpAddress2', value.address2);
      formData.append('EmpEmail',value.email);
      formData.append('PositionPId', '');
      formData.append('EmpPassword',value.password);
      formData.append('DepartmentDprtId', value.department);
      formData.append('EmpGender',value.gender);
      formData.append('EmpProfilePicture',this.FileImage);

      
        let apiUrl = 'updateemployee';
        
        this.repository.postFile(apiUrl, formData)
          .subscribe(res => {
            this.router.navigate(['/profile/list']);
           
              
            },
            (error => {
            
            })
          )
      }
    }
  
    public getRole(){
      let apiUrl = 'getroles';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.roles = res;
         
       
            
          },
          (error => {
        
          })
        )
    }

    public getDepartment(){

      let apiUrl = 'getdepartments';
      this.repository.getData(apiUrl)
        .subscribe(res => {
         this.departments = res;
        
       
            
          },
          (error => {
        
          })
        )
    }
    
  public getEmployee(){

    this.route.paramMap.subscribe((params:ParamMap)=>{
      let id = parseInt(params.get('id'));
       this.employeeId=id;
      
      this.repository.getData(''+id)
      .subscribe(res => {
        this.employee = res ;
        if(this.employee.empProfilePicture)
      { this.profileImage =this.ImageUrl+ this.employee.empProfilePicture;}
        this.fillEmployee();
      },
      (error) => {
      //  this.handleErrors(error);n
      })
     });
   
  }

 public fillEmployee(){
  this.ownerForm.controls['id'].setValue(this.employee.empId);
  this.ownerForm.controls['email'].setValue(this.employee.empEmail);
  this.ownerForm.controls['name'].setValue(this.employee.empName);
  this.ownerForm.controls['address1'].setValue(this.employee.empAddress1);
  this.ownerForm.controls['address2'].setValue(this.employee.empAddress2);
  this.ownerForm.controls['department'].setValue(this.employee.departmentDprtId);
  this.ownerForm.controls['gender'].setValue(this.employee.empGender);
  this.ownerForm.controls['password'].setValue(this.employee.empPassword);
  this.ownerForm.controls['contact'].setValue(this.employee.empContact);
  this.ownerForm.controls['role'].setValue(this.employee.positionPId);
 
  
  }
  onFileChange(file : FileList,id:number) {
    

    this.FileImage = file.item(0);
   //selected image viewing
    var reader = new FileReader();
    reader.onload = (event:any) => {
       this.profileImage = event.target.result;
  
       console.log(event.target.result)
    }
     reader.readAsDataURL(this.FileImage);
  }

}
  