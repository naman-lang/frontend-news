import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
loaded:boolean= false;
 constructor(private route:Router){}
  ngOnInit(): void {
    setTimeout(() => {
      this.loaded = true;
    }, 2000);
  }

  loginHandle(){
    this.route.navigate(['/login']);
  }
  signupHandle(){
    this.route.navigate(['/register']);
  }

}
