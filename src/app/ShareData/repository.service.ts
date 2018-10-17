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

  public islogged:any;

  constructor( private http: HttpClient, private envUrl:UserServiceService , private userurl :UserServiceService) { }

  public getData(route: string) {
    return this.http.get(this.createCompleteRoute(route, this.envUrl.urlAddress),this.generateHeaders());
    
  }
 
  public postData(route: string, body) {
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress),body, this.generateHeaders());
  
  
  }
  
 public isUserIdUnique(userId): Observable<userIdIsUnique> {
   
    return this.http.post<userIdIsUnique>(this.createCompleteRoute('isuniqueemail', this.envUrl.urlAddress), 'c@g.com',this.generateHeaders())

  }
  
  public deleteUser(route: string, body){
    return this.http.post(this.createCompleteRoute(route, this.envUrl.urlAddress),body, this.generateHeaders());
  }



  private createCompleteRoute(route: string, envAddress: string) {
    return `${envAddress}/employee/${route}`;
  }

  private generateHeaders() {
    return {
      headers: new HttpHeaders({'Content-Type': 'application/json',
                                'Authorization': 'bearer '+localStorage.getItem('token')
                              })
    }

  }

 

}

