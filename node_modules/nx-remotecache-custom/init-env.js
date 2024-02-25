"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.initEnv = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
/**
 * Initializes the environment variables.
 */
const initEnv = (options) => {
    if (options.dotenv !== false) {
        dotenv_1.default.config({ path: options.dotenvPath });
    }
};
exports.initEnv = initEnv;
