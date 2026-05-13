import { Helmet } from 'react-helmet-async';

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  name?: string;
  schema?: object;
  image?: string;
  noindex?: boolean;
}

export const SEO = ({ title, description, canonical, type = 'website', name = 'Bart Pullen', schema, image = '/portfolio.png', noindex = false }: SEOProps) => {
  // Only append | name if the title doesn't already start with the name
  const fullTitle = title.startsWith(name) ? title : `${title} | ${name}`;
  const siteUrl = 'https://www.bartpullen.nl';
  const absoluteUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const absoluteImage = image.startsWith('http') ? image : `${siteUrl}${image}`;
  
  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      {noindex && <meta name="robots" content="noindex,follow" />}
      {canonical && <link rel="canonical" href={absoluteUrl} />}

      {/* OpenGraph tags */}
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={absoluteUrl} />
      <meta property="og:image" content={absoluteImage} />

      {/* Twitter tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />

      {/* Schema.org JSON-LD */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
};
