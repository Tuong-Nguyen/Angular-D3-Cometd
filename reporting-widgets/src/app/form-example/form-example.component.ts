import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.css']
})
export class FormExampleComponent {
  secrectQuestions = [
    {value: 0, viewValue: 'Your first Pet?'},
    {value: 1, viewValue: 'Who is your best friend?'},
    {value: 2, viewValue: 'What is first birthday gift?'}
  ];

  onSubmit(form: HTMLFormElement) {
    console.log(form);
  }
}
