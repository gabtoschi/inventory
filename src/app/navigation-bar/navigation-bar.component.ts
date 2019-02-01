import { Component, OnInit } from '@angular/core';

import { AuthService } from './../shared/services/auth.service';

@Component({
  selector: 'app-navigation-bar',
  templateUrl: './navigation-bar.component.html',
  styleUrls: ['./navigation-bar.component.scss']
})
export class NavigationBarComponent implements OnInit {

  isLoggedIn(){
    return AuthService.isLoggedIn;
  }

  constructor() { }

  ngOnInit() {
  }

}
