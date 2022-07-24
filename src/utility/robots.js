import * as path from "path";

export default function generateRobots(packageData) {

    return [
        `User-agent: *`,
        `Allow: /`,
        ``,
        `Sitemap: ${fullCombine(packageData.homepage, './sitemap.xml')}`
    ].join('\n');

}

function fullCombine(baseUrl, relative) {

    const fullRoute = path.join(new URL(baseUrl).pathname, relative);
    return new URL(fullRoute, baseUrl).href;

}