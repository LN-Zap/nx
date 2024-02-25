"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFileNameFromHash = void 0;
const hash_suffix_1 = require("./hash-suffix");
function getFileNameFromHash(hash) {
    return hash + hash_suffix_1.HASH_SUFFIX;
}
exports.getFileNameFromHash = getFileNameFromHash;
