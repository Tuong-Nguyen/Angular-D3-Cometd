import {AxiosPromise, AxiosResponse} from "axios";
import Swapi from "../src/Swapi";

/**
 * Created by QuanLe on 4/29/2017.
 */
describe("getPeople", () => {
    it("with id 1 returns 'Luke Skywalker'", (done) => {
        const swapi: Swapi = new Swapi();
        const promise: Promise<AxiosResponse> = swapi.getPerson(1) as Promise<AxiosResponse>;
        promise.then((response) => {
            expect(response.data.name).toBe("Luke Skywalker");
            done();
        })
            .catch((reason) => {
                done.fail(reason);
            });
    }, 5000);

    it("with invalid ID fails with 404 status code", (done) => {
        const swapi: Swapi = new Swapi();
        const promise: Promise<AxiosResponse> = swapi.getPerson(-1) as Promise<AxiosResponse>;
        promise.catch((reason) => {
            expect(reason.response.status).toBe(404);
            done();
            });
    }, 5000);
});
