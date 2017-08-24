/**
 * Created by lnthao on 8/24/2017.
 */
import { sandboxOf } from 'angular-playground';
import {FormExampleComponent} from './form-example.component';

export default sandboxOf(FormExampleComponent)
  .add('load form', {
    template: `<app-form-example></app-form-example>`
  });
