import { DATA } from "@/data/resume";

export function PersonSchema() {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: DATA.name,
          alternateName: ["Yamuna", "Yamuna B"],
          description: DATA.description,
          image: `${DATA.url}${DATA.avatarUrl}`,
          url: DATA.url,
          sameAs: [
            DATA.contact.social.GitHub.url,
            DATA.contact.social.LinkedIn.url,
            DATA.contact.social.LeetCode.url,
          ],
          jobTitle: "Backend / Cloud Engineer",
          worksFor: {
            "@type": "Organization",
            name: "Velammal College of Engineering and Technology"
          },
          alumniOf: {
            "@type": "CollegeOrUniversity",
            name: "Velammal College of Engineering and Technology"
          },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Madurai",
            addressRegion: "Tamil Nadu",
            addressCountry: "India"
          },
          email: DATA.contact.email,
          knowsAbout: DATA.skills.map(s => s.name)
        })
      }}
    />
  );
}
