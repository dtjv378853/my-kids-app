// Bulletproof Audio Engine with Real Sound Synthesis, Direct Web Audio, and Resilient Voice Reader

let audioCtx: AudioContext | null = null;
let isMuted: boolean = false;

export function getIsMuted(): boolean {
  return isMuted;
}

export function toggleMute(): boolean {
  isMuted = !isMuted;
  if (isMuted) {
    stopSpeaking();
  }
  return isMuted;
}

/**
 * Initializes and unlocks AudioContext reliably on user gestures
 */
export function ensureAudioUnlocked(): AudioContext | null {
  if (typeof window === 'undefined') return null;

  try {
    const AudioCtxClass =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;

    if (!AudioCtxClass) return null;

    if (!audioCtx) {
      audioCtx = new AudioCtxClass();
    }

    if (audioCtx.state === 'suspended') {
      audioCtx.resume();
    }

    return audioCtx;
  } catch (err) {
    console.error('AudioContext init error:', err);
    return null;
  }
}

// Global click/touch listener to auto-unlock audio on any first interaction
if (typeof window !== 'undefined') {
  const unlockEvents = ['click', 'touchstart', 'touchend', 'keydown'];
  const unlocker = () => {
    ensureAudioUnlocked();
    if (window.speechSynthesis && window.speechSynthesis.paused) {
      window.speechSynthesis.resume();
    }
  };
  unlockEvents.forEach((evt) => {
    window.addEventListener(evt, unlocker, { passive: true, once: false });
  });
}

/**
 * 1. Play Cartoon Spring Boing
 */
export function playBoingSound() {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(540, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(320, now + 0.32);

    gain.gain.setValueAtTime(0.4, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 2. Play Slide Whistle Sound
 */
export function playSlideWhistle(direction: 'up' | 'down' = 'up') {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    if (direction === 'up') {
      osc.frequency.setValueAtTime(320, now);
      osc.frequency.exponentialRampToValueAtTime(1100, now + 0.32);
    } else {
      osc.frequency.setValueAtTime(1100, now);
      osc.frequency.exponentialRampToValueAtTime(260, now + 0.32);
    }

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.36);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 3. Play Cheerful Cartoon Pop
 */
export function playPopSound() {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(450, now);
    osc.frequency.exponentialRampToValueAtTime(820, now + 0.05);

    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.09);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 4. Play Cartoon Giggle
 */
export function playCartoonGiggle() {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const freqs = [620, 780, 920, 840, 1020];

    freqs.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const t = now + idx * 0.07;

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, t);

      gain.gain.setValueAtTime(0.25, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.065);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + 0.07);
    });
  } catch (e) {
    console.error(e);
  }
}

/**
 * 5. Play Splat Sound
 */
export function playSplatSound() {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(260, now);
    osc.frequency.exponentialRampToValueAtTime(60, now + 0.14);

    gain.gain.setValueAtTime(0.35, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.16);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.17);
  } catch (e) {
    console.error(e);
  }
}

/**
 * 6. Play Celebration Fanfare Chords
 */
export function playCelebrationSound() {
  if (isMuted) return;
  const ctx = ensureAudioUnlocked();
  if (!ctx) return;

  try {
    const now = ctx.currentTime;
    const notes = [
      { f: 523.25, t: 0.05, d: 0.14 },
      { f: 659.25, t: 0.18, d: 0.14 },
      { f: 783.99, t: 0.31, d: 0.16 },
      { f: 1046.50, t: 0.48, d: 0.5 },
    ];

    notes.forEach((n) => {
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
    });
  } catch (e) {
    console.error(e);
  }
}

export function playFanfareSound() {
  playCelebrationSound();
}

/**
 * Distinct, loud Cartoon Character Syllable Babble
 * Guaranteed to produce clear, expressive sound in every browser via Web Audio API!
 */
export function playCartoonBabble(
  character: 'bondok' | 'basbousa' | 'ammi_felfel' | 'robot',
  syllablesCount: number = 6,
  onEnd?: () => void
) {
  if (isMuted) {
    if (onEnd) onEnd();
    return;
  }

  const ctx = ensureAudioUnlocked();
  if (!ctx) {
    if (onEnd) onEnd();
    return;
  }

  try {
    const now = ctx.currentTime;
    let basePitch = 480;
    let waveType: OscillatorType = 'triangle';

    if (character === 'bondok') {
      basePitch = 500; // energetic rabbit
      waveType = 'triangle';
    } else if (character === 'basbousa') {
      basePitch = 600; // cute smart cat
      waveType = 'sine';
    } else if (character === 'ammi_felfel') {
      basePitch = 240; // jovial shopkeeper
      waveType = 'sawtooth';
    } else if (character === 'robot') {
      basePitch = 340;
      waveType = 'square';
    }

    const count = Math.min(Math.max(syllablesCount, 4), 10);
    const duration = 0.11;

    for (let i = 0; i < count; i++) {
      const t = now + i * (duration * 0.96);
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      const pitchOffset = Math.sin((i / count) * Math.PI) * 140 + (Math.random() * 60 - 30);
      const freq = basePitch + pitchOffset;

      osc.type = waveType;
      osc.frequency.setValueAtTime(freq, t);
      osc.frequency.exponentialRampToValueAtTime(freq * 1.2, t + duration * 0.4);
      osc.frequency.exponentialRampToValueAtTime(freq * 0.95, t + duration);

      gain.gain.setValueAtTime(0.001, t);
      gain.gain.linearRampToValueAtTime(0.28, t + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.001, t + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(t);
      osc.stop(t + duration + 0.02);
    }

    const totalMs = count * duration * 1000;
    setTimeout(() => {
      if (onEnd) onEnd();
    }, totalMs + 40);
  } catch (err) {
    console.error(err);
    if (onEnd) onEnd();
  }
}

export type VoiceMode = 'cartoon_sfx' | 'natural_human';
let activeVoiceMode: VoiceMode = 'cartoon_sfx';

export function getVoiceMode(): VoiceMode {
  return activeVoiceMode;
}

export function setVoiceMode(mode: VoiceMode) {
  activeVoiceMode = mode;
  stopSpeaking();
}

/**
 * Universal Cartoon Voice Player
 */
export function speakCartoonDialogue(
  text: string,
  character: 'bondok' | 'basbousa' | 'ammi_felfel' | 'robot' = 'bondok',
  onEnd?: () => void
) {
  if (isMuted) {
    if (onEnd) onEnd();
    return;
  }

  ensureAudioUnlocked();

  if (activeVoiceMode === 'cartoon_sfx') {
    const wordCount = text.trim().split(/\s+/).length;
    const syllables = Math.min(Math.max(wordCount, 4), 10);
    playCartoonBabble(character, syllables, onEnd);
    return;
  }

  // If in 'natural_human' mode:
  if (typeof window === 'undefined' || !window.speechSynthesis) {
    playCartoonBabble(character, 6, onEnd);
    return;
  }

  try {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const arVoice = voices.find(
      (v) => v.lang.startsWith('ar') || v.lang.includes('EG') || v.lang.includes('SA')
    );

    if (arVoice) {
      utterance.voice = arVoice;
    }
    utterance.lang = 'ar-EG';

    if (character === 'bondok') {
      utterance.pitch = 1.35;
      utterance.rate = 1.1;
    } else if (character === 'basbousa') {
      utterance.pitch = 1.25;
      utterance.rate = 1.0;
    } else if (character === 'ammi_felfel') {
      utterance.pitch = 0.95;
      utterance.rate = 0.95;
    }

    utterance.onend = () => {
      if (onEnd) onEnd();
    };

    utterance.onerror = () => {
      // Fallback to cartoon babble if TTS fails or is blocked
      playCartoonBabble(character, 5, onEnd);
    };

    window.speechSynthesis.speak(utterance);
  } catch (err) {
    console.error(err);
    playCartoonBabble(character, 5, onEnd);
  }
}

export function stopSpeaking() {
  if (typeof window !== 'undefined' && window.speechSynthesis) {
    window.speechSynthesis.cancel();
  }
}
