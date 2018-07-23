import { Component } from '@angular/core';
import { Subscriber } from '../../node_modules/rxjs';
import { HttpClient } from '../../node_modules/@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  private apiUrl = 'https://api.graph.cool/simple/v1/cjjvh1vsj4hmv0103v1r5282g';

  constructor(
    private http: HttpClient
  ) {
    this.allUsers();
  }

  allUsers(): void {
    const body = {
      query: `
      query {
        allUsers{
          id
          name
          email
        }
      }
      `
    };
    this.http.post(this.apiUrl, body)
      .subscribe(res => console.log('Query: ', res));
  }
}
