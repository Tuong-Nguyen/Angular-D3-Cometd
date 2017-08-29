import {Component, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {LoggingService} from '../logging.service';
import {TestService} from '../test.service';

@Component({
  selector: 'app-form-example',
  templateUrl: './form-example.component.html',
  styleUrls: ['./form-example.component.css'],
  providers: [LoggingService, TestService]
})
export class FormExampleComponent {
  @ViewChild('f') aForm: NgForm;
  defaultQuestion = 0;
  secrectQuestions = [
    {value: 0, viewValue: 'Your first Pet?'},
    {value: 1, viewValue: 'Who is your best friend?'},
    {value: 2, viewValue: 'What is first birthday gift?'}
  ];

  constructor(private loggingService: LoggingService) {}

  onSubmit() {
    this.loggingService.logFormValueObject(this.aForm.value);
  }
}
