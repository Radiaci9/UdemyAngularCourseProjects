import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  details = 'Secret Password = tuna'
  isShowDetails = false;
  logs = []
  slogs = []
  startPos = 4

  onClick() {
    this.isShowDetails = !this.isShowDetails;
    const newDate = (new Date()).toISOString();
    this.slogs.push(`${newDate} - clicked`);
    this.logs.push({
      body: `${newDate} - clicked`,
      index: this.logs.length,
    });
  }
}
