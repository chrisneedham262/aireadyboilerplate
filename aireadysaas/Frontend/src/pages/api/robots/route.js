export async function GET() {
    const robotsTxt = `
        User-agent: *
        Allow: /

        # Block certain pages from being indexed
        Disallow: /admin
        Disallow: /login

        # Specify the location of the sitemap
        Sitemap: https://launchsoftwarefast.com/api/sitemap
    `;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
