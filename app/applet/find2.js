import fs from 'fs';
import path from 'path';

function findFiles(dir, pattern) {
  if (dir.startsWith('/proc') || dir.startsWith('/sys') || dir.startsWith('/dev')) return;
  try {
    const files = fs.readdirSync(dir);
    for (const file of files) {
      const fullPath = path.join(dir, file);
      if (fullPath.includes(pattern)) {
        console.log(fullPath);
      }
      try {
        if (fs.statSync(fullPath).isDirectory()) {
          findFiles(fullPath, pattern);
        }
      } catch (e) {}
    }
  } catch (e) {}
}

findFiles('/', 'BEFORE_A');
