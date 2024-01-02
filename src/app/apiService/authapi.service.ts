import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginData } from '../model/login-data';
import { SignupData } from '../model/signup-data';
import { ResetData } from '../model/reset-data';
import { ResponseData } from '../model/response-data';

@Injectable({
  providedIn: 'root',
})
export class AuthapiService {
  //authorization-microservice url
  authserviceUrl = 'http://localhost:9096/api/v1.0/authentication';
  kafkaServiceUrl = 'http://localhost:8085/api/kafka';
  //aws url
  // authserviceUrl = 'http://54.200.203.109:8080/api/v1.0/auth';
  //aws api gateway url
  // authserviceUrl = 'https://ew94skoaoj.execute-api.us-west-2.amazonaws.com/2101931-arvind-authapi/authapi';

  constructor(private http: HttpClient) { }

  loginUser(loginData: LoginData) {
    return this.http.post<any>(this.authserviceUrl + '/login', loginData);
  }

  registerUser(signupData: SignupData) {
    return this.http.post<any>(this.authserviceUrl + "/signup", signupData);
  }

  resetPasswordUser(resetData:ResetData){
    return this.http.patch<any>(this.authserviceUrl+"/forgot",resetData);
  }
  //testing purpose only--fix
  getUsersList(token:string){
    let options = {
      headers:{"Authorization":token}
    }

    return this.http.get<any>(this.authserviceUrl+"/getAllUsers",options);
  }

  deleteUserData(userId:number,token:string){
    let options = {
      headers:{"Authorization":token}
    }

    return this.http.delete<any>(this.authserviceUrl+`/deleteUser?userId=${userId}`,options);
  }

  //experiment feature--comment me***
  fetchMessages() {
    return this.http.get<any[]>(this.kafkaServiceUrl+'/messages');
  }

  //delete all kafka msgs
  deleteKafkaData(){
    return this.http.delete<any>(this.kafkaServiceUrl+'/deleteAll');
  }

  isUerLoggedIn(){
    return localStorage.getItem('accessToken')!==null;
  }
  isRoleAdmin(){
    const userRole =  localStorage.getItem('role');
    return userRole==='ROLE_ADMIN';
  }
  isRoleCustomer(){
    const userRole = localStorage.getItem('role');
    return userRole === 'ROLE_CUSTOMER';
  }
  getCurrentUserRoles(){
    const userRole = localStorage.getItem('role');
    if (userRole) {
      return userRole;
    }
    return '';
  }
  hasAnyRole(allowedRoles: string[]): boolean {
    const userRole = this.getCurrentUserRoles();
    return allowedRoles.includes(userRole);
  }

  logoutUser(){
    localStorage.clear();
  }

  getUserToken(){
    const token =  localStorage.getItem('accessToken');
    const finalToken = 'Bearer '+token;
    return finalToken;
  }

  getUsername(){
    const username = localStorage.getItem('username')
    return username;
  }
  
}