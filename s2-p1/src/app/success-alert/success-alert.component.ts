import { Component } from "@angular/core";

@Component({
  selector: 'app-success-alert',
  template:
    `
      <div class="block">
        <span class="message">{{message}}</span>
      </div>
    `,
  styles: [
    `
      .block {
        background-color: green;
        height: fit-content;
        text-align: center;
        border: solid 1px rgb(175, 168, 168);
        border-radius: 20px;
        padding: 20px;
      }
      
      .message {
        color: white;
        width: fit-content;
      }
    `
  ]
})
export class SuccessAlertComponent {
  message = 'success'
}