import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ReligiousSection } from '@/components/content-sections/ReligiousSection'
import { CommercialSection } from '@/components/content-sections/CommercialSection'
import { ResidentialSection } from '@/components/content-sections/ResidentialSection'
import { AboutSection } from '@/components/content-sections/AboutSection'
import { ContactSection } from '@/components/content-sections/ContactSection'
import { ClientTypes, About, Contact } from '@/lib/sanity';

export default async function Home() {
  const [clientTypes, about, contact] = await Promise.all([
    ClientTypes.get(),
    About.get(),
    Contact.get(),
  ]);
  const byId = Object.fromEntries(clientTypes.map((ct: any) => [ct._id, ct]));
  const religious = byId['religious'];
  const commercial = byId['commercial'];
  const residential = byId['residential'];

  return (
    <>
      <Header />
      <Hero />
      {religious && <ReligiousSection data={religious} />}
      {commercial && <CommercialSection data={commercial} />}
      {residential && <ResidentialSection data={residential} />}
      <AboutSection data={about} />
      <ContactSection data={contact} />
    </>
  )
}
