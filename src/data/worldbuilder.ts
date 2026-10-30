// Content for /worldbuilder. Place names, groups, Characters and descriptions
// follow the plugin itself (its Place list and README). Everything marked TODO
// is a placeholder and is listed in TODO.md.

export type Group = 'fantasy' | 'modern' | 'scifi' | 'nature';

export const GROUP_LABEL: Record<Group, string> = {
  fantasy: 'Medieval & fantasy',
  modern: 'Modern',
  scifi: 'Sci-fi',
  nature: 'Nature',
};

export interface Place {
  name: string;
  group: Group;
  /** What you hear: the Place's six instruments, in plain words. */
  line: string;
  /** Its three Characters. */
  characters: [string, string, string];
  /** Placeholder demo file in /public/audio, also the peaks key. */
  demo: string;
}

const P = (name: string, group: Group, characters: [string, string, string], line: string) => ({ name, group, characters, line });

// The 26 Places, in the plugin's own order.
const list = [
  P('Castle', 'fantasy', ['Fortress', 'Royal Court', 'Besieged'], 'Brass drones, tuned bells, horn calls, processional timpani, harp and a choir.'),
  P('Village', 'fantasy', ['Market Day', 'Harvest Night', 'Quiet Dawn'], 'Lute, hurdy-gurdy, hand drums, marimba, a recorder and small bell jingles.'),
  P('Spaceport', 'scifi', ['Busy Hub', 'Abandoned Dock', 'Launch'], 'Arpeggiated pulses, wide pads, thruster risers, PA tones and an engine drone.'),
  P('Factory', 'modern', ['Steam Mill', 'Iron Forge', 'Assembly Line'], 'Tuned anvil, a piston ostinato, steam swells, bowed metal and a furnace bass.'),
  P('City', 'modern', ['Rush Hour', 'Night City', 'Rain-soaked'], 'Muted chimes, synth bass, electric piano, a crowd in key, sirens and traffic hum.'),
  P('Forest', 'nature', ['Enchanted', 'Dark Woods', 'Morning Glade'], 'Breathy flute, bird calls, wood percussion, a recorded kalimba and string pads.'),
  P('Alien Hive', 'scifi', ['Dormant', 'Awakening', 'Swarm'], 'Organic pulses, glassy calls, a chittering rhythm, formant drones and a swarm.'),
  P('Temple', 'fantasy', ['Sacred Dawn', 'Ancient Rite', 'Forsaken'], 'Choir, gongs, singing bowls, a chant drone, temple bells and zither.'),
  P('Cavern', 'nature', ['Crystal Cave', 'Deep Mine', 'Flooded'], 'Tuned drips, a sub drone, metal taps, bowed bass and crystal resonances.'),
  P('Ruins', 'fantasy', ['Overgrown', 'Haunted', 'Desolate'], 'Piano shards, a lo-fi music box, broken bells, cold wind and recorded violin.'),
  P('Spaceship', 'scifi', ['Cruising', 'Red Alert', 'Derelict'], 'Engine drone, life support, computer arpeggios, airlocks, hull and a soft alarm.'),
  P('Biodome', 'scifi', ['Thriving', 'Night Cycle', 'Failing'], 'Lush pads, mallets, synthetic birdsong, water plucks and a ventilation hum.'),
  P('Sea Ship', 'modern', ['Calm Seas', 'Storm', 'Ghost Ship'], 'Creaking wood, concertina, rope swells, a ship’s bell, waves and gulls.'),
  P('Suburbs', 'modern', ['Sunny Afternoon', 'Evening', 'Uncanny'], 'Electric piano, a soft pop pulse, wind chimes, a sprinkler hat and a music box.'),
  P('Mall', 'modern', ['Busy Weekend', 'Empty Night', 'Dead Mall'], 'Smooth electric piano, vibraphone, PA chimes, an escalator hum and a fountain.'),
  P('Military Camp', 'modern', ['Morning Drill', 'On Alert', 'Night Watch'], 'Snare marches, bugle calls, low drums, radio blips and tense strings.'),
  P('Beach', 'nature', ['Tropical Day', 'Sunset', 'Stormy Shore'], 'Guitar plucks, steel drum, wave swells, a shaker, a breezy pad and gulls.'),
  P('Desert', 'nature', ['Oasis', 'Endless Dunes', 'Sandstorm'], 'Recorded oud, frame drums, ney flute, a tanpura drone and wind whistles.'),
  P('Palace', 'fantasy', ['Grand Ball', 'Throne Room', 'Fallen Palace'], 'Harpsichord, string pads, fanfare brass, glockenspiel, timpani and choir.'),
  P('Tavern', 'fantasy', ['Lively Night', 'Quiet Corner', 'Brawl'], 'Recorded lute and fiddle, frame drum, glass clinks, squeezebox and stomps.'),
  P('Space Station', 'scifi', ['Routine Orbit', 'Emergency', 'Abandoned'], 'A rotating-hull drone, docking clamps, comms beeps and a zero-g lead.'),
  P('Cyberpunk Megacity', 'scifi', ['Night Market', 'Corporate Tower', 'Riot'], 'Grit bass, a neon arpeggio, rain pads, a drum machine and glitch stabs.'),
  P('Starship Bridge', 'scifi', ['Cruising', 'Battle Stations', 'Warp Jump'], 'Console arpeggios, a warp-core drone, a tactical pulse and alert brass.'),
  P('Asteroid Mining Colony', 'scifi', ['Shift Change', 'Cave-in', 'Night Shift'], 'A drilling ostinato, grind bass, metal clanks, a worker hymn and a beacon.'),
  P('Alien Ruins', 'scifi', ['Dormant', 'Reawakening', 'Guardian'], 'Eroded crystals, ancient machine pulses, an alien choir and ritual drums.'),
  P('Nebula', 'scifi', ['Drift', 'Stellar Nursery', 'Void'], 'Vast evolving pads, cosmic wind, star bells, stardust and solar flares.'),
];

// TODO(audio): a real demo per Place. Until then the four placeholder tones are cycled.
export const PLACES: Place[] = list.map((p, i) => ({ ...p, demo: `placeholder-0${(i % 4) + 1}` }));
export const PLACE_COUNT = PLACES.length;

// TODO(copy): feature wording (facts follow the plugin's README).
export const FEATURES = [
  {
    title: 'Pattern editor',
    body: 'Every instrument plays a pattern you can open and edit: a piano roll with velocity and chance lanes, variants A, B, C and a fill. Play parts in from your MIDI keyboard, drop in a MIDI file, or drag a pattern out to your DAW.',
    points: ['Piano roll', 'MIDI import and export', 'Keyboard recording'],
  },
  {
    title: 'Arrangement timeline',
    body: 'Build a cue in sections (intro, build, climax, wind-down and more), each with its own length and intensity curve. Start from a template, or let Auto-arrange make a first pass for you to shape.',
    points: ['Templates', 'Auto-arrange', 'Transitions'],
  },
  {
    title: 'Game-ready exports',
    body: 'Render the full mix or one stem per Place, export sections that loop as seamless loops, and render each section’s ending as a stinger, ready for a game engine or an edit.',
    points: ['Seamless loops', 'Stems', 'Stingers'],
  },
  {
    title: 'Locations and Journeys',
    body: 'Save up to eight complete versions of your world as Locations, then travel between them. It sounds like moving through a place, not a crossfade.',
    points: ['Up to eight Locations', 'Journeys between them'],
  },
  {
    title: 'Score Intensity',
    body: 'One large dial moves every Place at once, from a calm bed through the world as you set it to a full climax, each Place on its own curve. Automate it to shape a cue over time.',
    points: ['0 % calm, 100 % climax'],
  },
  {
    title: 'Inspire',
    body: 'Press Inspire for a new, musical world built from the next World Seed, or start from one of 24 ready-made scenes, from Ambush at the Tavern to Into the Nebula.',
    points: ['New worlds on demand', '24 factory scenes'],
  },
  {
    title: 'Separate outputs in Logic',
    body: 'Each Place slot also plays on its own stereo output in Logic Pro, so you can mix and process every Place on its own channel.',
    points: ['One stereo output per Place'],
  },
];

// From the plugin's README and installer notes.
// TODO(specs): confirm before launch, especially hosts, memory and disk space.
export const REQUIREMENTS = [
  ['System', 'macOS 10.15 Catalina or later'],
  ['Processor', 'Apple Silicon or Intel (Universal)'],
  ['Formats', 'Audio Unit (AU) and VST3, plus a standalone app'],
  ['Hosts', 'Logic Pro and GarageBand (tested), and other AU or VST3 hosts'],
  ['Memory', 'About 40 MB for the recorded instruments, shared by every instance'],
  ['Disk space', 'About 11 MB for the recordings inside the plugin (TODO: confirm installed size)'],
  ['Activation', 'Licence key from your account'],
] as const;

// TODO(copy): what Lite includes. Nothing in the plugin defines a Lite edition yet.
export const LITE_INCLUDES = ['A selection of Places (TODO: confirm which)', 'Pattern editor and arrangement', 'Render to WAV and MIDI export', 'Upgrade to the full version at any time'];
export const FULL_INCLUDES = ['All 26 Places, each with six instruments and three Characters', 'Pattern editor, arrangement timeline and Auto-arrange', 'Seamless loops, stems and stingers', 'Locations, Journeys, Score Intensity and Inspire', '24 factory scenes and seven planet types'];

// TODO(copy): FAQ answers to confirm.
export const FAQ = [
  ['Do I need to know how to compose to use it?', 'No. Add a Place or load a scene and press play in your DAW: it plays in your song’s key and tempo. Score Intensity and Inspire shape it further. If you do write music, the pattern editor and timeline give you full control.'],
  ['Is it a sample library?', 'Mostly not. Almost everything is synthesised in real time, so it follows your key and tempo. A few instruments play our own recordings, such as the Tavern’s lute and fiddle, the Forest’s kalimba and the Desert’s oud. Nothing comes from other people’s sample libraries.'],
  ['Can I use the music in commercial projects?', 'Yes. Music you make with WORLDBUILDER is yours to use in films, games, TV and other commercial work. See the EULA for the details.'],
  ['Does it work in my DAW?', 'WORLDBUILDER runs as an AU and VST3 plugin on macOS, on Apple Silicon and Intel Macs. It is tested in Logic Pro and GarageBand.'],
  ['Is there a Windows version?', 'Not yet. WORLDBUILDER is macOS only for now.'],
  ['What is the difference between Lite and the full version?', 'Lite is free and includes a selection of Places. The full version unlocks all 26 Places and every feature. You can upgrade from Lite at any time.'],
  ['How does activation work?', 'You receive a licence key when you buy or download. Activate once in the plugin. Offline activation is available for studio computers without internet.'],
  ['Can I get a refund?', 'See the refund policy on the support page.'],
] as const;

// TODO(video): the trailer's YouTube ID (the part after watch?v=). While empty,
// the trailer shows a "coming soon" poster. It loads from youtube-nocookie.com,
// and only after the visitor presses play.
export const TRAILER = { youtubeId: '', title: 'WORLDBUILDER trailer' };
