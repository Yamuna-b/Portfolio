import { DATA } from "@/data/resume";

export function JsonLd() {
  const structuredData = [{
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': `${DATA.url}/#person`,
    name: DATA.name,
    givenName: 'Yamuna',
    familyName: 'B',
    url: DATA.url,
    image: `${DATA.url}${DATA.avatarUrl}`,
    jobTitle: 'Backend / Cloud Engineer',
    nationality: {
      '@type': 'Country',
      name: 'India'
    },
    alumniOf: {
      '@type': 'EducationalOrganization',
      name: 'Velammal College of Engineering and Technology',
      url: 'https://vcet.ac.in'
    },
    sameAs: [
      DATA.contact.social.GitHub.url,
      DATA.contact.social.LinkedIn.url,
      DATA.contact.social.LeetCode.url,
    ],
    knowsAbout: [
      'Backend Development',
      'Cloud Engineering',
      'AWS',
      'Python',
      'FastAPI',
      'Node.js',
      'Express.js',
      'PostgreSQL',
      'MongoDB',
      'Docker',
      'REST APIs',
      'AI Integration'
    ],
    knowsLanguage: ['English', 'Tamil', 'Hindi'],
    description: DATA.description
  },
  {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': `${DATA.url}/#website`,
    name: `${DATA.name} - Portfolio`,
    url: DATA.url,
    description: DATA.description,
    publisher: {
      '@id': `${DATA.url}/#person`
    }
  }];

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
