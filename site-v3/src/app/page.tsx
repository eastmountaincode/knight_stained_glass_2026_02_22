import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ReligiousSection } from '@/components/content-sections/ReligiousSection'
import { CommercialSection } from '@/components/content-sections/CommercialSection'
import { ResidentialSection } from '@/components/content-sections/ResidentialSection'
import { AboutSection } from '@/components/content-sections/AboutSection'
import { ContactSection } from '@/components/content-sections/ContactSection'
import { Hero as HeroData, ClientTypes, About, Contact } from '@/lib/sanity';

export default async function Home() {
  const [hero, clientTypes, about, contact] = await Promise.all([
    HeroData.get(),
    ClientTypes.get(),
    About.get(),
    Contact.get(),
  ]);
  const byId = Object.fromEntries(clientTypes.map((ct: any) => [ct._id, ct]));
  const religious = byId['religious'];
  const commercial = byId['commercial'];
  const residential = byId['residential'];

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'Knight Stained Glass',
    description:
      'Church restorations, commercial installations, and custom residential stained glass by Andrea Knight. Serving the Cincinnati area.',
    url: 'https://www.knightstainedglass.com',
    image: 'https://www.knightstainedglass.com/og-image.jpg',
    telephone: contact?.phone,
    email: contact?.email,
    address: {
      '@type': 'PostalAddress',
      streetAddress: '2762 Highland Ave.',
      addressLocality: 'Cincinnati',
      addressRegion: 'OH',
      postalCode: '45230',
      addressCountry: 'US',
    },
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      {hero && <Hero data={hero} />}
      {religious && <ReligiousSection data={religious} />}
      {commercial && <CommercialSection data={commercial} />}
      {residential && <ResidentialSection data={residential} />}
      <AboutSection data={about} />
      <ContactSection data={contact} />
    </>
  )
}
