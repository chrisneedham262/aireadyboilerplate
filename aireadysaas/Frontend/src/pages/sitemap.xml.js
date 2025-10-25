export async function getServerSideProps({ res }) {
    const siteUrl = "http://localhost:3000"; // Change to your actual domain
  
    // Define static pages (modify as needed)
    const staticPages = [
      "",
      "about",
      "contact",
      "services",
      "blog",
    ];
  
    // Generate XML entries for static pages
    const urls = staticPages
      .map((page) => {
        return `<url>
          <loc>${siteUrl}/${page}</loc>
          <lastmod>${new Date().toISOString()}</lastmod>
          <priority>0.8</priority>
        </url>`;
      })
      .join("");
  
    // Create the full sitemap XML structure
    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${urls}
    </urlset>`;
  
    // Set response headers for XML output
    res.setHeader("Content-Type", "application/xml");
    res.write(sitemap);
    res.end();
  
    return {
      props: {}, // No need to pass props
    };
  }
  
  export default function Sitemap() {
    return null;
  }
  