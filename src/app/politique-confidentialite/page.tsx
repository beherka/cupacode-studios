import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Politique de confidentialité',
  description: 'Politique de confidentialité et gestion des données personnelles — Cupacode Studios.',
  robots: { index: false, follow: false },
};

export default function PolitiqueConfidentialitePage() {
  const year = new Date().getFullYear();

  return (
    <div className="section">
      <div className="container-page max-w-3xl">
        <p className="font-mono text-xs text-gray-500 mb-2">&gt;_ legal</p>
        <h1 className="font-mono text-2xl font-bold text-gray-100 mb-2">Politique de confidentialité</h1>
        <p className="font-mono text-xs text-gray-600 mb-10">Dernière mise à jour : {year}</p>

        <div className="space-y-8 text-sm text-gray-400 leading-relaxed">

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Responsable du traitement</h2>
            <p>
              <strong className="text-gray-200">Cupacode Studios</strong> — contact :{' '}
              <a href="mailto:contact@cupacode-studios.com" className="text-cupadev-400 hover:text-cupadev-300">
                contact@cupacode-studios.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Données collectées</h2>
            <p>
              Ce site collecte uniquement les données strictement nécessaires à son fonctionnement :
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {[
                'Données de session (authentification administrateur via Supabase Auth)',
                'Adresse e-mail si vous nous contactez directement par e-mail',
                'Logs techniques d'accès (adresse IP, navigateur) conservés 30 jours maximum',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cupadev-400 shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Nous ne collectons <strong className="text-gray-200">aucune donnée publicitaire</strong>, aucun profil
              comportemental et n'utilisons aucun outil de tracking tiers (Google Analytics, Facebook Pixel, etc.).
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Cookies</h2>
            <p>
              Ce site utilise uniquement :
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {[
                'Cookies de session Supabase (authentification admin — durée de session)',
                'Cookie de consentement (mémorisation de votre choix — 1 an, localStorage)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-studios-400 shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Aucun cookie publicitaire ou de mesure d'audience n'est déposé sur votre appareil.
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Base légale</h2>
            <p>
              Le traitement est fondé sur l'<strong className="text-gray-200">intérêt légitime</strong> (sécurité et
              fonctionnement du site) et le <strong className="text-gray-200">consentement</strong> pour les cookies
              non essentiels (art. 6 RGPD).
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Vos droits</h2>
            <p>
              Conformément au RGPD (Règlement UE 2016/679) et à la loi Informatique et Libertés, vous disposez des
              droits suivants :
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {[
                'Droit d'accès à vos données',
                'Droit de rectification',
                'Droit à l'effacement (droit à l'oubli)',
                'Droit d'opposition au traitement',
                'Droit à la portabilité',
                'Droit d'introduire une réclamation auprès de la CNIL (cnil.fr)',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-cupadev-400 shrink-0">+</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
            <p className="mt-3">
              Pour exercer vos droits :{' '}
              <a href="mailto:contact@cupacode-studios.com" className="text-cupadev-400 hover:text-cupadev-300">
                contact@cupacode-studios.com
              </a>
            </p>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Sous-traitants</h2>
            <p>
              Nous utilisons les services suivants, conformes RGPD :
            </p>
            <ul className="mt-3 space-y-1.5 font-mono text-xs">
              {[
                'Supabase (authentification, base de données, stockage) — serveurs EU',
                'CUPADEV (hébergement) — cupadev.com',
                'Google Fonts (polices web, via preconnect) — aucun cookie déposé',
              ].map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <span className="text-gray-600 shrink-0">→</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h2 className="font-mono text-xs text-gray-500 uppercase tracking-widest mb-3">Durée de conservation</h2>
            <p>
              Les données de contact (e-mails reçus) sont conservées 3 ans maximum. Les logs techniques sont purgés
              automatiquement après 30 jours.
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}
