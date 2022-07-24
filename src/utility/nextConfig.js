export default function generateNextConfig() {

    const options = {
        assetPrefix: './'
    };

    return `/**
* @type {import('next').NextConfig}
*/
const nextConfig = ${JSON.stringify(options, null, 4)};

export default nextConfig`;

}