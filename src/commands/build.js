import * as path from 'path';
import * as fs from 'fs';
import { cleanNPMData } from '../utility/index.js';
import { fileURLToPath } from 'url';

import generateRobots from '../utility/robots.js';
import generateSitemap from '../utility/sitemap.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default async function runCommand() {

    // Get the Package Data
    let packageData = getPackageData();

    // Get the Name of the Package
    let packageName = packageData.name;

    // Get the Public Registry Info
    const latestData = await getLatest(packageName);
    const globalData = await getGlobal(packageName);

    // Log it All
    // console.log(JSON.stringify({ ...latestData, ...globalData }, null, 4));

    const cleanPackageData = cleanNPMData({ latestData, globalData })

    compilePageToHTML(cleanPackageData);
    addExtraPages(cleanPackageData);

}

function getPackageData() {

    // Find the Path to the Package.json
    let packagePath = path.join(process.cwd(), './package.json');

    // If file not found, Throw an Error
    if (!fs.existsSync(packagePath)) throw new Error(`No "package.json" File Found!`);

    // Parse the File Contents to JSON
    let packageTextData = fs.readFileSync(packagePath, 'utf-8');
    let packageData = JSON.parse(packageTextData);

    // If Invalid JSON, Throw an Error
    if (packageData == undefined) throw new Error(`The "package.json" File is Not Valid!`);

    // Return the Finished Package Data
    return packageData;

}

function copyRecursiveSync(src, dest) {
    var exists = fs.existsSync(src);
    var stats = exists && fs.statSync(src);
    var isDirectory = exists && stats.isDirectory();
    if (isDirectory) {
      fs.mkdirSync(dest);
      fs.readdirSync(src).forEach(function(childItemName) {
        copyRecursiveSync(path.join(src, childItemName),
                          path.join(dest, childItemName));
      });
    } else {
      fs.copyFileSync(src, dest);
    }
  };

function addExtraPages(packageData) {

    const robotsData = generateRobots(packageData);
    const sitemapData = generateSitemap(packageData, [
        {
            location: "/",
            priority: 1
        }
    ]);

    fs.writeFileSync(path.join(process.cwd(), './public/robots.txt'), robotsData);
    fs.writeFileSync(path.join(process.cwd(), './public/sitemap.xml'), sitemapData);

}

function compilePageToHTML(packageData) {

    const fileData = fs.readFileSync(path.join(__dirname, '../../template/src/index.jsx'), 'utf-8');
    let finalData = deepReplace(fileData, "packageData", packageData);

    const pagesDir = path.join(process.cwd(), './pages/');

    if (!fs.existsSync(pagesDir)) fs.mkdirSync(pagesDir)
    if (fs.existsSync(path.join(__dirname, '../../template/public'))) copyRecursiveSync(path.join(__dirname, '../../template/public'), path.join(process.cwd(), './public'));

    fs.writeFileSync(pagesDir + './index.jsx', finalData);

}

function deepReplace(text, currentString, object) {

    let output = text;

    for (const key in object) {
        
        if (typeof object[key] == 'object') {

            let newString = `${currentString}.${key}`;
            output = deepReplace(output, newString, object[key]);

            let regex = (`${currentString}.${key}`).replace(/\./g, '\\.');
            output = output.replace(new RegExp(regex, 'g'), JSON.stringify(true))
            
        } else {

            let regex = (`${currentString}.${key}`).replace(/\./g, '\\.');
            output = output.replace(new RegExp(regex, 'g'), JSON.stringify(object[key]))
            
        }
        
    }

    return output;

}

async function getLatest(name) {

    const res = await fetch(`https://registry.npmjs.com/${name}/latest`)
    const data = await res.json();

    return data;

}

async function getGlobal(name) {

    const res = await fetch(`https://registry.npmjs.com/${name}`)
    const data = await res.json();

    return data;

}

export function getName() {

    return "build";

}