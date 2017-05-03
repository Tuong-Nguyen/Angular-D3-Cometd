/**
 * Created by admin1 on 5/1/2017.
 */
import {schema as jsonSchema} from "./mockDataSchema";
import fs = require("fs");
import chalk = require("chalk");
import faker = require("faker");

declare function require(name: string): any;
//noinspection TsLint
const jsf = require("json-schema-faker");
jsf.extend("faker", () => faker);

jsf(jsonSchema).then( (sampleData: any) => {
    fs.writeFile("./src/api/db.json", JSON.stringify(sampleData), (error) => {
        if (error) {
            //noinspection TsLint
            return console.log(chalk.red(error.message));
        } else {
            //noinspection TsLint
            console.log(chalk.green("Mock data is generated"));
        }
    });
});

