import { execSync } from 'node:child_process'
import { dirname, resolve } from 'node:path'

// Get the directory of the current script
const dir = dirname(__filename);

// Run npm install in the script's directory
execSync('npm install', { cwd: dir, stdio: 'inherit' });