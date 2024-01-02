import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthapiService } from '../apiService/authapi.service';
import { ResponseData } from '../model/response-data';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { DeleteDialogComponent } from '../delete-dialog/delete-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ResetData } from '../model/reset-data';

@Component({
  selector: 'app-view-users',
  templateUrl: './view-users.component.html',
  styleUrls: ['./view-users.component.css']
})
export class ViewUsersComponent implements OnInit {
  users!: ResponseData[];
  selecteduser: any;
  loading = true;//loading
  finalToken = this.authService.getUserToken();
  editMode = true;//for editing just a property


  dataSource = new MatTableDataSource<ResponseData>([]);
  userId: string | any;

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  constructor(private authService: AuthapiService, private dialog: MatDialog) { }
  displayedColumns: string[] = [
    'id',
    'username',
    'email',
    'password',
    'securityQuestion',
    'securityAnswer',
    'roles',
    'adminActions'
  ];

  deleteUser(userdata: ResponseData) {
    console.log('deleting the user, ',userdata);
    this.openDialog(userdata);

  }
  ngOnInit(): void {
    this.loadUsersList();
  }

  loadUsersList() {
    this.authService.getUsersList(this.finalToken).subscribe(data => {
      console.log(data);
      this.users = data.body;
      this.updateDataSource();
      this.loading = false;
    }, err => {
      console.log(err);
    })
  }

  updateDataSource() {
    this.dataSource.data = this.users;
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openDialog(userdata: ResponseData): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '300px',
      data: { res: userdata.username }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.authService.deleteUserData(userdata.id,this.finalToken).subscribe(res=>{
          // console.log(res);
          this.selecteduser = res;
          this.loadUsersList();
        },err=>{
          this.loadUsersList();
          console.log(err);
        })
      }

    });
  }
  edituser(user: ResponseData): void {
    console.log('Editing user');
    this.editMode = !this.editMode;
    this.selecteduser = user;
  }

  confirmEdit(user: ResponseData): void {
    console.log('Confirming edit');
    console.log(user);
    const resetData: ResetData = {
      username: user.username,
      newPassword: user.password,
      secQuestion: user.securityQuestion,
      secAnswer: user.securityAnswer,
    };
   this.authService.resetPasswordUser(resetData).subscribe(res=>{
    console.log(res);
   },err=>{
    console.log(err);
   });
    this.editMode = false;
    this.selecteduser = '';
  }

  cancelEdit(user: ResponseData): void {
    console.log('Canceling edit');
    this.editMode = false;
    this.selecteduser = '';
  }

}