import { execSync } from 'node:child_process';
import { dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
// Get the URL of the current module
const moduleUrl = import.meta.url;
// Convert the module URL to a file path
const filePath = fileURLToPath(moduleUrl);
// Get the directory of the current script
const dir = dirname(filePath);
// Run npm install in the script's directory
execSync('npm install', { cwd: dir, stdio: 'inherit' });
