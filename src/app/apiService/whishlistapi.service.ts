import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { WhishlistData } from '../model/whishlist-data';

@Injectable({
  providedIn: 'root'
})
export class WhishlistapiService {
//whishlistServiceUrl-microservice url--dev env
whishlistServiceUrl = 'http://localhost:9094/api/v1.0/wishlist';
 

constructor(private http:HttpClient) { }
//get all whishlist(admin+customer)
addToWhishlist(token:string,whishlist:WhishlistData){
  let options = {
    headers:{"Authorization":token}
  }//fix url here match api gateway
 return this.http.post<any>(this.whishlistServiceUrl+`/addItem`,whishlist,options);
}

 //get whishlist data of a user
 getUserwhishlist(token:string,userId:string){
  let options = {
    headers:{"Authorization":token}
  }
  return this.http.get<WhishlistData[]>(this.whishlistServiceUrl+`/getByUserId/${userId}`,options);
}
//get all the whishlist of all users
getAllwhishlist(token:string){
  let options = {
    headers:{"Authorization":token}
  }
  return this.http.get<WhishlistData[]>(this.whishlistServiceUrl+"/getAll",options);
}

deleteWhishlist(itemId:number,token:string){
  let options = {
    headers:{"Authorization":token}
  }
  return this.http.delete<any>(this.whishlistServiceUrl+`/delete/${itemId}`,options);
}
}