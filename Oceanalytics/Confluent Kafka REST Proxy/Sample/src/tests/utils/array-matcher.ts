/**
 * Created by nctuong on 5/8/2017.
 */
class ArrayMatcher {
  public static isSame<T>(actual: T[], expected: T[]): { error: string, result: boolean } {
    if (actual.length !== expected.length) {
      return {
        error: `Length of expected is ${expected.length} but actual's length is ${actual.length}`,
        result: false
      };
    }
    for (let i = 0; i < actual.length ; i++) {
      if (actual[i] !== expected[i]) {
        return {
          error: `Item at ${i} are not the same: expected "${expected[i]}" but actual "${actual[i]}`,
          result: false
        };
      }
      return {
        error: '',
        result: true
      };
    }
  }
}

export {ArrayMatcher};
