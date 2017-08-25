import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.css']
})
export class FormExampleComponent {
  @ViewChild('f') aForm: NgForm;
  defaultQuestion = 0;
  secrectQuestions = [
    {value: 0, viewValue: 'Your first Pet?'},
    {value: 1, viewValue: 'Who is your best friend?'},
    {value: 2, viewValue: 'What is first birthday gift?'}
  ];

  onSubmit() {
    console.log(this.aForm.value);
  }
}
