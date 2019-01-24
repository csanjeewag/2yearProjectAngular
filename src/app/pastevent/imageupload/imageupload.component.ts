import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { AuthServiceService } from "../../AuthGards/auth-service.service";
import { ActivatedRoute } from '@angular/router';
import { Router,ParamMap } from '@angular/router';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
  providers: [RepositoryService]

})
export class ImageuploadComponent implements OnInit {
  imageUrl: string = "../assets/_image/gallery-logo.png";
  fileToUpload: File = null;
  // FileImage: File = null;

  // ImageUrl: any ="../assets/_image/cameralogo.jpg";
  public eventid:any;
  public author:any;
  public ImageUrl: Array<string> = [];
  public FileImage: Array<File> = [];
  constructor(private repo: RepositoryService, private repository: RepositoryService, private route: Router,private auth:AuthServiceService, private rout:ActivatedRoute) { }
  public imageuploadForm: FormGroup;
  
  ngOnInit() {
    this.eventid = this.rout.snapshot.paramMap.get('id')

  this.author=this.auth.tokencheckId();
  console.log(this.author)
    this.imageuploadForm = new FormGroup({
      // EventId: new FormControl('', [Validators.required]),
      Caption: new FormControl('', [Validators.required]),
      Description: new FormControl('', [Validators.required]),
      Image: new FormControl('', [Validators.required])

    })

  }
  public validateControl(controlName: string) {
    if (this.imageuploadForm.controls[controlName].invalid && this.imageuploadForm.controls[controlName].touched)
      return true;

    return false;
  }

  public hasError(controlName: string, errorName: string) {
    if (this.imageuploadForm.controls[controlName].hasError(errorName))
      return true;

    return false;
  }

  onFileChange(file: FileList) {


    this.FileImage[0] = file.item(0);
    this.FileImage[1] = file.item(1);
    this.FileImage[2] = file.item(2);
    //selected image viewing
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageUrl[0] = event.target.result;
    

      console.log(event.target.result)
    }
    reader.readAsDataURL(this.FileImage[0]);
    reader.readAsDataURL(this.FileImage[1]);
    reader.readAsDataURL(this.FileImage[2]);

  }


  OnSubmit(value) {
    console.log(value)
    let url = "pastevent/addimage";        
    let formData = new FormData();
    formData.append('EventId', this.eventid);
    formData.append('Caption', value.Caption);
    formData.append('Description', value.Description);
    formData.append('Image', this.FileImage[0]);
    if (this.FileImage[1] != null) { formData.append('Image', this.FileImage[1]); }

    if (this.FileImage[2] != null) { formData.append('Image', this.FileImage[2]); }

    // formData.append('Image', this.FileImage[2]);
    formData.append('Author', this.author);

    this.repository.postFile(url, formData)
      .subscribe(res => {

        this.route.navigate(['/pastevent/imageview/1']);

        console.log(res);
      }, (error => {
        console.log("error");
      })
      )


  }



}
