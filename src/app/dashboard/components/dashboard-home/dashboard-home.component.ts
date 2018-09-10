import { AuthService } from './../../../core/services/auth.service';
import { MatSidenav } from '@angular/material';
import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent {

  constructor(
    private authService: AuthService
  ) { }

  ngOnInit() {
  }

  onLogout(sidenav: MatSidenav): void {
    sidenav.close().then(()=> this.authService.logout());
  }

}
