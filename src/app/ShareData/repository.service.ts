import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders} from '@angular/common/http';
import { UserServiceService} from './user-service.service';
import { Observable } from 'rxjs';

interface userIdIsUnique {
  unique: boolean
}

@Injectable({
  providedIn: 'root'
})

export class RepositoryService {
 constructor( private http: HttpClient, private envUrl:UserServiceService , private userurl :UserServiceService) { }
 public islogged:any; 
 public ImageUrl = this.envUrl.mainUrl;
  public getData(route: string) {
   
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress),this.generateHeaders());
    
  }
 
  public postData(route: string, body) {
    console.log('repo awa');
    console.log(body);
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress),body, this.generateHeaders());
  
  
  }
  public postFile(route: string, body) {
    console.log(body)
    return this.http.post(this.createCompleteRoutefile(route, this.envUrl.urlAddress),body, this.generateHeadersfile());
  
  
  }
 public isUserIdUnique(userId): Observable<userIdIsUnique> {
   
    return this.http.post<userIdIsUnique>(this.createCompleteRoute('isuniqueemail', this.envUrl.urlAddress), 'c@g.com',this.generateHeaders())

  }
  
  public deleteUser(route: string, body){
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress),body, this.generateHeaders());
  }



  private createCompleteRoute(route: string, envAddress: string) {
  
    return `${envAddress}/${route}`;
  }
  private createCompleteRoutefile(route: string, envAddress: string) {
    return `${envAddress}/${route}`;
  }
  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
                                'Authorization': 'bearer '+localStorage.getItem('token')
                              })
    }

  }
  private generateHeadersfile() {
    return {
      headers: new HttpHeaders({//'Content-Type': 'multipart/form-data',
                                // 'Content-Type':'application/json',
                                'Authorization': 'bearer '+localStorage.getItem('token'),
                                'enctype': 'multipart/form-data'
                              })
    }

  }
 

}

