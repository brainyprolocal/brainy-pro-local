const agendaItems = [
  {
    number: 1,
    title: 'WhatsApp Group',
    description:
      'Create the network WhatsApp group that unites both in-person chapters into one connected group.',
  },
  {
    number: 2,
    title: 'B2B Reviews',
    description:
      'Best practices for leaving business-to-business reviews for each other and other local businesses.',
  },
  {
    number: 3,
    title: 'Systems Saturday',
    description:
      'Set aside a little time each week to work on the systems in your business.',
  },
];

export default function FallNetworkAgenda() {
  return (
    <section className="max-w-3xl mx-auto px-6 pt-2 pb-16">
      {/* Section heading */}
      <h2 className="text-2xl md:text-3xl font-montserrat font-bold mb-6">
        Fall Network Meeting Agenda
      </h2>

      <div className="space-y-4">
        {agendaItems.map((item) => (
          <div
            key={item.number}
            className="flex items-start gap-6 p-6 rounded-xl bg-white/5 border border-white/10"
          >
            <div className="text-action-accent font-mono text-sm whitespace-nowrap font-semibold min-w-[80px]">
              {item.number}.
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-1">{item.title}</h3>
              <p className="text-white/60 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
