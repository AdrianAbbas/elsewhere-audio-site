// Generates PLACEHOLDER demo audio (simple synthesised tones) and the
// waveform peaks the audio player draws before anything is loaded.
//
// TODO(audio): replace public/audio/placeholder-*.mp3 with real demos, then
// re-run this script's peak step on them (or delete the peaks: the waveform is optional).
//
// Requires ffmpeg on your PATH. Usage: npm run audio:placeholders
import { execFileSync } from 'node:child_process';
import { writeFileSync } from 'node:fs';

const SECONDS = 14;
const BARS = 72;

// Each placeholder is a soft chord with a slow swell, so they sound
// different from one another without pretending to be real content.
const DEMOS = {
  'placeholder-01': [110, 164.81, 220, 277.18], // warm, open
  'placeholder-02': [98, 146.83, 196, 233.08], // darker
  'placeholder-03': [130.81, 196, 261.63, 329.63], // brighter
  'placeholder-04': [87.31, 130.81, 174.61, 207.65], // low drone
};

for (const [name, freqs] of Object.entries(DEMOS)) {
  const voices = freqs
    .map((f, i) => `${(0.22 / (i + 1)).toFixed(3)}*sin(2*PI*${f}*t)*(0.6+0.4*sin(2*PI*${(0.07 + i * 0.05).toFixed(2)}*t))`)
    .join('+');
  const envelope = `min(1,t/3)*min(1,(${SECONDS}-t)/3)`;
  const expr = `(${voices})*${envelope}`;
  const out = `public/audio/${name}.mp3`;
  execFileSync('ffmpeg', [
    '-y', '-loglevel', 'error',
    '-f', 'lavfi', '-i', `aevalsrc=exprs='${expr}':s=44100:d=${SECONDS}`,
    '-ac', '1', '-codec:a', 'libmp3lame', '-b:a', '64k', out,
  ]);
  console.log('wrote', out);
}

// Peaks: decode each file to raw PCM and keep the loudest sample per bar.
const peaks = {};
for (const name of Object.keys(DEMOS)) {
  const pcm = execFileSync('ffmpeg', [
    '-loglevel', 'error', '-i', `public/audio/${name}.mp3`,
    '-ac', '1', '-ar', '8000', '-f', 's16le', '-',
  ], { maxBuffer: 64 * 1024 * 1024 });
  const samples = new Int16Array(pcm.buffer, pcm.byteOffset, pcm.length / 2);
  const per = Math.floor(samples.length / BARS);
  const bars = [];
  for (let b = 0; b < BARS; b++) {
    let max = 0;
    for (let i = b * per; i < (b + 1) * per; i++) max = Math.max(max, Math.abs(samples[i]));
    bars.push(max);
  }
  const top = Math.max(...bars) || 1;
  peaks[name] = { duration: SECONDS, peaks: bars.map((v) => Math.round((v / top) * 100) / 100) };
}
writeFileSync('src/data/audio-peaks.json', JSON.stringify(peaks, null, 2) + '\n');
console.log('wrote src/data/audio-peaks.json');
