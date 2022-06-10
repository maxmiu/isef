import { log } from "./logger";

export const httpLogger = (req, res, next) => {
    log.i(`${req.method} ${req.url}`);
    next();
};