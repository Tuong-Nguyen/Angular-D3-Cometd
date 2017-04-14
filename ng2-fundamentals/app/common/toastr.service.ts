import {Injectable} from "@angular/core";
/**
 * Created by nctuong on 4/14/2017.
 */
declare const toastr: any;

@Injectable()
export class ToastrService {
  public success(message: string, title?: string) {
    toastr.success(message, title);
  }

  public info(message: string, title?: string) {
    toastr.info(message, title);
  }

  public warning(message: string, title?: string) {
    toastr.warning(message, title);
  }

  public error(message: string, title?: string) {
    toastr.error(message, title);
  }
}
