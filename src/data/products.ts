// The Windward Audio line-up. Facts follow each plugin's own repository
// (README and docs, read on 2026-11-04). Release dates and prices are not
// set yet for the newer instruments: see TODO.md.
import type { ImageMetadata } from 'astro';
import type { Realm } from '../config/site';

import threshold from '../assets/art/threshold.webp';
import liminalHospital from '../assets/products/liminal-hospital.webp';
import liminalPool from '../assets/products/liminal-pool.webp';
import liminalMall from '../assets/products/liminal-mall.webp';
import liminalHotel from '../assets/products/liminal-hotel.webp';
import liminalOffice from '../assets/products/liminal-office.webp';
import liminalUi from '../assets/products/liminal-ui.webp';
import dungeonMap from '../assets/products/dungeon-map.webp';
import dungeonBoss from '../assets/products/dungeon-boss-lair.webp';
import dungeonHall from '../assets/products/dungeon-great-hall.webp';
import dungeonTreasure from '../assets/products/dungeon-treasure-room.webp';
import dungeonUi from '../assets/products/dungeon-ui.webp';
import lightMap from '../assets/products/light-map.webp';
import lightNave from '../assets/products/light-nave.webp';
import lightMoonwell from '../assets/products/light-moonwell.webp';
import lightGlade from '../assets/products/light-butterfly-glade.webp';
import lightUi from '../assets/products/light-ui.webp';

export interface Shot { image: ImageMetadata; alt: string; caption: string }
export interface WorldGroup { name: string; note?: string; items: { name: string; detail?: string }[]; footer?: string }

export interface Product {
  slug: string;
  name: string;
  number: string;
  realm: Realm;
  /** What it is, in a few words. */
  kind: string;
  /** "Available now" or a release note. TODO(release) for the newer ones. */
  status: string;
  available: boolean;
  formats: string;
  tagline: string;
  summary: string;
  card: { image: ImageMetadata; alt: string };
}

export interface ProductDetail extends Product {
  lede: string;
  facts: [string, string][];
  editions?: { name: string; body: string }[];
  intro: { title: string; paras: string[] };
  gallery: Shot[];
  worlds: { title: string; lede: string; groups: WorldGroup[] };
  extra?: { title: string; lede: string; chips: string[] };
  features: { title: string; body: string }[];
  requirements: [string, string][];
}

const MAC = 'macOS 10.15 or later, Apple Silicon or Intel';

// ── LIMINAL ───────────────────────────────────────────────────────────
const liminalPlaces: [string, string, string][] = [
  ['Vacant Hospital', 'Sterile Silence · After Hours · Something Wrong', 'A long, cold corridor: mains hum, a ballast buzz and flutter between parallel walls.'],
  ['Empty Shopping Mall', 'Closing Time · Forgotten · Endless', 'A vast atrium, an escalator still running, a fountain far off. Or the PA in another wing.'],
  ['Abandoned School', 'After Class · Childhood Memory · Nightmare', 'Lockers, a wall clock ticking once a second, boxy corridors.'],
  ['Underground Parking Garage', 'Vacant · Distant Movement · Pursuit', 'Concrete, ventilation fans, slap-back off the pillars, a car door on another level.'],
  ['Abandoned Indoor Pool', 'Still Water · Forgotten Summer · Submerged', 'Almost silent. Still water, bright tiles and a long, shimmering tail.'],
  ['Empty Hotel', 'Late Night · Faded Luxury · Room 404', 'Carpet, an ice machine down the hall, music through the wall from the next room.'],
  ['Deserted Subway Station', 'Last Train · Abandoned · Approaching', 'A tiled platform, the rails still humming, a long echo down the tunnel.'],
  ['Empty Supermarket', 'Closing Shift · Nostalgia · Fluorescent Nightmare', 'Refrigerators cycling on and off under the fluorescent hum.'],
  ['Endless Office', 'After Hours · Dream State · Infinite Cubicles', 'The fluorescent hum is the room. Carpet, ceiling tiles, partitions that never end.'],
  ['Impossible Room', 'Familiar · Unstable · Beyond Reality', 'A small room with a cathedral’s tail, a hum that drifts, and sudden total silence.'],
];

const liminal: ProductDetail = {
  slug: 'liminal',
  name: 'LIMINAL',
  number: '02',
  realm: 'liminal',
  kind: 'Instrument',
  status: 'Coming 2027', // TODO(release)
  available: false,
  formats: 'AU / VST3 · macOS',
  tagline: 'Playable instruments inside empty places.',
  summary: '20 fragile instruments inside ten liminal spaces: a hospital corridor at night, a mall after closing, a pool where the water never moves.',
  card: { image: liminalHospital, alt: 'An empty hospital corridor under fluorescent light, rendered for LIMINAL.' },
  lede: 'Pick a space, play a fragile piano melody, and hear it become part of the architecture. 20 instruments, ten empty buildings, and the quiet hum of lights that never switch off.',
  facts: [['Places', '10'], ['Instruments', '20'], ['Characters', '30'], ['Presets', '114']],
  intro: {
    title: 'The room is the sound.',
    paras: [
      'A liminal space is still. LIMINAL’s places are steady hums and room tone, rare and distant events, and above all their acoustics: the flutter between hospital walls, the concrete of a parking garage, the bright tiles of an indoor pool.',
      'Every instrument you play takes on the room it is in. Move it to another wing of the mall and it comes back over the PA; in the hotel you hear it through the wall from the next room.',
    ],
  },
  gallery: [
    { image: liminalHospital, alt: 'A long hospital corridor, pale green walls, ceiling lights fading into the distance.', caption: 'Vacant Hospital' },
    { image: liminalPool, alt: 'An indoor pool under skylights, still turquoise water, white tiles.', caption: 'Abandoned Indoor Pool' },
    { image: liminalMall, alt: 'An empty shopping mall atrium with an escalator and a polished floor.', caption: 'Empty Shopping Mall' },
    { image: liminalHotel, alt: 'A dim hotel corridor with patterned carpet and closed doors.', caption: 'Empty Hotel' },
    { image: liminalOffice, alt: 'An empty open-plan office under rows of fluorescent tubes.', caption: 'Endless Office' },
    { image: liminalUi, alt: 'The LIMINAL interface: the hospital scene fills the window, with instrument controls on translucent strips like a camcorder viewfinder.', caption: 'The viewfinder: the place is the interface' },
  ],
  worlds: {
    title: '10 empty buildings.',
    lede: 'Each place reshapes every instrument, has its own room and its own rare sounds, and three Characters that change its light and mood.',
    groups: liminalPlaces.map(([name, chars, detail]) => ({ name, items: [{ name: chars }], note: detail })),
  },
  extra: {
    title: '20 instruments',
    lede: '6 slots, each able to play any of them, with its own effects and room.',
    chips: ['Forgotten Piano', 'Faded Synth', 'Glass Memories', 'Empty Choir', 'Lost Music Box', 'Hollow Drone', 'Old Guitar', 'Faded Strings', 'Hallway Pizzicato', 'Toy Piano', 'Lounge E-Piano', 'Elevator Vibraphone', 'Mall Chimes', 'Solo Voice', 'Hummed Memory', 'Cassette Strings', 'Arcade Lead', 'Basement Bass', 'Warped Organ', 'Bowed Glass'],
  },
  features: [
    { title: 'Places with real acoustics', body: 'Each room has its own decay, reflections, damping and width, so the same melody sounds cold in the hospital, cavernous in the mall and close in the hotel.' },
    { title: 'Thirty Characters', body: '3 per place, from Sterile Silence to Something Wrong. Each changes the events, the mood and the picture’s colour grade.' },
    { title: '4 macros', body: 'Presence, Scale, Activity and Unreal: bring the instruments forward, stretch the room, invite rare events, or let the place come apart in its own way.' },
    { title: 'Far Away', body: 'Hear the instruments from elsewhere in the building: over the PA in another wing, or through the wall from the next room.' },
    { title: 'Scenes A and B, and evolution', body: 'Morph between two settings, or let the place drift slowly on its own.' },
    { title: 'The viewfinder', body: 'Photographic scenes fill the window. Their lights flicker with the hum and swell with the notes, with controls on thin strips like an old camcorder.' },
  ],
  requirements: [['System', MAC], ['Formats', 'Audio Unit (AU) and VST3, plus a standalone app'], ['Hosts', 'Logic Pro and GarageBand (tested), and other AU or VST3 hosts'], ['Extras', '114 presets, ambience export to WAV, Eco, Standard and High quality']],
};

// ── DUNGEON CRAWLER ───────────────────────────────────────────────────
const dungeonLocations: [string, string, string[], string][] = [
  ['Dungeon', 'dark orchestral', ['Corridors', 'Entrance Hall', 'Prison Cells', 'Treasure Room', 'Final Boss Lair'], 'Contrabass Pizzicato · Cello Drone-Lead · Iron Chains · Golden Celesta · Doom Brass & Choir'],
  ['Castle', 'royal court', ['Courtyard', 'Great Hall', 'Throne Room', 'Chapel', 'Tower Top'], 'Lute · Brass Fanfare · Royal Strings · Chamber Organ · Heroic Horn'],
  ['Cathedral', 'sacred voices and bells', ['Cloister', 'Nave', 'Crypt', 'Bell Tower'], 'Soft Choir · Pipe Organ · Monk Chant · Church Bells'],
  ['Haunted Forest', 'eerie wood and wind', ['Forest Edge', 'Old Path', 'Witch’s Hut', 'Ancient Grove'], 'Wooden Flute · Cello Harmonics · Music Box · Ancient Harp'],
  ['Caverns', 'stone, crystal and water', ['Cave Mouth', 'Crystal Cavern', 'Underground Lake', 'Dragon’s Hoard'], 'Stone Marimba · Crystal Bells · Water Kalimba · Hoard Gong'],
  ['Village', 'weary folk', ['Village Green', 'Tavern', 'Market Square', 'Blacksmith'], 'Tin Whistle · Weary Guitar · Fiddle · Tuned Anvil'],
  ['Swamp', 'murky', ['Mire', 'Bog', 'Sunken Ruins'], 'Detuned Banjo · Murky Reed · Drowned Bells'],
  ['Mountains', 'highland stone', ['Foothills', 'Mountain Pass', 'Frozen Peak', 'Dwarven Hall'], 'Shepherd’s Flute · War Drums · Ice Glockenspiel · Dwarven Chant'],
  ['Necropolis', 'death and ghosts', ['Gates', 'Graveyard', 'Mausoleum'], 'Dark Choir Pad · Ghost Violin · Tolling Bell & Organ'],
  ['Wizard’s Tower', 'arcane', ['Stairwell', 'Library', 'Alchemy Lab', 'Observatory'], 'Harpsichord Arpeggio · Clavichord · Glass Marimba · Celestial Pad'],
];

const dungeon: ProductDetail = {
  slug: 'dungeon-crawler',
  name: 'DUNGEON CRAWLER',
  number: '03',
  realm: 'dungeon',
  kind: 'Instrument and effect',
  status: 'Coming 2027', // TODO(release)
  available: false,
  formats: 'AU / VST3 · macOS',
  tagline: 'A dark realm under a red moon.',
  summary: '40 places across a painted dark-fantasy map, from the Dungeon’s corridors to the Final Boss Lair. An instrument for every place, and an effect that puts any track there.',
  card: { image: dungeonMap, alt: 'The painted DUNGEON CRAWLER map: a dark realm lit red, with the Dungeon, Castle, Cathedral and other locations.' },
  lede: 'A painted map of a dark realm is the interface. Choose a place and you choose its instrument and its space together: a contrabass pizzicato in the Dungeon’s corridors, church bells in the bell tower, a ghost violin in the graveyard.',
  facts: [['Locations', '10'], ['Places', '40'], ['Instruments', '40'], ['Plug-ins', '2']],
  editions: [
    { name: 'DUNGEON CRAWLER', body: 'The instrument. Play it from your keyboard or the piano roll: every place has its own instrument, inside its own space. Lock the instrument to carry it into another place, like the Tavern’s guitar in the Final Boss Lair.' },
    { name: 'DUNGEON CRAWLER FX', body: 'The effect. Put it on any track (guitar, synth, piano, voice) and it sounds as if it were played there, with the place’s room and a signature effect no other place uses.' },
  ],
  intro: {
    title: 'Every place sounds different.',
    paras: [
      'Each of the forty places has its own room and a signature no other place uses: iron bars ringing in the Prison Cells, a glittering octave sparkle in the Treasure Room, a sub-octave choir in the Final Boss Lair, canyon echoes in the Mountain Pass.',
      'Travel between them instantly, over seconds or in time with the song, with no clicks and the tails ringing on. Or set a journey and let it wander the realm on its own.',
    ],
  },
  gallery: [
    { image: dungeonMap, alt: 'The painted map of the dark realm under a red glow.', caption: 'The map' },
    { image: dungeonBoss, alt: 'A dark chamber with a red-lit throne: the Final Boss Lair.', caption: 'Dungeon · Final Boss Lair' },
    { image: dungeonHall, alt: 'A vaulted castle hall lit by a red window.', caption: 'Castle · Great Hall' },
    { image: dungeonTreasure, alt: 'The Treasure Room, a dark vault glinting red and gold.', caption: 'Dungeon · Treasure Room' },
    { image: dungeonUi, alt: 'The DUNGEON CRAWLER instrument window: a painted castle tower above the instrument panel and an on-screen keyboard.', caption: 'The instrument: Castle · Tower Top, Heroic Horn' },
  ],
  worlds: {
    title: '10 locations, forty places.',
    lede: 'Each location is a family of instruments; each place inside it has its own.',
    groups: dungeonLocations.map(([name, family, places, instruments]) => ({
      name, note: family, items: places.map((p) => ({ name: p })), footer: instruments,
    })),
  },
  features: [
    { title: 'An instrument for every place', body: '40 instruments with five macros each, the sustain pedal, pitch bend and mod wheel. Choosing a place chooses its instrument; Lock instrument keeps it while you travel.' },
    { title: 'Signature effects', body: 'Every place has one effect no other place uses, from ringing iron bars to a reverse swell in the Graveyard.' },
    { title: 'Smooth travel and journeys', body: 'Move between places instantly, over seconds or in tempo, level-matched and click-free. Journeys follow a route over bars; roaming wanders a location by itself.' },
    { title: 'Atmosphere', body: 'Optional, and off by default: sparse, quiet sounds of the place. Torches, drips, wind, crows, a distant bell, a far-off growl.' },
    { title: 'A painted world', body: 'The map and all forty places are painterly scenes. The view zooms in with parallax, mist drifts, embers rise, windows flicker and the moon’s glow breathes.' },
    { title: 'Presets for both', body: 'Every instrument in its own place, instruments placed somewhere unexpected (church bells in the Crystal Cavern), and journeys for the effect.' },
  ],
  requirements: [['System', MAC], ['Formats', '2 plug-ins, each as Audio Unit (AU) and VST3: the instrument and the effect'], ['Hosts', 'Logic Pro and GarageBand (tested), and other AU or VST3 hosts']],
};

// ── LIGHT SEEKER ──────────────────────────────────────────────────────
const lightLocations: [string, string, [string, string][]][] = [
  ['Celestial Citadel', 'radiant brass and strings', [['Gates of Dawn', 'Fanfare Trumpets'], ['Hall of Mirrors', 'Shimmering Strings'], ['Throne of Light', 'Orchestral Chord Pad'], ['Spire Summit', 'Soaring Horn']]],
  ['Sky Temple', 'bells and voices', [['Cloud Steps', 'Rising Harp Glissando'], ['Sanctum', 'Angelic Choir'], ['Bell Garden', 'Wind Chimes and Bells']]],
  ['Elven Sanctuary', 'harps and flutes', [['Moonwell', 'Glass Harp'], ['Leaf Halls', 'Elven Lyre'], ['Starlit Canopy', 'Airy Flute']]],
  ['Crystal Palace', 'crystal', [['Prism Hall', 'Crystal Bells'], ['Mirror Lake', 'Glass Harmonica Pad'], ['Diamond Vault', 'Celesta']]],
  ['Blossom Meadow', 'pastoral', [['Sunlit Meadow', 'Warm Acoustic Guitar'], ['Butterfly Glade', 'Bouncy Kalimba'], ['Wildflower Hill', 'Pastoral Oboe']]],
  ['Golden Cathedral', 'sacred and golden', [['Nave of Light', 'Grand Organ'], ['Choir Loft', 'Radiant Choir'], ['Stained Glass Chapel', 'Celesta and Harp']]],
  ['Floating Isles', 'airy', [['Cloud Bridge', 'Cloud Pad'], ['Windswept Isle', 'Breathy Wind Flute'], ['Sky Harbour', 'Shimmering Pluck']]],
  ['Royal Gardens', 'courtly', [['Rose Garden', 'Concert Harp'], ['Fountain Court', 'Music Box'], ['Marble Colonnade', 'Harpsichord']]],
  ['Fairy Glade', 'twinkly', [['Mushroom Ring', 'Bouncy Pizzicato'], ['Firefly Hollow', 'Twinkling Glockenspiel'], ['Fairy Court', 'Fairy Harp']]],
  ['Dragon’s Peak', 'epic and heroic', [['Eyrie', 'Heroic Horns'], ['Golden Nest', 'Warm Strings'], ['Summit of Winds', 'Epic Choir and Brass']]],
];
const lightCount = lightLocations.reduce((n, [, , p]) => n + p.length, 0);

const light: ProductDetail = {
  slug: 'light-seeker',
  name: 'LIGHT SEEKER',
  number: '04',
  realm: 'radiant',
  kind: 'Instrument and effect',
  status: 'Coming 2027', // TODO(release)
  available: false,
  formats: 'AU / VST3 · macOS',
  tagline: 'A sunlit realm of sky castles and crystal palaces.',
  summary: `The bright twin of DUNGEON CRAWLER: ${lightCount} places across a painted, sunlit map. Uplifting, shimmering and majestic, as an instrument and as an effect.`,
  card: { image: lightMap, alt: 'The painted LIGHT SEEKER map: green meadows, a river, crystal spires and floating isles in daylight.' },
  lede: 'Click a location on the sunlit map to zoom in, then choose a place: fanfare trumpets at the Gates of Dawn, a glass harp at the Moonwell, a grand organ in the Nave of Light.',
  facts: [['Locations', '10'], ['Places', String(lightCount)], ['Instruments', String(lightCount)], ['Plug-ins', '2']],
  editions: [
    { name: 'LIGHT SEEKER', body: 'The instrument. Every place has its own instrument, played from your keyboard or the piano roll inside that place’s space. Travel and the space changes while held notes play on.' },
    { name: 'LIGHT SEEKER FX', body: 'The effect. Every place transforms any track with its own space and a signature no other place uses, level-matched and musical on guitar, synth, piano and voice.' },
  ],
  intro: {
    title: 'Uplifting, shimmering, majestic.',
    paras: [
      'Where DUNGEON CRAWLER descends, LIGHT SEEKER rises. Its places are sky castles and crystal palaces, blossom meadows and golden cathedrals, each with its own instrument and a signature space: a pitch-spiral shimmer on the Cloud Steps, colours split across the stereo field in the Prism Hall, echoes soaring a fifth higher from the Sky Harbour.',
    ],
  },
  gallery: [
    { image: lightMap, alt: 'The painted sunlit map with meadows, rivers and crystal spires.', caption: 'The map' },
    { image: lightNave, alt: 'A golden cathedral nave with stained glass and blue pillars.', caption: 'Golden Cathedral · Nave of Light' },
    { image: lightMoonwell, alt: 'A glade with blossoming trees around a pale well.', caption: 'Elven Sanctuary · Moonwell' },
    { image: lightGlade, alt: 'A meadow glade full of flowers and butterflies in soft light.', caption: 'Blossom Meadow · Butterfly Glade' },
    { image: lightUi, alt: 'The LIGHT SEEKER instrument window: the sunlit map above the instrument panel and an on-screen keyboard.', caption: 'The instrument window' },
  ],
  worlds: {
    title: `10 locations, ${lightCount} places.`,
    lede: 'Each location is a family; each place has an instrument of its own, good dry and in its space.',
    groups: lightLocations.map(([name, family, places]) => ({
      name, note: family, items: places.map(([p, inst]) => ({ name: p, detail: inst })),
    })),
  },
  features: [
    { title: 'An instrument for every place', body: 'From Fanfare Trumpets to a Bouncy Kalimba, each with Tone, Attack, Release and a Character control of its own: the trumpets’ piccolo, the choir’s descant, the harp’s glissando.' },
    { title: 'Choirs that grow', body: 'Vowel morphs through the sung vowels; Ensemble brings singers in one by one, up to eight, each its own take and place in the stereo field.' },
    { title: 'Punch', body: 'Gain on hit: each note starts a little louder and settles back, set per instrument, with a limiter so it never clips.' },
    { title: 'Signature spaces', body: 'Every place transforms the sound in a way no other place does.' },
    { title: 'A painted, sunlit world', body: 'A painterly map you zoom into, location by location, with scenes for every place.' },
  ],
  requirements: [['System', MAC], ['Formats', '2 plug-ins, each as Audio Unit (AU) and VST3: the instrument and the effect'], ['Hosts', 'Logic Pro and GarageBand (tested), and other AU or VST3 hosts']],
};

// ── The line-up ───────────────────────────────────────────────────────
export const WORLDBUILDER_CARD: Product = {
  slug: 'worldbuilder',
  name: 'WORLDBUILDER',
  number: '01',
  realm: 'scifi',
  kind: 'Scoring instrument',
  status: 'Available now',
  available: true,
  formats: 'AU / VST3 · macOS',
  tagline: 'A place to score, in your key and tempo.',
  summary: '26 Places, from castles and taverns to spaceports and nebulae, each an ensemble of six instruments that plays in your song’s key and tempo.',
  card: { image: threshold, alt: '' },
};

export const UPCOMING: ProductDetail[] = [liminal, dungeon, light];
export const PRODUCTS: Product[] = [WORLDBUILDER_CARD, ...UPCOMING];
export const productBySlug = (slug: string) => UPCOMING.find((p) => p.slug === slug)!;
