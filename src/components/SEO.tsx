import { Helmet } from 'react-helmet-async';

type JsonLd = Record<string, unknown>;

interface SEOProps {
  title: string;
  description: string;
  canonical?: string;
  type?: string;
  name?: string;
  schema?: JsonLd | JsonLd[];
  image?: string;
}

const siteUrl = 'https://www.bartpullen.nl';

const breadcrumbLabels: Record<string, string> = {
  web: 'Webdesign & React Websites',
  security: 'Security & Compliance',
  cra: 'Cyber Resilience Act',
  iso27001: 'ISO 27001 Implementatie',
  labs: 'Labs & Trading Research',
  spx: 'SPX 40-80 DTE Study',
  squeeze: 'Stacked Probabilities System',
  turtlesoup: 'ICT Turtle Soup Setup',
  ict: 'ICT Trading Strategy',
};

const buildBreadcrumbSchema = (canonical?: string): JsonLd | null => {
  if (!canonical) return null;

  const segments = canonical.split('/').filter(Boolean);
  const items = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: `${siteUrl}/`,
    },
    ...segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join('/')}`;
      return {
        '@type': 'ListItem',
        position: index + 2,
        name: breadcrumbLabels[segment] ?? segment,
        item: `${siteUrl}${path}`,
      };
    }),
  ];

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items,
  };
};

export const SEO = ({ title, description, canonical, type = 'website', name = 'Bart Pullen', schema, image = '/portfolio.png' }: SEOProps) => {
  const fullTitle = title.startsWith(name) ? title : `${title} | ${name}`;
  const pageUrl = canonical ? `${siteUrl}${canonical}` : siteUrl;
  const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const schemas = [
    ...(schema ? (Array.isArray(schema) ? schema : [schema]) : []),
    buildBreadcrumbSchema(canonical),
  ].filter(Boolean) as JsonLd[];

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name='description' content={description} />
      <meta name="author" content={name} />
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={pageUrl} />

      <meta property="og:type" content={type} />
      <meta property="og:locale" content="nl_NL" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:site_name" content={name} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:alt" content={`${name} portfolio`} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      {schemas.map((item, index) => (
        <script key={index} type="application/ld+json">
          {JSON.stringify(item)}
        </script>
      ))}
    </Helmet>
  );
};
