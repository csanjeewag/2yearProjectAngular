import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { AuthServiceService } from "../../AuthGards/auth-service.service";
import { ActivatedRoute } from '@angular/router';
import { Router, ParamMap } from '@angular/router';

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
  public eventid: any;
  public author: any;
  public ImageUrl: Array<string> = [];
  public FileImage: Array<File> = [];
  constructor(private repo: RepositoryService, private repository: RepositoryService, private route: Router, private auth: AuthServiceService, private rout: ActivatedRoute) { }
  public imageuploadForm: FormGroup;

  ngOnInit() {
    this.eventid = this.rout.snapshot.paramMap.get('id')
    this.author = this.auth.tokencheckId();
    console.log(this.author)
    this.imageuploadForm = new FormGroup({
      // EventId: new FormControl('', [Validators.required]),
      Caption: new FormControl('', [Validators.required]),
      // Description: new FormControl('', [Validators.required]),
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
    this.FileImage[3] = file.item(3);
    this.FileImage[4] = file.item(4);
    this.FileImage[5] = file.item(5);
    this.FileImage[6] = file.item(6);
    this.FileImage[7] = file.item(7);
    this.FileImage[8] = file.item(8);
    this.FileImage[9] = file.item(9);
    this.FileImage[10] = file.item(10);
    this.FileImage[11] = file.item(11);
    this.FileImage[12] = file.item(12);
    this.FileImage[13] = file.item(13);
    this.FileImage[14] = file.item(14);
    this.FileImage[15] = file.item(15);
    this.FileImage[16] = file.item(16);
    this.FileImage[17] = file.item(17);
    this.FileImage[17] = file.item(17);
    this.FileImage[18] = file.item(18);
    this.FileImage[19] = file.item(19);
    //selected image viewing
    var reader = new FileReader();
    reader.onload = (event: any) => {
      this.ImageUrl[0] = event.target.result;
      
      console.log("hiiiiiiiiiiiii")
      console.log(event.target)
      console.log("hiiiiiiiiiiiii")


      console.log(event.target.result)
    }
    reader.readAsDataURL(this.FileImage[0]);
    reader.readAsDataURL(this.FileImage[1]);
    reader.readAsDataURL(this.FileImage[2]);
    reader.readAsDataURL(this.FileImage[3]);
    reader.readAsDataURL(this.FileImage[4]);
    reader.readAsDataURL(this.FileImage[5]);
    reader.readAsDataURL(this.FileImage[6]);
    reader.readAsDataURL(this.FileImage[7]);
    reader.readAsDataURL(this.FileImage[8]);
    reader.readAsDataURL(this.FileImage[9]);
    reader.readAsDataURL(this.FileImage[10]);
    reader.readAsDataURL(this.FileImage[11]);
    reader.readAsDataURL(this.FileImage[12]);
    reader.readAsDataURL(this.FileImage[13]);
    reader.readAsDataURL(this.FileImage[14]);
    reader.readAsDataURL(this.FileImage[15]);
    reader.readAsDataURL(this.FileImage[16]);
    reader.readAsDataURL(this.FileImage[17]);
    reader.readAsDataURL(this.FileImage[18]);
    reader.readAsDataURL(this.FileImage[19]);

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
    if (this.FileImage[3] != null) { formData.append('Image', this.FileImage[3]); }
    if (this.FileImage[4] != null) { formData.append('Image', this.FileImage[4]); }
    if (this.FileImage[5] != null) { formData.append('Image', this.FileImage[5]); }
    if (this.FileImage[6] != null) { formData.append('Image', this.FileImage[6]); }
    if (this.FileImage[7] != null) { formData.append('Image', this.FileImage[7]); }
    if (this.FileImage[8] != null) { formData.append('Image', this.FileImage[8]); }
    if (this.FileImage[9] != null) { formData.append('Image', this.FileImage[9]); }
    if (this.FileImage[10] != null) { formData.append('Image', this.FileImage[10]); }
    if (this.FileImage[11] != null) { formData.append('Image', this.FileImage[11]); }
    if (this.FileImage[12] != null) { formData.append('Image', this.FileImage[12]); }
    if (this.FileImage[13] != null) { formData.append('Image', this.FileImage[13]); }
    if (this.FileImage[14] != null) { formData.append('Image', this.FileImage[14]); }
    if (this.FileImage[15] != null) { formData.append('Image', this.FileImage[15]); }
    if (this.FileImage[16] != null) { formData.append('Image', this.FileImage[16]); }
    if (this.FileImage[17] != null) { formData.append('Image', this.FileImage[17]); }
    if (this.FileImage[18] != null) { formData.append('Image', this.FileImage[18]); }
    if (this.FileImage[19] != null) { formData.append('Image', this.FileImage[19]); }




    // formData.append('Image', this.FileImage[2]);
    formData.append('Author', this.author);

    this.repository.postFile(url, formData)
      .subscribe(res => {

        this.route.navigate(['/pastevent/imageview/', this.eventid]);

        console.log(res);
      }, (error => {
        console.log("error");
      })
      )


  }

  public gotoimageupload() {
    let id = this.eventid;
    this.route.navigate(['pastevent/imageview/' + id]);
   
  }

}
