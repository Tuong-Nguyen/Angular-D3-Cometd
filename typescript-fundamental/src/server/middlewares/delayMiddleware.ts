//noinspection TsLint
/**
 * Created by QuanLe on 5/5/2017.
 */
function test(req: any, res: any, next: any) {
    console.log('Hello');
    next();
}

export = test;
