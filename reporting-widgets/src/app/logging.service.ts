import { Injectable } from '@angular/core';
import {TestService} from './test.service';

@Injectable()
export class LoggingService {
  constructor(private testService: TestService) {}

  logFormValueObject(value: object) {
    console.log('Form value object is: ');
    console.log(value);
    this.testService.runService();
  }
}
