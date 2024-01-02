import { Component, ViewChild } from '@angular/core';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { NewsData } from '../model/news-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { NewsapiService } from '../apiService/newsapi.service';
import { Router } from '@angular/router';
import { FormBuilder } from '@angular/forms';
import { AuthapiService } from '../apiService/authapi.service';
import { MatDialog } from '@angular/material/dialog';
import { NewsResponse } from '../model/news-response';
import { MatAlertComponent } from '../mat-alert/mat-alert.component';
import { WhishlistapiService } from '../apiService/whishlistapi.service';
import { WhishlistData } from '../model/whishlist-data';
import { Observable } from 'rxjs/internal/Observable';
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-news-detail',
  templateUrl: './news-detail.component.html',
  styleUrls: ['./news-detail.component.css']
})
export class NewsDetailComponent {
  newsdata: NewsData[] = [];
  newsRes:NewsResponse|any;
  username: string | any;
  dataSource = new MatTableDataSource<NewsData>([]);
  finalToken = this.authService.getUserToken();
  isAdmin = false;
  loading = true; //page load
  addSuccess: boolean | null = null;
  errorMsg: string | any;
  // countryList: string[] = ['india', 'USA', 'UK']; // Add country names here
  // selectedCountry: string = 'india';

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  selectedTitle: any;
  baseUrl: any;

  constructor(private newsapi: NewsapiService,private whishlistapi:WhishlistapiService, private router: Router, private formBuilder: FormBuilder, private authService: AuthapiService, private dialog: MatDialog) { }


  displayedColumns: string[] = [
  'totalResults' ,
	'articles' ,
  'source',
   'name',
   'author',
   'title',
	'description',
  'content' ,
  'category',
 'publishedAt',
    'url',
  'urlToImage',
  'whishlist'
  ];

  //selectedMovie: any;

  addwhishlist(news: NewsData) {
   const whishlist = new WhishlistData();
   whishlist.name = news.name;
   whishlist.author = news.author;
   whishlist.title = news.title;
   whishlist.description = news.description;
   whishlist.content = news.content;
   whishlist.publishedAt = news.publishedAt;
   whishlist.urlToImage = news.urlToImage;


    console.log('inside view sending data--whishlist--',news);
    this.whishlistapi.addToWhishlist(this.finalToken,whishlist).subscribe(res=>{
    console.log(res);
    this.errorMsg = "item added to whishlist"
    this.openAlert(this.errorMsg, true);
    },(err=>{
      console.log(err);
      this.errorMsg = err.error.message;
      this.openAlert(this.errorMsg, false);
    }))
  }

  ngOnInit() {
    this.loadNewsData();
  }

  // getNewsByTitle(token: string, title: string): Observable<NewsResponse> {
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     'Authorization': `Bearer ${token}`
  //   });
  //   return this.http.get<NewsResponse>(`${this.baseUrl}/news/title/${title}`, { headers: headers });
  // }'

  loadNewsData() {
    this.username = localStorage.getItem('username');
    this.newsapi.getNewsByTitle(this.finalToken,this.selectedTitle).subscribe(data => {
      console.log(this.selectedTitle,"---------");
      this.newsRes = data;
      if (this.newsRes.body instanceof Array) {
        // Check if 'body' is an array before assigning it
        this.newsdata = this.newsRes.body;
        console.log("newssdata: ", this.newsdata);
        this.updateDataSource();
        this.loading = false;
      } else {
        console.error("Invalid response format. Expected an array in 'body'.");
      }
    })
  }

  updateDataSource() {
    this.dataSource.data = this.newsdata;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openAlert(message: string, processSuccess: boolean): void {
    this.dialog.open(MatAlertComponent, {
      width: '300px',
      height: '300px',
      data: { message, processSuccess },
    });
  }
}
