"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HASH_SUFFIX = void 0;
/**
 * Hash suffix will be modified whenever the archiving method is beeing updated.
 * This will prevent incorrect cache-hits with older versions.
 *
 * Examples:
 * - .zip
 * - .tar.gz
 * - -v2.tar.gz
 */
exports.HASH_SUFFIX = ".tar.gz";
