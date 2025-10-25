import Head from 'next/head';
import { seoData } from '../data/seoData';

export default function SEO({ page }) {
  const data = seoData[page] || seoData.home;

  return (
    <Head>
      <title>{data.title}</title>
      <meta name="description" content={data.description} />
      <meta name="keywords" content={data.keywords} />
      <meta property="og:title" content={data.og_title} />
      <meta property="og:description" content={data.og_description} />
    </Head>
  );
}

