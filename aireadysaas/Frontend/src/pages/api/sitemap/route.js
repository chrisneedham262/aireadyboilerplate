import { SitemapStream, streamToPromise } from 'sitemap';
import { Readable } from 'stream';

export async function GET() {
    const baseUrl = 'https://www.launchsoftwarefast.com';

    const links = [
        { url: '/', changefreq: 'daily', priority: 1.0 },
        { url: '/about', changefreq: 'monthly', priority: 0.8 },
        { url: '/services', changefreq: 'weekly', priority: 0.9 },
    ];

    const stream = new SitemapStream({ hostname: baseUrl });
    const sitemap = await streamToPromise(Readable.from(links).pipe(stream));

    return new Response(sitemap.toString(), {
        headers: {
            'Content-Type': 'application/xml',
        },
    });
}
