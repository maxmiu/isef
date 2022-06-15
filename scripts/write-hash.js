const fs = require("fs");
const childProcess = require("child_process");

const versionPath = "./web/src/version.ts";

const gitHash = childProcess.execSync("git rev-parse --short HEAD").toString().trim();
const dummyVersion = fs.readFileSync(versionPath);
const updatedVersion = dummyVersion.toString().replace(/dummyHash/g, gitHash);

fs.writeFileSync(versionPath, updatedVersion);