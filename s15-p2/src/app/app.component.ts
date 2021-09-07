import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { CustomValidators } from './custom-validators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  forbbidenProjectNames = ['Test']
  statuses: string[] = [
    'Stable', 'Critical', 'Finished'
  ]
  form: FormGroup
  values: {
    projectName: string,
    mail: string,
    status: string,
  };

  ngOnInit () {
    this.form = new FormGroup({
      "projectName": new FormControl(null, [Validators.required, CustomValidators.forbbidenNames], CustomValidators.forbbidenNamesAsync),
      // "projectName": new FormControl(null, Validators.required, CustomValidators.forbbidenNamesAsync),
      // "projectName": new FormControl(null, Validators.required),
      "mail": new FormControl(null, [Validators.required, Validators.email]),
      "status": new FormControl(this.statuses[0])
    })
  }

  onSubmit () {
    console.log(this.form.get('projectName').errors)
    this.values = this.form.value;
    this.form.reset({
      "status": this.statuses[0]
    });
  }
}
