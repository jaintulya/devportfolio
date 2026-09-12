const fs = require('fs');
const path = require('path');

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      if (file !== 'node_modules' && file !== '.next') scanDir(fullPath);
    } else if (file.endsWith('.jsx') || file.endsWith('.js') || file.endsWith('.css')) {
      const content = fs.readFileSync(fullPath, 'utf8');
      const lines = content.split('\n');
      lines.forEach((line, idx) => {
        if (/lineHeight|line-height/.test(line) && /0\.[789]/.test(line)) {
          console.log('TIGHT LINEHEIGHT: ' + fullPath.replace(process.cwd(), '') + ':' + (idx + 1) + ' -> ' + line.trim());
        }
        if (/overflow\s*:\s*["'](hidden|clip)["']/.test(line)) {
          console.log('OVERFLOW: ' + fullPath.replace(process.cwd(), '') + ':' + (idx + 1) + ' -> ' + line.trim());
        }
      });
    }
  }
}
scanDir('./src');
