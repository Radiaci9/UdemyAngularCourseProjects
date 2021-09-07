import { FormControl } from "@angular/forms";
import { Observable } from "rxjs";

const forbbidenProjectNames = ['Test'];
const forbbidenProjectNamesAsync = ['Testt'];

export class CustomValidators {
  static forbbidenNames (control: FormControl): { [s: string]: boolean } {
    if (forbbidenProjectNames.includes(control.value)) {
      return { 'projectNameIsForbidden': true }
    } else {
      return null;
    } 
  }

  static forbbidenNamesAsync (control: FormControl): Observable<any> | Promise<any> {
    return new Promise(
      (res) => setTimeout(() => {
        if (forbbidenProjectNamesAsync.includes(control.value)) {
          res({ 'projectNameIsForbidden': true })
        } else {
          res(null);
        } 
      }, 1000),
    )
  }
}
