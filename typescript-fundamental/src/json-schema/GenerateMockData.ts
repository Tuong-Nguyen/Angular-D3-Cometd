/**
 * Created by admin1 on 5/1/2017.
 */
import {schema as jsonSchema} from "./mockDataSchema";
import fs = require("fs");
import Chalk = require("chalk");

declare function require(name: string): any;
//noinspection TsLint
var jsf = require("json-schema-faker");

const data = JSON.stringify(jsf(jsonSchema));

fs.writeFile("./src/api/db.json", data, (error) => {
    if (error) {
        //noinspection TsLint
        return console.log(Chalk.red(error.message));
    } else {
        //noinspection TsLint
        console.log(Chalk.green("Mock data is generated"));
    }
});
