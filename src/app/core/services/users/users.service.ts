import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }


  getheaders() {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    };
    return headers;
  }

  getVipUsers() {
    const headers = this.getheaders();
    return this.http.get<any[]>(this.apiUrl + `/users/vip`, { headers});
  }
}
