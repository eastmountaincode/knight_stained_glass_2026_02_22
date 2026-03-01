import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { ReligiousSection } from '@/components/ReligiousSection'
import { CommercialSection } from '@/components/CommercialSection'
import { ResidentialSection } from '@/components/ResidentialSection'
import { ClientTypes } from '@/lib/sanity';

export default async function Home() {
  const clientTypes = await ClientTypes.get();
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

      {/* About */}
      <section
        id="about"
        className="flex min-h-screen flex-col items-center justify-center snap-start border-b border-[var(--color-border)] px-6 py-20 sm:px-12 md:px-20"
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
          About
        </h2>
        <p className="mt-4 max-w-2xl text-center text-lg text-[var(--color-text)]">
          Coming soon.
        </p>
      </section>

      {/* Contact */}
      <section
        id="contact"
        className="flex min-h-screen flex-col items-center justify-center snap-start px-6 py-20 sm:px-12 md:px-20"
      >
        <h2 className="font-[family-name:var(--font-display)] text-4xl text-[var(--color-gold)]">
          Contact
        </h2>
        <p className="mt-4 max-w-2xl text-center text-lg text-[var(--color-text)]">
          Coming soon.
        </p>
      </section>
    </>
  )
}
