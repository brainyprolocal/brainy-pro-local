export interface AgendaItem {
  number: number;
  slug: string;
  title: string;
  description: string;
}

export const agendaItems: AgendaItem[] = [
  {
    number: 1,
    slug: 'whatsapp-group',
    title: 'WhatsApp Group',
    description:
      'Create the network WhatsApp group that unites both in-person chapters into one connected group.',
  },
  {
    number: 2,
    slug: 'b2b-reviews',
    title: 'B2B Reviews',
    description:
      'Best practices for leaving business-to-business reviews for each other and other local businesses.',
  },
  {
    number: 3,
    slug: 'systems-saturday',
    title: 'Systems Saturday',
    description:
      'Set aside a little time each week to work on the systems in your business.',
  },
];
