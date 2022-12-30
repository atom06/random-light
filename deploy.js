import fs from 'fs';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read the current version from v.txt
let version = fs.readFileSync('v.txt', 'utf-8').trim();

console.log("Old Version", version)
rl.question('Enter the new version: ', newVersion => {
  rl.question('Enter New Version message: ', Message => {
    const packageJson = JSON.parse(fs.readFileSync('package.json'));
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson));
    console.log("Updated the Package.json\n\n")

    console.log("Writing to v.html\n")
    fs.appendFileSync("./main.js", ` console.log('${newVersion}', '${Message}')`)
    console.log("Wrote!\n")

    console.log("Building the Site with vite\n")
    console.log(execSync('npm run build').toString());
    console.log("Exported the Site!\n")


    console.log("Writing to v.txt\n")
    fs.writeFileSync('v.txt', `v: ${newVersion} \n m: ${Message}\n`);
    console.log("Wrote!\n")
  
    console.log("Pushing to github\n")
    console.log(execSync('git add .').toString());
    console.log(execSync(`git commit -am "Version ${newVersion};${Message}"`).toString());
    console.log(execSync('git push').toString());
    console.log("Now in github!");
  
    console.log("Deploying the Site!")
    console.log(execSync('npm run deploy').toString());
  
    console.log('Done!');
    rl.close();
  })
});
