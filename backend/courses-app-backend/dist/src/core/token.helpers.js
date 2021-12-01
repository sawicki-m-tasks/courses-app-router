"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTokenWithoutBearer = void 0;
const getTokenWithoutBearer = (authorization) => authorization.split('Bearer')[1].trim();
exports.getTokenWithoutBearer = getTokenWithoutBearer;
//# sourceMappingURL=token.helpers.js.map