// Web Audio API Synth for retro cyber sounds
let audioCtx = null;
let enabled = true;
const getAudioContext = () => {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioCtx;
};
export const setAudioEnabled = (val) => {
  enabled = val;
};
export const isAudioEnabled = () => enabled;
export const playBeep = (freq = 800, type = "sine", duration = 0.05, vol = 0.1) => {
  if (!enabled) return;
  try {
    const ctx = getAudioContext();
    if (ctx.state === "suspended") {
      ctx.resume();
    }
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = type;
    osc.frequency.setValueAtTime(freq, ctx.currentTime);
    
    gainNode.gain.setValueAtTime(vol, ctx.currentTime);
    // Smooth decay
    gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start();
    osc.stop(ctx.currentTime + duration);
  } catch (e) {
    console.warn("Audio playback failed", e);
  }
};
// Synth chimes for events
export const playSoundEffect = (type) => {
  if (!enabled) return;
  if (type === "click") {
    playBeep(1200, "sine", 0.04, 0.08);
  } else if (type === "typing") {
    playBeep(400 + Math.random() * 600, "sine", 0.025, 0.02);
  } else if (type === "access_granted") {
    playBeep(523.25, "square", 0.12, 0.05); // C5
    setTimeout(() => playBeep(659.25, "square", 0.12, 0.05), 80); // E5
    setTimeout(() => playBeep(783.99, "square", 0.15, 0.05), 160); // G5
    setTimeout(() => playBeep(1046.50, "square", 0.35, 0.07), 240); // C6
  } else if (type === "access_denied") {
    playBeep(220, "sawtooth", 0.18, 0.08); // A3
    setTimeout(() => playBeep(147, "sawtooth", 0.45, 0.12), 150); // D3
  } else if (type === "boot") {
    // Cyber sweep sound
    try {
      const ctx = getAudioContext();
      if (ctx.state === "suspended") ctx.resume();
      const osc = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gainNode = ctx.createGain();
      
      osc.type = "sine";
      osc2.type = "triangle";
      
      osc.frequency.setValueAtTime(100, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1500, ctx.currentTime + 2.0);
      
      osc2.frequency.setValueAtTime(50, ctx.currentTime);
      osc2.frequency.exponentialRampToValueAtTime(750, ctx.currentTime + 2.0);
      
      gainNode.gain.setValueAtTime(0.001, ctx.currentTime);
      gainNode.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.4);
      gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + 2.0);
      
      osc.connect(gainNode);
      osc2.connect(gainNode);
      gainNode.connect(ctx.destination);
      
      osc.start();
      osc2.start();
      osc.stop(ctx.currentTime + 2.0);
      osc2.stop(ctx.currentTime + 2.0);
    } catch (e) {
      console.warn(e);
    }
  } else if (type === "alert") {
    playBeep(440, "sawtooth", 0.25, 0.06);
    setTimeout(() => playBeep(330, "sawtooth", 0.25, 0.06), 250);
  }
};
