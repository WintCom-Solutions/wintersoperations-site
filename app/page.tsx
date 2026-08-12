const services = [
  {
    title: 'Operations Consulting',
    text: 'Process improvement, practical workflow design, and fractional operations leadership for teams that need cleaner execution.',
  },
  {
    title: 'AI & Automation Consulting',
    text: 'Python automation and integration work focused on Cisco Meraki, SolarWinds, ServiceNow, and the systems that keep IT moving.',
  },
];

export default function Home() {
  return (
    <main>
      <section className="hero">
        <div className="eyebrow">Winters Operations</div>
        <h1>Operations clarity with automation that actually ships.</h1>
        <p>
          Consulting for teams that need stronger processes, smarter tooling, and
          hands-on AI automation across real-world infrastructure platforms.
        </p>
        <div className="actions">
          <a href="mailto:contact@example.com">Start a conversation</a>
          <span>Placeholder contact — final details coming soon.</span>
        </div>
      </section>

      <section className="services" aria-label="Services">
        {services.map((service) => (
          <article key={service.title}>
            <h2>{service.title}</h2>
            <p>{service.text}</p>
          </article>
        ))}
      </section>

      <section className="about">
        <div>
          <p className="eyebrow">About</p>
          <h2>Built for operators, engineers, and leaders who need momentum.</h2>
        </div>
        <p>
          Winters Operations helps translate messy operational problems into
          workable systems: cleaner handoffs, better visibility, and automation
          that reduces repetitive work without adding unnecessary complexity.
        </p>
      </section>
    </main>
  );
}
