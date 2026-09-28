// Pure Web Audio API synthesized sound effects for kids' motivational app

let audioCtx: AudioContext | null = null;
let isMuted: boolean = false;

export function toggleMute(): boolean {
  isMuted = !isMuted;
  return isMuted;
}

export function getIsMuted(): boolean {
  return isMuted;
}

function getAudioContext(): AudioContext | null {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Rich celebratory festive sound when completing a task:
 * 1. Party popper burst
 * 2. Ascending cheerful fanfare chords
 * 3. Magical sparkling harp glissando
 */
export function playCelebrationSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // 1. Party popper pop at t = 0
    const popOsc = ctx.createOscillator();
    const popGain = ctx.createGain();
    popOsc.type = 'triangle';
    popOsc.frequency.setValueAtTime(320, now);
    popOsc.frequency.exponentialRampToValueAtTime(80, now + 0.08);
    popGain.gain.setValueAtTime(0.35, now);
    popGain.gain.exponentialRampToValueAtTime(0.001, now + 0.09);
    popOsc.connect(popGain);
    popGain.connect(ctx.destination);
    popOsc.start(now);
    popOsc.stop(now + 0.1);

    // 2. Ascending triumphant fanfare notes: C5, E5, G5, B5, C6
    const fanfareNotes = [
      { f: 523.25, t: 0.05, d: 0.14 }, // C5
      { f: 659.25, t: 0.18, d: 0.14 }, // E5
      { f: 783.99, t: 0.31, d: 0.16 }, // G5
      { f: 987.77, t: 0.44, d: 0.18 }, // B5
      { f: 1046.50, t: 0.60, d: 0.55 }, // C6 (sustained triumphant finale)
    ];

    fanfareNotes.forEach((n) => {
      // Main tone
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(n.f, now + n.t);

      gain.gain.setValueAtTime(0, now + n.t);
      gain.gain.linearRampToValueAtTime(0.3, now + n.t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(now + n.t);
      osc.stop(now + n.t + n.d);

      // Harmony overtone (brass warmth)
      const osc2 = ctx.createOscillator();
      const gain2 = ctx.createGain();
      osc2.type = 'sine';
      osc2.frequency.setValueAtTime(n.f * 1.5, now + n.t);

      gain2.gain.setValueAtTime(0, now + n.t);
      gain2.gain.linearRampToValueAtTime(0.12, now + n.t + 0.02);
      gain2.gain.exponentialRampToValueAtTime(0.001, now + n.t + n.d);

      osc2.connect(gain2);
      gain2.connect(ctx.destination);

      osc2.start(now + n.t);
      osc2.stop(now + n.t + n.d);
    });

    // 3. Magical sparkling bell twinkles between 0.65s and 1.1s
    const sparkles = [1318.51, 1567.98, 1760.00, 2093.00, 2637.02];
    sparkles.forEach((freq, idx) => {
      const spkOsc = ctx.createOscillator();
      const spkGain = ctx.createGain();
      const st = now + 0.65 + idx * 0.07;

      spkOsc.type = 'sine';
      spkOsc.frequency.setValueAtTime(freq, st);

      spkGain.gain.setValueAtTime(0, st);
      spkGain.gain.linearRampToValueAtTime(0.15, st + 0.015);
      spkGain.gain.exponentialRampToValueAtTime(0.0001, st + 0.3);

      spkOsc.connect(spkGain);
      spkGain.connect(ctx.destination);

      spkOsc.start(st);
      spkOsc.stop(st + 0.35);
    });
  } catch (err) {
    console.error('Audio error in celebration:', err);
  }
}

/**
 * Star collection chime sound
 */
export function playStarSound() {
  playCelebrationSound();
}

/**
 * Cheerful, sweet cartoon bubble pop sound for buttons (delightful for kids)
 */
export function playPopSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    // Primary bubbly tone (starts warm and bounces up quickly like a joyful cartoon bubble)
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(480, now);
    osc.frequency.exponentialRampToValueAtTime(740, now + 0.045);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.008);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.065);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.07);

    // Sweet xylophone sparkle overtone
    const bellOsc = ctx.createOscillator();
    const bellGain = ctx.createGain();

    bellOsc.type = 'triangle';
    bellOsc.frequency.setValueAtTime(1040, now);
    bellOsc.frequency.exponentialRampToValueAtTime(1180, now + 0.035);

    bellGain.gain.setValueAtTime(0.01, now);
    bellGain.gain.linearRampToValueAtTime(0.06, now + 0.006);
    bellGain.gain.exponentialRampToValueAtTime(0.0005, now + 0.045);

    bellOsc.connect(bellGain);
    bellGain.connect(ctx.destination);

    bellOsc.start(now);
    bellOsc.stop(now + 0.05);
  } catch (err) {
    console.error('Audio error:', err);
  }
}

/**
 * Triumphant fanfare when unlocking rewards
 */
export function playFanfareSound() {
  if (isMuted) return;
  try {
    const ctx = getAudioContext();
    if (!ctx) return;
    const now = ctx.currentTime;

    const chords = [
      { f: [523.25, 659.25], t: 0, d: 0.16 },
      { f: [587.33, 698.46], t: 0.17, d: 0.16 },
      { f: [659.25, 783.99], t: 0.34, d: 0.2 },
      { f: [783.99, 1046.50], t: 0.55, d: 0.7 },
    ];

    chords.forEach((chord) => {
      chord.f.forEach((freq) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + chord.t);

        gain.gain.setValueAtTime(0, now + chord.t);
        gain.gain.linearRampToValueAtTime(0.2, now + chord.t + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + chord.t + chord.d);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(now + chord.t);
        osc.stop(now + chord.t + chord.d);
      });
    });
  } catch (err) {
    console.error('Audio error:', err);
  }
}
