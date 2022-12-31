import fs from 'fs';
import readline from 'readline';
import { execSync } from 'child_process';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Read the current version from v.txt
let version = fs.readFileSync('v', 'utf-8').trim();

console.log("Old Version", version)
rl.question('Enter the new version: ', newVersion => {
  rl.question('Enter New Version message: ', Message => {

    const packageJson = JSON.parse(fs.readFileSync('package.json'));
    packageJson.version = newVersion;
    fs.writeFileSync('package.json', JSON.stringify(packageJson));
    console.log("Updated the Package.json")
    console.log("-------------------------------------------")

    fs.writeFileSync("./src/v.js", `export default \`${newVersion}: ${Message}\` `)
    console.log("Wrote to v.js")
    console.log("-------------------------------------------")

    console.log(execSync('npm run build').toString());
    console.log("Built site with vite")
    console.log("-------------------------------------------")


    fs.writeFileSync('v', `${version}: ${Message}`);
    console.log("Updated v")
    console.log("-------------------------------------------")
  
    console.log(execSync('git add .').toString());
    console.log(execSync(`git commit -am "Version ${newVersion};${Message}"`).toString());
    console.log(execSync('git push').toString());
    console.log("Pushed to github");
    console.log("-------------------------------------------")
  
    console.log("Deploying the Site!")
    console.log(execSync('npm run deploy').toString());
    console.log("-------------------------------------------")

    console.log('Done!');
    rl.close();
  })
});
