import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NewsData } from '../model/news-data';

@Injectable({
  providedIn: 'root'
})
export class NewsapiService {
 //newsapp-microservice url--local env
 newsServiceUrl = 'http://localhost:9093/api/v1.0/news';


 constructor(private http:HttpClient) { }
 //get all newss(admin+customer)
 getNewsByTitle(token:string,title:string){
   let options = {
     headers:{"Authorization":token}
   }
   return this.http.get<NewsData[]>(this.newsServiceUrl+`/title/${title}`,options);
 }

}
