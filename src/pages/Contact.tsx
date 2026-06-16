import { memo, useState } from 'react';
import { useForm, ValidationError } from '@formspree/react';
import { motion, useReducedMotion } from 'framer-motion';
import { SEO } from '../components/SEO';
import { delayed, viewportOnce } from '../lib/motion';

export const Contact = memo(() => {
  const reduced = useReducedMotion();
  const [state, handleSubmit] = useForm('xqewqajg');
  const [subject, setSubject] = useState('');

  const hi = reduced ? {} : { opacity: 0, y: 24 };
  const vp = { opacity: 1, y: 0 };
  const t = (delay = 0) => reduced ? { duration: 0 } : delayed(delay);

  const contactSchema = {
    '@context': 'https://schema.org',
    '@type': 'ContactPage',
    name: 'Contact | Bart Pullen',
    url: 'https://www.bartpullen.nl/contact',
    about: {
      '@type': 'Person',
      name: 'Bart Pullen',
      url: 'https://www.bartpullen.nl',
    },
  };

  return (
    <>
      <SEO
        title="Contact"
        description="Neem contact op met Bart Pullen over security, websites, data-analyse of portfolio-projecten."
        canonical="/contact"
        schema={contactSchema}
      />

      <header className="contact-hero">
        <div className="container">
          <motion.p className="overline" initial={hi} animate={vp} transition={t(0.1)}>
            Contact
          </motion.p>
          <motion.h1 initial={hi} animate={vp} transition={t(0.2)}>
            Laten we iets <span style={{ color: 'var(--accent)' }}>concreets</span> bespreken.
          </motion.h1>
          <motion.p className="lead" initial={hi} animate={vp} transition={t(0.32)}>
            Heb je een vraag over security, een website, data-analyse of een project op deze site?
            Laat je gegevens achter, dan is de structuur alvast duidelijk.
          </motion.p>
        </div>
      </header>

      <main className="contact-page">
        <div className="container">
          <motion.div
            className="contact-grid"
            initial={hi}
            whileInView={vp}
            viewport={viewportOnce}
            transition={reduced ? { duration: 0 } : { duration: 0.35, ease: 'easeOut' }}
          >
            <section className="contact-intro" aria-labelledby="contact-heading">
              <p className="section-kicker">Direct & praktisch</p>
              <h2 id="contact-heading">Vertel kort waar je mee bezig bent.</h2>
              <p>
                Een goede eerste boodschap hoeft niet lang te zijn. Context, doel en timing zijn genoeg
                om snel te bepalen wat een logisch vervolg is.
              </p>
              <dl className="contact-points">
                <div>
                  <dt>Onderwerpen</dt>
                  <dd>Security, ISO 27001, CRA, websites, performance en data-onderzoek.</dd>
                </div>
                <div>
                  <dt>Handig om te delen</dt>
                  <dd>Je vraag, gewenste uitkomst, deadline en relevante links.</dd>
                </div>
              </dl>
            </section>

            {state.succeeded ? (
              <div className="contact-form contact-success" role="status" aria-live="polite">
                <p className="section-kicker">Bericht ontvangen</p>
                <h2>Dank je wel.</h2>
                <p>
                  Je bericht is verzonden. Ik kom erop terug zodra ik de context goed heb kunnen lezen.
                </p>
              </div>
            ) : (
              <form className="contact-form" aria-label="Contactformulier" onSubmit={handleSubmit}>
                <input
                  type="hidden"
                  name="_subject"
                  value={subject.trim() ? `Nieuw contactformulier: ${subject}` : 'Nieuw bericht via bartpullen.nl/contact'}
                />

                <div className="form-row">
                  <label htmlFor="name">Naam</label>
                  <input id="name" name="name" type="text" autoComplete="name" placeholder="Je naam" required />
                  <ValidationError className="form-error" field="name" errors={state.errors} />
                </div>

                <div className="form-row">
                  <label htmlFor="email">E-mail</label>
                  <input id="email" name="email" type="email" autoComplete="email" placeholder="jij@example.nl" required />
                  <ValidationError className="form-error" field="email" errors={state.errors} />
                </div>

                <div className="form-row">
                  <label htmlFor="subject">Onderwerp</label>
                  <input
                    id="subject"
                    name="onderwerp"
                    type="text"
                    placeholder="Waar gaat het over?"
                    value={subject}
                    onChange={(event) => setSubject(event.target.value)}
                  />
                  <ValidationError className="form-error" field="onderwerp" errors={state.errors} />
                </div>

                <div className="form-row">
                  <label htmlFor="message">Bericht</label>
                  <textarea id="message" name="message" rows={7} placeholder="Schrijf je bericht..." required />
                  <ValidationError className="form-error" field="message" errors={state.errors} />
                </div>

                <ValidationError className="form-error" errors={state.errors} />

                <button className="btn-primary contact-submit" type="submit" disabled={state.submitting}>
                  {state.submitting ? 'Versturen...' : 'Versturen'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </main>
    </>
  );
});
