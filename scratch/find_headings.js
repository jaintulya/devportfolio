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
        if (/<h[1-6]|className=.*heading/i.test(line)) {
          // print next 10 lines
          const snippet = lines.slice(idx, idx + 12).join('\n');
          if (/lineHeight|line-height|overflow/.test(snippet)) {
            console.log(`=== ${fullPath}:${idx + 1} ===\n${snippet}\n`);
          }
        }
      });
    }
  }
}
scanDir('./src');
