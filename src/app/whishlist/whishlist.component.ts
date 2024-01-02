import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { AuthapiService } from '../apiService/authapi.service';
import { WhishlistapiService } from '../apiService/whishlistapi.service';
import { WhishlistData } from '../model/whishlist-data';
import { WhishlistResponse } from '../model/whishlist-response';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-whishlist',
  templateUrl: './whishlist.component.html',
  styleUrls: ['./whishlist.component.css']
})
export class WhishlistComponent {
  whishlistdata: WhishlistData[] = [];
  whishlistRes: WhishlistResponse | any;
  selectedMovie: any;
  loading = true;

  dataSource = new MatTableDataSource<WhishlistData>([]);
  finalToken = this.authService.getUserToken();
  userId: string | any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;

  constructor(private whishlistapi: WhishlistapiService, private authService: AuthapiService, private dialog: MatDialog) { }

  displayedColumns: string[] = [
    'id',
    'name',
    'author',
    'title',
    'description',
    'content',
    'category',
    'publishedAt',
    'url',
    'urlToImage',
    'userId',
    'actions'
  ];

  ngOnInit() {
    this.loadWhishListData();
  }

  deleteItem(data: WhishlistData) {
    console.log('deleting stock from whishlist :', data);
    this.openDialog(data);
  }

  loadWhishListData() {
    const userRole = this.authService.getCurrentUserRoles();
    if (userRole === 'ROLE_ADMIN') {
      this.loadAllWhishlist();
    } else if (userRole === 'ROLE_CUSTOMER') {
      this.userId = this.authService.getUsername();
      this.loadUsersWhishlist(this.userId);
    }
  }

  //for admin only
  loadAllWhishlist() {
    this.whishlistapi.getAllwhishlist(this.finalToken).subscribe(data => {
      console.log(data);
      this.whishlistRes = data;
      if (this.whishlistRes.body instanceof Array) {
        // Check if 'body' is an array before assigning it
        this.whishlistdata = this.whishlistRes.body;
        console.log("whishlistdata: ", this.whishlistdata);
        this.updateDataSource();
        this.loading = false;
      } else {
        console.error("Invalid response format. Expected an array in 'body'.");
      }
      this.updateDataSource();
      this.loading = false;
    }, err => {
      console.log(err);
    })
  }

  //if userrole is customer
  loadUsersWhishlist(userId: string) {
    this.whishlistapi.getUserwhishlist(this.finalToken, userId).subscribe(data => {
      console.log(data);
      this.whishlistRes = data;
      if (this.whishlistRes.body instanceof Array) {
        // Check if 'body' is an array before assigning it
        this.whishlistdata = this.whishlistRes.body;
        console.log("whishlistdata: ", this.whishlistdata);
        this.updateDataSource();
        this.loading = false;
      } else {
        console.error("Invalid response format. Expected an array in 'body'.");
      }
      this.updateDataSource();
      this.loading = false;
    }, err => {
      console.log(err);
    });
  }

  updateDataSource() {
    this.dataSource.data = this.whishlistdata;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(whishlist: WhishlistData): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { res: whishlist.name }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.whishlistapi.deleteWhishlist(whishlist.id, this.finalToken).subscribe(res => {
          // console.log(res);
          this.loadWhishListData()
        }, err => {
          this.loadWhishListData();
          console.log(err);
        });
        // console.log(result);
      }
    });
  }
}