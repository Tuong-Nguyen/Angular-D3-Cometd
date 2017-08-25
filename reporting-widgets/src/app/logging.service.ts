import { Injectable } from '@angular/core';

@Injectable()
export class LoggingService {
  logFormValueObject(value: object) {
    console.log('Form value object is: ' + value);
  }
}
