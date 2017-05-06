import {Observable} from 'rxjs/Rx';
import {parse, Url} from 'url';

/**
 * Created by QuanLe on 5/5/2017.
 */

/**
 * Get the timeout value from query string and delay the response according to that value
 * @param request
 * @param response
 * @param next
 */
function delayResponse(request: Request, response: Response, next: any) {
    const url: Url = parse(request.url, true);
    const timeout = parseTimeout(url.query.timeout as string);

    if (isNaN(timeout)) {
        next();
    } else {
        Observable.timer(timeout)
            .subscribe(
                (item) => {
                    next();
                }
            );
    }
}

function parseTimeout(timeout: string): number {
    return +timeout;
}

export = delayResponse;
