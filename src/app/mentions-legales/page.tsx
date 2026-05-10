import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Mentions légales',
  description: 'Mentions légales de Cupacode Studios.',
  robots: { index: false, follow: false },
};

export default function MentionsLegalesPage() {
  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <p className="font-mono text-xs text-gray-500 mb-2">&gt;_ legal</p>
        <h1 className="font-mono text-2xl font-bold text-gray-100 mb-10">Mentions légales</h1>

        <div className="space-y-8 text-sm text-gray-400 leading-relaxed">

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Éditeur du site</h2>
            <p className="text-gray-400">
              Le site <strong className="text-gray-200">cupacode-studios.com</strong> est édité par{' '}
              <strong className="text-gray-200">Cupacode Studios</strong>, studio de développement web et mobile.
            </p>
            <p className="mt-2 text-gray-400">
              Email :{' '}
              <a href="mailto:contact@cupacode-studios.com" className="text-cupadev-400 hover:text-cupadev-300">
                contact@cupacode-studios.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Hébergement</h2>
            <p className="text-gray-400">
              Ce site est hébergé par <strong className="text-gray-200">CUPADEV</strong> —{' '}
              <a href="https://cupadev.com" target="_blank" rel="noopener noreferrer" className="text-cupadev-400 hover:text-cupadev-300">
                cupadev.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Propriété intellectuelle</h2>
            <p className="text-gray-400">
              L'ensemble des contenus présents sur ce site (textes, images, code, design) est la propriété exclusive
              de Cupacode Studios, sauf mention contraire. Toute reproduction, même partielle, est interdite sans
              autorisation préalable écrite.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Responsabilité</h2>
            <p className="text-gray-400">
              Cupacode Studios s'efforce de maintenir les informations publiées à jour et exactes, mais ne saurait
              être tenu responsable des erreurs, omissions ou des résultats qui pourraient être obtenus par un
              mauvais usage de ces informations.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Droit applicable</h2>
            <p className="text-gray-400">
              Le présent site et ses mentions légales sont soumis au droit français. En cas de litige, les tribunaux
              français seront seuls compétents.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
