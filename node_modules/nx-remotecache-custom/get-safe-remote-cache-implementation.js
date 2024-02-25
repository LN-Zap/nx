"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSafeRemoteCacheImplementation = void 0;
const log = __importStar(require("./log"));
const attachLogsToFileOperation = ({ operation, success, failure, verbose, silent, }) => async (filename, ...args) => {
    try {
        const result = await operation(filename, ...args);
        if (!silent) {
            success === null || success === void 0 ? void 0 : success(filename);
        }
        return result;
    }
    catch (error) {
        failure(filename, error);
        if (verbose) {
            console.error(error);
        }
        return null;
    }
};
const getSafeRemoteCacheImplementation = async (implementationPromise, options) => {
    const verbose = !!options.verbose;
    const silent = !!options.silent;
    try {
        const implementation = await implementationPromise;
        const { fileExists, storeFile, retrieveFile } = implementation;
        const name = process.env.NXCACHE_NAME || options.name || implementation.name;
        return {
            name,
            retrieveFile: attachLogsToFileOperation({
                operation: retrieveFile,
                success: (filename) => log.retrieveSuccess(implementation, filename),
                failure: (filename, error) => log.retrieveFailure(implementation, filename, error),
                verbose,
                silent,
            }),
            storeFile: attachLogsToFileOperation({
                operation: storeFile,
                success: (filename) => log.storeSuccess(implementation, filename),
                failure: (filename, error) => log.storeFailure(implementation, filename, error),
                verbose,
                silent,
            }),
            fileExists: attachLogsToFileOperation({
                operation: fileExists,
                failure: (filename, error) => log.checkFailure(implementation, filename, error),
                verbose,
                silent,
            }),
        };
    }
    catch (error) {
        log.setupFailure(error);
        if (verbose) {
            console.error(error);
        }
        return null;
    }
};
exports.getSafeRemoteCacheImplementation = getSafeRemoteCacheImplementation;
