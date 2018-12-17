import { Component, OnInit } from '@angular/core';
import { RepositoryService } from 'src/app/ShareData/repository.service';
import { FormControl, FormGroup, Validators, EmailValidator } from '@angular/forms';
import { Router} from '@angular/router';

@Component({
  selector: 'app-imageupload',
  templateUrl: './imageupload.component.html',
  styleUrls: ['./imageupload.component.css'],
  providers: [RepositoryService]
  
})
export class ImageuploadComponent implements OnInit {
  imageUrl : string = "../assets/_image/gallery-logo.png";
  fileToUpload : File =  null;
 // FileImage: File = null;

 // ImageUrl: any ="../assets/_image/cameralogo.jpg";

 public ImageUrl: Array<string> = [];
 public FileImage: Array<File> = [];
  constructor(private repository : RepositoryService, private route : Router) { }
 public imageuploadForm: FormGroup;

  ngOnInit() {


    this.imageuploadForm = new FormGroup({
      EventId: new FormControl('',[Validators.required]),
      Caption: new FormControl('',[Validators.required]),
      Description: new FormControl('',[Validators.required]),
      Image: new FormControl ('',[Validators.required])

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
      handleFileInput(file : FileList){
        this.fileToUpload = file.item(0);

        //selected image view
        var reader = new FileReader();
        reader.onload = (event:any) => {
          this.imageUrl = event.target.result;
        }
        reader.readAsDataURL(this.fileToUpload);
      }
      // OnSubmit(Caption,eventid,comment,Image){
      //   this.imageService.postFile(Caption.value,eventid.value,comment.value,this.fileToUpload).subscribe(
      //     data =>{
      //       console.log('Done');
      //       Caption.value = null;
      //       Image.value = null;
      //       this.route.navigate(['/imageview']);
      //       alert('upload successfully');
      //     }
      //   )
      // }

    // public onFileChange(file : FileList) {
    

    //     this.FileImage = file.item(0);
    //    //selected image viewing
    //     var reader = new FileReader();
    //     reader.onload = (event:any) => {
    //        this.ImageUrl = event.target.result;
    
    //     }
    //      reader.readAsDataURL(this.FileImage);
    //   }

      onFileChange(file : FileList) {
    

        this.FileImage[0] = file.item(0);
   
       //selected image viewing
        var reader = new FileReader();
        reader.onload = (event:any) => {
           this.ImageUrl[0] = event.target.result;
           
           console.log(event.target.result)
        }
         reader.readAsDataURL(this.FileImage[0]);
      
      }


      OnSubmit(value){
      console.log(value)
        let url = "pastevent/addimage";
        let formData = new FormData();
        formData.append('EventId',value.EventId);
        formData.append('Caption',value.Caption);
        formData.append('Description',value.Description);
        formData.append('Image', this.FileImage[0]);
     

        this.repository.postFile(url, formData)
              .subscribe(res=>{

                 this.route.navigate(['/pastevent/imageview/1']);

                console.log(res);
              },(error =>{
                console.log("error");
              })
              )


      }



}
