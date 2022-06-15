const fs = require("fs");

const versionPath = "./web/src/version.ts";

const hash = process.env.SOURCE_VERSION;
const dummyVersion = fs.readFileSync(versionPath);
const updatedVersion = dummyVersion.toString().replace(/dummyHash/g, hash);

fs.writeFileSync(versionPath, updatedVersion);