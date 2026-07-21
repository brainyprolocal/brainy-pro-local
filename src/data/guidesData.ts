export interface GuideSection {
  heading: string;      // H2 heading
  content: string | string[];      // paragraph content (3-5 sentences, rich with local references)
  subSections?: {       // H3 sub-headings
    heading: string;
    content: string | string[];
  }[];
}

export interface Guide {
  slug: string;
  title: string;
  metaDescription: string;
  excerpt: string;
  author: string;
  publishDate: string;
  readTime: string;
  category: string;
  heroImageAlt: string;
  sections: GuideSection[];
}

export const guides: Guide[] = [
  {
    slug: 'the-central-maryland-hard-water-guide',
    title: 'The Central Maryland Hard Water Guide: Protecting Your Home in Howard County',
    metaDescription: 'Discover how hard water impacts homes in Central Maryland. Learn about water quality in Howard County and find the best water softener solutions.',
    excerpt: 'Hard water is a silent threat to plumbing in Central Maryland. Learn how to identify hard water signs, understand local water quality, and protect your Howard County home.',
    author: 'brAIny pro Team',
    publishDate: '2026-06-12',
    readTime: '8 min read',
    category: 'Plumbing',
    heroImageAlt: 'Water flowing from a faucet in a Columbia MD home',
    sections: [
      {
        heading: 'What Is Hard Water?',
        content: 'Hard water refers to water that has high mineral content, primarily calcium and magnesium. As water percolates through deposits of limestone and chalk in the region, it picks up these minerals. While perfectly safe for consumption, these dissolved minerals can cause significant headaches for homeowners. Understanding hard water is the first step in protecting your property\'s infrastructure and extending the life of your water-using appliances.'
      },
      {
        heading: 'Local Water Quality in Howard County',
        content: 'In Central Maryland, our water comes from a mix of sources, including the Patuxent River and local reservoirs. Communities around Columbia Town Center, Laurel, and Elkridge frequently experience moderate to hard water levels. Whether you enjoy walking around Lake Kittamaqundi or spending weekends at Centennial Park, you\'re close to the water sources that supply your home. Monitoring reports from Howard County indicate that mineral concentrations require active management by homeowners.'
      },
      {
        heading: 'Effects on Your Home\'s Plumbing',
        content: 'Over time, the minerals in hard water precipitate out, creating scale buildup inside your pipes and appliances. This scaling reduces water flow and drastically shortens the lifespan of water heaters, dishwashers, and washing machines. In older homes near Historic Ellicott City, this buildup can be particularly devastating, leading to restricted pipes and costly emergency repairs. Preventative measures can save thousands of dollars in premature replacements.'
      },
      {
        heading: 'Signs Your Home Has Hard Water',
        content: 'The evidence of hard water is usually visible if you know what to look for around your home. You might notice chalky white residue on your showerheads, glass shower doors, and faucets. Your skin and hair may feel unusually dry after showering, and your laundry might look dingy or feel stiff. If you\'re constantly scrubbing mineral stains off your fixtures in your Columbia home, hard water is the likely culprit.'
      },
      {
        heading: 'Water Softener Options',
        content: 'Modern water softening systems come in various types, including salt-based ion exchange systems and salt-free water conditioners. Salt-based systems are generally the most effective at removing hard minerals completely. Many homeowners in Central Maryland opt for whole-house systems installed near the main water line entry. Choosing the right system depends on your household\'s specific water hardness levels and daily water consumption.'
      },
      {
        heading: 'When to Call a Plumbing Professional',
        content: 'While you can install showerhead filters yourself, a whole-house water softening system requires professional expertise. If you notice a sudden drop in water pressure or significant scaling on your fixtures, it\'s time to consult a local Howard County plumber. A brAIny pro trusted professional can test your water accurately, recommend the right system, and ensure it meets local plumbing codes during installation.'
      }
    ]
  },
  {
    slug: 'seasonal-hvac-maintenance-columbia',
    title: 'The Seasonal Guide to HVAC Maintenance in Columbia, MD',
    metaDescription: 'Keep your HVAC system running efficiently year-round with our seasonal maintenance guide specifically tailored for homes in Columbia, MD and Central Maryland.',
    excerpt: 'Navigate the extreme temperatures of Central Maryland with ease. Our seasonal HVAC maintenance guide ensures your Columbia home stays comfortable year-round.',
    author: 'brAIny pro Team',
    publishDate: '2026-05-20',
    readTime: '7 min read',
    category: 'HVAC',
    heroImageAlt: 'HVAC technician performing maintenance on a residential AC unit in Columbia Maryland',
    sections: [
      {
        heading: 'Spring Prep for Summer Cooling',
        content: 'As the cherry blossoms bloom around the Columbia lakefront areas, it\'s crucial to prepare your air conditioning system for the hot, humid Maryland summers. Spring is the ideal time to replace air filters, clean the condensing unit coils, and clear any debris that accumulated over winter. Having a professional inspect the refrigerant levels before the first major heatwave hits the Route 29 corridor can prevent unexpected breakdowns when you need cooling the most.'
      },
      {
        heading: 'Summer Cooling Optimization',
        content: 'During peak summer, your AC works overtime to combat the notorious Central Maryland humidity. To maximize efficiency, keep your thermostat set to a consistent, reasonable temperature and use ceiling fans to circulate the chilled air. Ensure that furniture or drapes aren\'t blocking your supply registers. If you\'re spending the day shopping at the Mall in Columbia or catching a concert at Merriweather Post Pavilion, raising the thermostat a few degrees can significantly lower your energy bills.'
      },
      {
        heading: 'Fall Transition and Heating Prep',
        content: 'When the crisp autumn air arrives, shift your focus from cooling to heating. Before turning on your furnace or heat pump for the first time, schedule an annual heating tune-up with a licensed local technician. This is also the perfect season to check your home\'s insulation and weatherstripping around doors and windows. Proper sealing keeps the cold drafts out and ensures your heating system doesn\'t have to work harder than necessary.'
      },
      {
        heading: 'Winter Heating Efficiency',
        content: 'Winters in Columbia can bring freezing temperatures and occasional heavy snowfalls. Maintain your heating system\'s efficiency by changing the furnace filter regularly, ideally every 1-3 months. Keep the area around your outdoor heat pump clear of snow and ice to allow proper airflow. If you rely on a gas furnace, ensure your carbon monoxide detectors have fresh batteries to keep your family safe during the long winter nights.'
      },
      {
        heading: 'Energy Efficiency Tips for the Maryland Climate',
        content: 'The fluctuating climate of Central Maryland requires a proactive approach to energy efficiency. Upgrading to a smart thermostat can learn your schedule and adjust temperatures automatically, saving energy while you\'re away. Consider scheduling an energy audit to identify areas where your home loses conditioned air. Small investments in sealing ductwork and adding attic insulation can yield substantial returns on your utility bills year after year.'
      },
      {
        heading: 'Choosing a Local HVAC Pro',
        content: 'When it comes to maintaining or replacing your HVAC system, partnering with a reliable local contractor is essential. Look for professionals who are familiar with the specific climate challenges of the Route 29 corridor and Howard County. A trusted brAIny pro HVAC specialist will provide transparent pricing, comprehensive maintenance plans, and prompt emergency service. Building a relationship with a local pro ensures your home remains a comfortable sanctuary regardless of the weather outside.'
      }
    ]
  },
  {
    slug: 'homeowners-guide-storm-damage',
    title: 'The Homeowner\'s Guide to Storm Damage in Central Maryland',
    metaDescription: 'Learn how to identify, assess, and repair storm damage to your roof and property. A comprehensive guide for Central Maryland homeowners.',
    excerpt: 'Severe weather can strike Central Maryland unexpectedly. Learn how to navigate storm damage, file insurance claims, and find reliable local restoration experts.',
    author: 'brAIny pro Team',
    publishDate: '2026-04-05',
    readTime: '9 min read',
    category: 'Roofing',
    heroImageAlt: 'A Central Maryland home with storm damage to the roof being inspected',
    sections: [
      {
        heading: 'Common Storm Damage Types in Maryland',
        content: 'Central Maryland is prone to a variety of severe weather events, including heavy thunderstorms, high winds, and occasional remnants of tropical systems. Homeowners frequently face wind damage, which can lift or completely tear off roof shingles, leaving the underlayment exposed. Hail is another destructive force, causing bruising and granule loss on asphalt shingles. Additionally, heavy rains can overwhelm gutter systems and lead to water intrusion, a concern particularly familiar to residents aware of the Ellicott City flooding history.'
      },
      {
        heading: 'Post-Storm Inspection Checklist',
        content: 'After a severe storm passes through the I-70 corridor, conducting a safe visual inspection of your property is crucial. Start by walking the perimeter of your home, looking for fallen branches, dented gutters, or missing siding. Inspect your roof from the ground using binoculars to check for missing, lifted, or curled shingles. Check your attic for signs of water leaks or damp insulation, which indicate the roof\'s integrity has been compromised.'
      },
      {
        heading: 'Navigating the Insurance Claim Process',
        content: 'If you discover significant damage, contacting your homeowner\'s insurance provider promptly is your next step. Document the damage extensively with clear photos and videos before making any temporary repairs. When the insurance adjuster visits your property, having a local roofing professional present can be invaluable. They can advocate on your behalf, ensuring that all damage, including hidden structural issues, is accurately assessed and included in the claim.'
      },
      {
        heading: 'Emergency Repairs and Mitigation',
        content: 'While waiting for the insurance claim to process, it\'s essential to mitigate further damage to your home. This may involve securely tarping damaged sections of the roof or boarding up broken windows. However, safety should always be the priority; never attempt to climb onto a steep or wet roof yourself. Hire a qualified local contractor to perform these emergency services, and keep all receipts, as these expenses are typically reimbursable under your insurance policy.'
      },
      {
        heading: 'Choosing a Restoration Contractor',
        content: 'Unfortunately, severe storms often attract "storm chasers"—out-of-town contractors who offer quick fixes but provide substandard work. To protect your investment, always choose an established, local contractor based in Central Maryland. Look for professionals with excellent local references, proper licensing, and adequate insurance coverage. A reputable brAIny pro roofing expert will stand by their work long after the storm has passed and provide warranties you can rely on.'
      },
      {
        heading: 'Seasonal Storm Preparation',
        content: 'The best defense against storm damage is proactive preparation. Before the turbulent spring weather or the late summer hurricane season arrives, have your roof professionally inspected. Keep your gutters clean to ensure proper drainage away from your home\'s foundation. Trim overhanging tree branches near your house, especially if you live in heavily wooded areas near the Patapsco River or Historic Ellicott City. These preventative measures can significantly reduce the risk of severe damage when the next storm hits.'
      }
    ]
  }
];
