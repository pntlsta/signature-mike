const fs = require('fs');
const path = require('path');

function findFiles(dir, pattern) {
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

findFiles('/app', 'PROJECT_PHOTOS');
findFiles('/', 'PROJECT_PHOTOS');
