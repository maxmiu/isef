import { log } from "./logger";

export const httpLogger = (req, res, next) => {
    next();
    log.i(`${res.statusCode} ${req.method} ${req.url}`);
};