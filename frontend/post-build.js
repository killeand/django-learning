import fs from 'fs';
import c from 'chalk';

let state = 0;

console.log("\n\n" + c.bgWhite.black("### RUNNING POST-BUILD SCRIPT ###"));

if (state == 0) {
    console.log(c.blue("  o  ") + "Clearing old Django static files");
    try {
        fs.rmSync("../backend/static", { recursive: true, force: true });
        state++;
    }
    catch (error) {
        console.error(c.red("  E  ") + c.bgWhite.red(error.message));
    }
}

if (state == 1) {
    console.log(c.blue("  o  ") + "Creating folders in Django");
    try {
        fs.mkdirSync("../backend/static");
        fs.mkdirSync("../backend/static/assets");
        state++;
    }
    catch (error) {
        console.error(c.red("  E  ") + c.bgWhite.red(error.message));
    }
}

if (state == 2) {
    console.log(c.blue("  o  ") + "Moving index.html into Django");
    try {
        fs.renameSync("dist/index.html", "../backend/static/index.html");
        state++;
    }
    catch (error) {
        console.error(c.red("  E  ") + c.bgWhite.red(error.message));
    }
}

if (state == 3) {
    console.log(c.blue("  o  ") + "Moving assets into Django");
    try {
        let dirs = fs.readdirSync("dist/static/assets");
        dirs.forEach((path) => fs.renameSync(`dist/static/assets/${path}`, `../backend/static/assets/${path}`));
        state++;
    }
    catch (error) {
        console.error(c.red("  E  ") + c.bgWhite.red(error.message));
    }
}

if (state == 4) {
    console.log(c.blue("  o  ") + "Cleaning up dist");
    try {
        fs.rmSync("dist", { recursive: true, force: true });
        state++;
    }
    catch (error) {
        console.error(c.red("  E  ") + c.bgWhite.red(error.message));
    }
}

console.log(c.bgWhite.black("### DONE RUNNING POST-BUILD SCRIPT ###\n\n"));