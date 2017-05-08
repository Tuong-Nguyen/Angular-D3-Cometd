/**
 * Created by nctuong on 5/5/2017.
 */

declare function done();

function failOnError(error: any) {
  fail(error);
  done();
}

export {failOnError};
