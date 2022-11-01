import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service'
import { ActivatedRoute } from '@angular/router';
import { ReadComponent } from '../read/read.component';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService, private router:ActivatedRoute) { }

  errormsg:any;
  successmsg:any;
  getparamid:any;
  

  ngOnInit(): void {
    this.getparamid = this.router.snapshot.paramMap.get('id');
    if(this.getparamid){
      this.service.getSingleData(this.getparamid).subscribe((res)=>{     
        this.userForm.patchValue({
          fullname:res.data[0].fullname,
          email:res.data[0].email,
          mobile:res.data[0].mobile
        });
      });
    }
  }

 userForm = new FormGroup({
  'fullname': new FormControl('', Validators.required),
  'email': new FormControl('', Validators.required),
  'mobile':new FormControl('', Validators.required)
 });

 //create new user
 userSubmit()
 {
  if(this.userForm.valid)
  {
    this.service.createData(this.userForm.value).subscribe((res)=>{
      console.log(res, "res=>");
      this.userForm.reset();
      this.successmsg = res.message;
    });
  } 
  else {
    this.errormsg = 'all field is required';
    this.userForm.reset();
  }
  }

  //update user
  userUpdate()
  {
    if(this.userForm.valid)
    {
      this.service.updateData(this.userForm.value, this.getparamid).subscribe((res)=>{
        console.log(res, 'res=>');
        this.userForm.reset();        
        this.successmsg = res.message;
      });
    } 
    else {
      this.errormsg = 'all field is required';
      this.userForm.reset();
    }
  }

 }

