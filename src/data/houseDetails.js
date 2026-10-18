/*
 * Frontend-mock house content.
 *
 * This file is the single, modular source of truth for each house's detailed
 * page content. It is intentionally plain data so a real backend/CMS can later
 * replace it field-for-field (see AppStore.updateHouseDetail for the live-edit
 * hook used by the mock CMS drawer).
 */

const pic = (seed) => `https://picsum.photos/seed/${seed}/800/600`

const gallery = (prefix, titles) =>
  titles.map((title, i) => ({ id: `${prefix}-${i + 1}`, title, url: pic(`${prefix}-${i + 1}`) }))

export const houseDetails = {
  W: {
    vibe: {
      tagline: 'Calm as deep water, clear as a mirror.',
      description:
        'White House carries the element of Water and the Clear Mirror of wisdom. Ours is a house of quiet strength — monks here are known for steady discipline, thoughtful reflection, and the ability to stay serene under pressure. When the courtyard is loudest, it is often White House that brings the calm.',
      palette: ['#78909C', '#B0BEC5', '#E3E8EC', '#37474F'],
      anthem: { title: 'White House Anthem — Still Waters', duration: '1:48' },
      banner: pic('white-house-banner'),
    },
    captains: [
      {
        name: 'Tenpa Lodro',
        role: 'House Captain',
        bio: 'A fourth-year philosophy student and senior debate moderator, Tenpa leads White House with the same stillness he brings to the debate courtyard.',
        email: 'white.captain@thar-manjushree.edu.np',
        phone: '+977 1 449 2211',
        photo: pic('white-captain-1'),
      },
      {
        name: 'Sonam Gyaltsen',
        role: 'Vice Captain',
        bio: 'In charge of community service duties, Sonam keeps the house grounded, organised, and always first to lend a hand.',
        email: 'white.vice@thar-manjushree.edu.np',
        phone: '+977 1 449 2212',
        photo: pic('white-captain-2'),
      },
    ],
    records: {
      summary: 'A record built on consistency rather than spectacle — White House rarely misses the podium.',
      cupWins: [
        { year: '2025', title: 'House Cup Champions', note: 'Won on the strength of service points.' },
        { year: '2023', title: 'House Cup Champions', note: 'Led the community cleaning championship.' },
        { year: '2020', title: 'House Cup Champions', note: 'First title under the modern point system.' },
      ],
      trophies: gallery('white-trophy', ['House Cup 2025', 'Service Shield 2024', 'Debate Runners-up 2023', 'Quiet Mind Award 2022']),
    },
    culture: {
      announcement:
        'White House will host the Winter Reflection Retreat and the next Community Cleaning Championship. All members are expected to attend the pre-event briefing.',
      events: [
        { id: 'W-e1', name: 'Winter Reflection Retreat', date: '2026-11-14', time: '9:00 AM', venue: 'Meditation Hall' },
        { id: 'W-e2', name: 'Community Cleaning Championship', date: '2026-11-28', time: '7:30 AM', venue: 'Monastery Grounds' },
        { id: 'W-e3', name: 'Still Waters Study Circle', date: '2026-12-05', time: '4:00 PM', venue: 'Library, Room 2' },
      ],
      news: [
        { id: 'W-n1', title: 'White House tops the service leaderboard', body: 'After three months of volunteer duty, White House has climbed to first place in cumulative service points.', date: '2026-10-01' },
        { id: 'W-n2', title: 'New debate coaching sessions', body: 'Senior members now run weekly debate drills open to all houses.', date: '2026-09-18' },
      ],
    },
    gallery: {
      events: gallery('white-events', ['Monlam Festival', 'House Assembly', 'Founder\u2019s Day']),
      sports: gallery('white-sports', ['Inter-House Relay', 'Athletics Day', 'Tug of War']),
      daily: gallery('white-daily', ['Morning Study', 'Library Hour', 'Evening Puja']),
      video: { title: 'White House — A Year in Still Waters', duration: '2:14', poster: pic('white-video') },
      merch: [
        { name: 'White House Scarf', price: 'NPR 450' },
        { name: 'Mirror Crest Pin', price: 'NPR 150' },
        { name: 'House Notebook', price: 'NPR 300' },
      ],
    },
    rules: [
      'Be present for every morning assembly of the house.',
      'Treat every member with the same calm and courtesy you expect in return.',
      'Keep the house room and shared areas spotless.',
      'No member is left behind in study — seniors mentor juniors weekly.',
      'Speak truthfully and quietly; resolve conflict with words, not volume.',
      'Represent the house with dignity at every inter-house event.',
    ],
    office: {
      location: 'House Room W, West Wing (near the Library)',
      hours: 'Open daily · 4:00 PM – 5:30 PM',
      email: 'whitehouse@thar-manjushree.edu.np',
      phone: '+977 1 449 2210',
    },
    interactive: {
      mascot: {
        name: 'Miru',
        species: 'Snow Swan',
        emoji: '\u{1FAB6}',
        bio: 'Miru the Snow Swan glides across still water without a ripple — a daily reminder that the strongest currents run deep and unseen.',
      },
      quiz: {
        question: 'What is the sacred symbol of White House?',
        options: ['The Golden Dharma Wheel', 'The Clear Mirror', 'The Wish-Fulfilling Jewel', 'The Indestructible Vajra'],
        answer: 1,
      },
      social: [
        { id: 'W-s1', platform: 'Instagram', author: '@whitehouse_tms', body: 'Sunrise reflection session by the pond before class. Stillness is our superpower. #WhiteHouse', date: '2 days ago' },
        { id: 'W-s2', platform: 'Facebook', author: 'Tharlam Manjushree School', body: 'Congratulations to White House for leading the community service board this term!', date: '5 days ago' },
        { id: 'W-s3', platform: 'Instagram', author: '@whitehouse_tms', body: 'Debate drills every Tuesday. Bring your best reasoning.', date: '1 week ago' },
      ],
    },
  },

  B: {
    vibe: {
      tagline: 'Limitless as the sky, inclusive of all.',
      description:
        'Blue House carries the element of Space and the Indestructible Vajra. We are the house of big ideas and open minds — members here are encouraged to think beyond boundaries, welcome every voice, and break through limits others accept. Ambition, with a wide heart.',
      palette: ['#1565C0', '#5B8FD6', '#E3EEF9', '#0D3B72'],
      anthem: { title: 'Blue House Anthem — Vast Sky', duration: '2:02' },
      banner: pic('blue-house-banner'),
    },
    captains: [
      {
        name: 'Ngawang Dorje',
        role: 'House Captain',
        bio: 'A top-ranked scholar and captain of the quiz team, Ngawang is known for turning impossible questions into friendly conversation.',
        email: 'blue.captain@thar-manjushree.edu.np',
        phone: '+977 1 449 2221',
        photo: pic('blue-captain-1'),
      },
      {
        name: 'Pema Thinley',
        role: 'Vice Captain',
        bio: 'Organises the house creative nights and keeps Blue House\u2019s famously big ideas grounded in real plans.',
        email: 'blue.vice@thar-manjushree.edu.np',
        phone: '+977 1 449 2222',
        photo: pic('blue-captain-2'),
      },
    ],
    records: {
      summary: 'The most decorated house in academic competition, and holder of the current House Cup.',
      cupWins: [
        { year: '2026', title: 'House Cup Champions', note: 'Current holders — won the Academic Cup and Quiz.' },
        { year: '2024', title: 'House Cup Champions', note: 'Dominated the Inter-House Debate Cup.' },
        { year: '2021', title: 'House Cup Champions', note: 'Undefeated across all academic events.' },
      ],
      trophies: gallery('blue-trophy', ['House Cup 2026', 'Inter-House Debate Cup', 'Academic Quiz Shield', 'Science Fair Award']),
    },
    culture: {
      announcement:
        'Blue House is now recruiting for the new Inter-House Robotics Club and the Vast Sky open-mic evening. Bring your boldest ideas.',
      events: [
        { id: 'B-e1', name: 'Inter-House Debate Cup', date: '2026-10-26', time: '1:00 PM', venue: 'Main Assembly Hall' },
        { id: 'B-e2', name: 'Vast Sky Open-Mic Evening', date: '2026-11-20', time: '6:00 PM', venue: 'Courtyard Stage' },
        { id: 'B-e3', name: 'Inter-House Robotics Challenge', date: '2026-12-12', time: '10:00 AM', venue: 'Science Block' },
      ],
      news: [
        { id: 'B-n1', title: 'Blue House retains the House Cup', body: 'A commanding finish in the quiz and debate rounds secured the Cup for a second consecutive year.', date: '2026-10-05' },
        { id: 'B-n2', title: 'Robotics Club launches', body: 'The new club is open to all houses, with Blue House leading the founding team.', date: '2026-09-25' },
      ],
    },
    gallery: {
      events: gallery('blue-events', ['Debate Cup Finals', 'Open-Mic Night', 'Science Exhibition']),
      sports: gallery('blue-sports', ['Basketball Semi-Final', 'Cross-Country Run', 'Football Feast']),
      daily: gallery('blue-daily', ['Debate Practice', 'Robotics Lab', 'Group Study']),
      video: { title: 'Blue House — The Vast Sky Reel', duration: '2:41', poster: pic('blue-video') },
      merch: [
        { name: 'Vajra Crest Hoodie', price: 'NPR 1,200' },
        { name: 'Blue House Wristband', price: 'NPR 120' },
        { name: 'Sky Journal', price: 'NPR 350' },
      ],
    },
    rules: [
      'Dare to ask the question others are afraid to ask.',
      'Every voice in the house deserves to be heard out fully.',
      'Prepare thoroughly, then compete with grace.',
      'Share your knowledge — teach one junior something each week.',
      'Respect the rules of every debate, quiz, and competition.',
      'Represent Blue House with imagination and integrity.',
    ],
    office: {
      location: 'House Room B, East Wing (Science Block)',
      hours: 'Open daily · 4:30 PM – 6:00 PM',
      email: 'bluehouse@thar-manjushree.edu.np',
      phone: '+977 1 449 2220',
    },
    interactive: {
      mascot: {
        name: 'Vajri',
        species: 'Sky Eagle',
        emoji: '\u{1F985}',
        bio: 'Vajri the Sky Eagle circles higher than any other — a symbol of the boundless perspective that Blue House members chase every day.',
      },
      quiz: {
        question: 'Which symbol represents Blue House?',
        options: ['The Indestructible Vajra (Dorje)', 'The Clear Mirror', 'The Lotus', 'The Golden Fish'],
        answer: 0,
      },
      social: [
        { id: 'B-s1', platform: 'Instagram', author: '@bluehouse_tms', body: 'House Cup back-to-back! Vast sky, bigger dreams. #BlueHouse', date: '1 day ago' },
        { id: 'B-s2', platform: 'Facebook', author: 'Tharlam Manjushree School', body: 'Blue House Robotics Club demos its first walking robot at assembly.', date: '4 days ago' },
        { id: 'B-s3', platform: 'Instagram', author: '@bluehouse_tms', body: 'Open-mic sign-ups are live. Say something that matters.', date: '6 days ago' },
      ],
    },
  },

  R: {
    vibe: {
      tagline: 'Burn away ignorance, light up the dark with kindness.',
      description:
        'Red House carries the element of Fire and the Golden Dharma Wheel. We are the house of warmth and action — members here turn compassion into movement, cheer the quietest teammate, and bring contagious energy to every courtyard and stage.',
      palette: ['#C62828', '#E57373', '#FBE9E7', '#7F1414'],
      anthem: { title: 'Red House Anthem — Kindling Fire', duration: '1:56' },
      banner: pic('red-house-banner'),
    },
    captains: [
      {
        name: 'Tenzin Norbu',
        role: 'House Captain',
        bio: 'A champion athlete and tireless organiser, Tenzin leads with warmth and never lets a teammate stand alone.',
        email: 'red.captain@thar-manjushree.edu.np',
        phone: '+977 1 449 2231',
        photo: pic('red-captain-1'),
      },
      {
        name: 'Lobsang Dawa',
        role: 'Vice Captain',
        bio: 'Head of house sports and the first to rally everyone together for a practice session or a celebration.',
        email: 'red.vice@thar-manjushree.edu.np',
        phone: '+977 1 449 2232',
        photo: pic('red-captain-2'),
      },
    ],
    records: {
      summary: 'Masters of the sports field, with the loudest, warmest supporters in the school.',
      cupWins: [
        { year: '2022', title: 'House Cup Champions', note: 'Swept the athletics and team sports events.' },
        { year: '2019', title: 'House Cup Champions', note: 'Won the Friendly Academic Quiz and Sports Cup.' },
      ],
      trophies: gallery('red-trophy', ['Sports Cup 2025', 'Friendly Quiz 2024', 'Athletics Shield 2022', 'Spirit Award 2021']),
    },
    culture: {
      announcement:
        'Red House is warming up for the Friendly Academic Quiz and the Losar cultural night. Sports teammates: Friday practice is mandatory.',
      events: [
        { id: 'R-e1', name: 'Friendly Academic Quiz', date: '2026-11-08', time: '2:00 PM', venue: 'Main Assembly Hall' },
        { id: 'R-e2', name: 'Losar Cultural Night', date: '2026-11-22', time: '6:30 PM', venue: 'Courtyard Stage' },
        { id: 'R-e3', name: 'Inter-House Sports Meet', date: '2026-12-18', time: '8:00 AM', venue: 'Sports Ground' },
      ],
      news: [
        { id: 'R-n1', title: 'Red House wins the relay again', body: 'An unbeaten 4x100 relay capped a dominant day on the track for Red House.', date: '2026-10-03' },
        { id: 'R-n2', title: 'Cultural night preparations begin', body: 'Rehearsals for the Losar cultural performance are underway every evening.', date: '2026-09-20' },
      ],
    },
    gallery: {
      events: gallery('red-events', ['Losar Night', 'Sports Meet', 'House Celebration']),
      sports: gallery('red-sports', ['Relay Victory', 'Football Final', 'Kabaddi Match']),
      daily: gallery('red-daily', ['Team Practice', 'Art Workshop', 'Group Chanting']),
      video: { title: 'Red House — Fuel the Flame', duration: '2:27', poster: pic('red-video') },
      merch: [
        { name: 'Dharma Wheel Tee', price: 'NPR 900' },
        { name: 'Red House Cap', price: 'NPR 500' },
        { name: 'Kindling Bottle', price: 'NPR 400' },
      ],
    },
    rules: [
      'Bring energy — but always lift others, never put them down.',
      'Attend practice; the team is only as strong as its turnouts.',
      'Celebrate wins loudly and losses with grace.',
      'Support a younger member at every event you attend.',
      'Care for the equipment and spaces you use.',
      'Kindness first: the fire we carry is warmth, not anger.',
    ],
    office: {
      location: 'House Room R, North Wing (near Sports Ground)',
      hours: 'Open daily · 4:00 PM – 5:30 PM',
      email: 'redhouse@thar-manjushree.edu.np',
      phone: '+977 1 449 2230',
    },
    interactive: {
      mascot: {
        name: 'Dhanu',
        species: 'Fire Phoenix',
        emoji: '\u{1F525}',
        bio: 'Dhanu the Fire Phoenix rises brighter after every fall — the spirit of resilience and warmth that Red House carries into every match and every morning.',
      },
      quiz: {
        question: 'What is the motto of Red House?',
        options: [
          'Limitless as the sky, inclusive of all.',
          'Rooted firmly in truth, supporting all equally.',
          'Burn away ignorance, light up the dark with kindness.',
          'Like deep water, remain calm, pure, and profound.',
        ],
        answer: 2,
      },
      social: [
        { id: 'R-s1', platform: 'Instagram', author: '@redhouse_tms', body: 'Relay champions three years running! Fire on the track. #RedHouse', date: '1 day ago' },
        { id: 'R-s2', platform: 'Facebook', author: 'Tharlam Manjushree School', body: 'Red House Losar rehearsal looked spectacular — full night coming up.', date: '3 days ago' },
        { id: 'R-s3', platform: 'Instagram', author: '@redhouse_tms', body: 'Friday practice. Be there. Bring the heat.', date: '5 days ago' },
      ],
    },
  },

  Y: {
    vibe: {
      tagline: 'Rooted firmly in truth, supporting all equally.',
      description:
        'Yellow House carries the element of Earth and the Wish-Fulfilling Jewel. We are the house of patience and quiet generosity — members here are dependable, humble, and always the first to share credit and the last to complain.',
      palette: ['#F9A825', '#FBCD5F', '#FEF6E0', '#8A5A00'],
      anthem: { title: 'Yellow House Anthem — Steady Ground', duration: '1:51' },
      banner: pic('yellow-house-banner'),
    },
    captains: [
      {
        name: 'Karma Wangchuk',
        role: 'House Captain',
        bio: 'A patient mentor and skilled traditional debater, Karma leads Yellow House by quiet example rather than loud instruction.',
        email: 'yellow.captain@thar-manjushree.edu.np',
        phone: '+977 1 449 2241',
        photo: pic('yellow-captain-1'),
      },
      {
        name: 'Ugyen Tsering',
        role: 'Vice Captain',
        bio: 'Coordinates the house\u2019s traditional arts programme and keeps every member involved, however shy.',
        email: 'yellow.vice@thar-manjushree.edu.np',
        phone: '+977 1 449 2242',
        photo: pic('yellow-captain-2'),
      },
    ],
    records: {
      summary: 'The most consistent house in traditional arts and debate, and a perennial fan favourite.',
      cupWins: [
        { year: '2018', title: 'House Cup Champions', note: 'Won the Traditional Debate Tournament.' },
        { year: '2016', title: 'House Cup Champions', note: 'First champions recognised under house tradition.' },
      ],
      trophies: gallery('yellow-trophy', ['Traditional Debate Cup', 'Cultural Shield 2024', 'Arts Award 2023', 'Steady Ground Trophy']),
    },
    culture: {
      announcement:
        'Yellow House invites everyone to the Traditional Debate Tournament and the Thangka arts workshop. Sign-ups close one week before each event.',
      events: [
        { id: 'Y-e1', name: 'Traditional Debate Tournament', date: '2026-12-02', time: '10:00 AM', venue: 'Main Assembly Hall' },
        { id: 'Y-e2', name: 'Thangka Arts Workshop', date: '2026-12-16', time: '3:00 PM', venue: 'Arts Studio' },
        { id: 'Y-e3', name: 'New Year Ground-Blessing', date: '2027-01-09', time: '8:30 AM', venue: 'Monastery Courtyard' },
      ],
      news: [
        { id: 'Y-n1', title: 'Yellow House wins the cultural shield', body: 'A moving traditional performance earned Yellow House top honours at this year\u2019s cultural festival.', date: '2026-10-02' },
        { id: 'Y-n2', title: 'Thangka workshop announced', body: 'Master artists will guide students through the first steps of traditional scroll painting.', date: '2026-09-15' },
      ],
    },
    gallery: {
      events: gallery('yellow-events', ['Cultural Festival', 'Debate Tournament', 'Blessing Ceremony']),
      sports: gallery('yellow-sports', ['Archery Day', 'Long Jump', 'Team Volleyball']),
      daily: gallery('yellow-daily', ['Thangka Painting', 'Debate Study', 'Garden Duty']),
      video: { title: 'Yellow House — Steady Ground Reel', duration: '2:09', poster: pic('yellow-video') },
      merch: [
        { name: 'Wish-Jewel Tote', price: 'NPR 550' },
        { name: 'Yellow House Beanie', price: 'NPR 650' },
        { name: 'Ground Journal', price: 'NPR 300' },
      ],
    },
    rules: [
      'Be dependable — if you commit, follow through.',
      'Share credit generously and give feedback kindly.',
      'Honour the traditions of the school and monastery.',
      'Make time for both study and practice every day.',
      'Tend the house garden and common spaces together.',
      'Support the quietest member; everyone belongs here.',
    ],
    office: {
      location: 'House Room Y, South Wing (near Arts Studio)',
      hours: 'Open daily · 4:30 PM – 5:30 PM',
      email: 'yellowhouse@thar-manjushree.edu.np',
      phone: '+977 1 449 2240',
    },
    interactive: {
      mascot: {
        name: 'Jewel',
        species: 'Snow Lion',
        emoji: '\u{1F981}',
        bio: 'Jewel the Snow Lion stands on solid ground and gives freely, asking nothing in return — the gentle, grounded heart of Yellow House.',
      },
      quiz: {
        question: 'Which element belongs to Yellow House?',
        options: ['Water', 'Fire', 'Earth', 'Space'],
        answer: 2,
      },
      social: [
        { id: 'Y-s1', platform: 'Instagram', author: '@yellowhouse_tms', body: 'Cultural Shield winners! Steady ground, steady hands. #YellowHouse', date: '2 days ago' },
        { id: 'Y-s2', platform: 'Facebook', author: 'Tharlam Manjushree School', body: 'Yellow House thangka workshop filled up in an afternoon. Waitlist open.', date: '4 days ago' },
        { id: 'Y-s3', platform: 'Instagram', author: '@yellowhouse_tms', body: 'Garden duty this Saturday. Bring gloves and good company.', date: '1 week ago' },
      ],
    },
  },
}

export function getHouseDetail(id) {
  return houseDetails[id] || null
}
