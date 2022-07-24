import * as path from 'path';

function fullCombine(baseUrl, relative) {

    const fullRoute = path.join(new URL(baseUrl).pathname, relative);
    return new URL(fullRoute, baseUrl).href;

}

export default function generateSitemap(packageData, pages) {

    let output = [
        `<?xml version="1.0" encoding="UTF-8"?>`,
        `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">`,
    ];

    const date = new Date(Date.now());
    const lastMod = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;

    pages.forEach(element => {
        
        output.push(`<url>`);
        output.push(`<loc>${fullCombine(packageData.homepage, element.location || "./")}</loc>`);
        output.push(`<changefreq>weekly</changefreq>`);
        output.push(`<priority>${element.priority || 0}</priority>`);
        output.push(`<lastmod>${lastMod}</lastmod>`);
        output.push(`</url>`);

    });

    output.push(`</urlset>`);

    return output.join('');

}