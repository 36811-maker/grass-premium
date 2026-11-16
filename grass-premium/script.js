/**
 * ============================================================================
 * GRASS PREMIUM — THE MOST EXPENSIVE GRASS IN THE WORLD
 * Full Interactive Engine: 2D Canvas Physics, Weather, Audio, Store & Telemetry
 * Pure Vanilla JavaScript (ES6+) — No External Frameworks
 * ============================================================================
 */

(function () {
  'use strict';

  /* ==========================================================================
     1. DATA DEFINITIONS & CATALOG
     ========================================================================== */

  const GRASS_COLLECTION = [
    {
      id: 'classic-green',
      number: '01',
      name: 'Classic Green',
      price: 'R$ 0,00',
      priceRaw: 0,
      isFree: true,
      badge: 'FREE',
      badgeClass: 'badge-free',
      quote: 'A grama tradicional. Simples, natural e gratuita. Aproveite enquanto pode.',
      specs: {
        density: '3,200/m²',
        springback: '94%',
        rarity: 'Common Pasture',
        prestige: '0 / 10'
      },
      colors: {
        root: '#132617',
        body: '#315D32',
        tip: '#668C49',
        highlight: '#A4BD79'
      },
      particleEffect: null
    },
    {
      id: 'royal-emerald',
      number: '02',
      name: 'Royal Emerald',
      price: 'R$ 499,90',
      priceRaw: 499.90,
      isFree: false,
      badge: 'PREMIUM',
      badgeClass: 'badge-premium',
      quote: 'Porque sua grama merece um tratamento de realeza.',
      specs: {
        density: '4,500/m²',
        springback: '97%',
        rarity: 'Emerald Reserve',
        prestige: '8.5 / 10'
      },
      colors: {
        root: '#081a10',
        body: '#0b4d2c',
        tip: '#129255',
        highlight: '#4ee69b'
      },
      particleEffect: 'emerald'
    },
    {
      id: 'diamond-grass',
      number: '03',
      name: 'Diamond Grass',
      price: 'R$ 599,90',
      priceRaw: 599.90,
      isFree: false,
      badge: 'PREMIUM',
      badgeClass: 'badge-premium',
      quote: 'Mais rara que seu bom senso financeiro.',
      specs: {
        density: '4,800/m²',
        springback: '99%',
        rarity: 'Crystalline Tier',
        prestige: '9.2 / 10'
      },
      colors: {
        root: '#0e222b',
        body: '#1e5b6e',
        tip: '#56b9d6',
        highlight: '#e0f7ff'
      },
      particleEffect: 'diamond'
    },
    {
      id: 'golden-grass',
      number: '04',
      name: 'Golden Grass',
      price: 'R$ 699,90',
      priceRaw: 699.90,
      isFree: false,
      badge: 'PREMIUM',
      badgeClass: 'badge-premium',
      quote: 'Não é ouro. Mas o preço sugere que seja.',
      specs: {
        density: '5,200/m²',
        springback: '98%',
        rarity: '24k Auric',
        prestige: '9.6 / 10'
      },
      colors: {
        root: '#261e08',
        body: '#8C6F2D',
        tip: '#C6A45B',
        highlight: '#FFF3C4'
      },
      particleEffect: 'gold'
    },
    {
      id: 'velvet-grass',
      number: '05',
      name: 'Velvet Grass',
      price: 'R$ 799,90',
      priceRaw: 799.90,
      isFree: false,
      badge: 'PREMIUM',
      badgeClass: 'badge-premium',
      quote: 'Suavidade que seu bolso não sentirá.',
      specs: {
        density: '5,800/m²',
        springback: '99.5%',
        rarity: 'Imperial Velvet',
        prestige: '9.8 / 10'
      },
      colors: {
        root: '#18121f',
        body: '#2d3d32',
        tip: '#5a7865',
        highlight: '#a7c2b0'
      },
      particleEffect: 'velvet'
    },
    {
      id: 'divine-grass',
      number: '06',
      name: 'Divine Grass',
      price: 'R$ 899,90',
      priceRaw: 899.90,
      isFree: false,
      badge: 'MYTHIC',
      badgeClass: 'badge-premium',
      quote: 'Você não compra grama. Você compra status.',
      specs: {
        density: '6,400/m²',
        springback: '100%',
        rarity: 'Celestial Mythic',
        prestige: '10 / 10'
      },
      colors: {
        root: '#190a2a',
        body: '#48206d',
        tip: '#9b4ddb',
        highlight: '#f2dcff'
      },
      particleEffect: 'divine'
    }
  ];

  const ACHIEVEMENTS_DEF = [
    {
      id: 'first_touch',
      title: 'First Touch',
      desc: 'Primeira interação com a grama mais cara do mundo.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2v20M2 12h20" stroke-width="2"/></svg>'
    },
    {
      id: 'grass_addict',
      title: 'Grass Addict',
      desc: '100 toques registrados. Seu terapeuta estaria orgulhoso.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke-width="2"/><path d="M12 6v6l4 2" stroke-width="2"/></svg>'
    },
    {
      id: 'high_roller',
      title: 'Luxury Investor',
      desc: 'Desbloqueou sua primeira variedade de grama premium.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17.5 5.5 28l2-7.5L2 9h7z" stroke-width="2"/></svg>'
    },
    {
      id: 'billionaire_lawn',
      title: 'Billionaire Lawn',
      desc: 'Desbloqueou todas as 6 variedades da coleção.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M6 3h12l4 6-10 12L2 9z" stroke-width="2"/></svg>'
    },
    {
      id: 'wind_master',
      title: 'Wind Controller',
      desc: 'Explorou todos os níveis de vento disponíveis.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2" stroke-width="2"/></svg>'
    },
    {
      id: 'rain_lover',
      title: 'Rain Lover',
      desc: 'Utilizou o modo chuva e apreciou a umidade digital.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M20 16.58A5 5 0 0 0 18 7h-1.26A8 8 0 1 0 4 15.25M8 19v2m8-2v2" stroke-width="2"/></svg>'
    },
    {
      id: 'night_gardener',
      title: 'Night Gardener',
      desc: 'Explorou o santuário de grama sob o luar e vagalumes.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke-width="2"/></svg>'
    },
    {
      id: 'nature_explorer',
      title: 'Nature Explorer',
      desc: 'Descobriu e interagiu com os organismos do jardim.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2a4 4 0 0 0-4 4c0 3 4 8 4 8s4-5 4-8a4 4 0 0 0-4-4z" stroke-width="2"/></svg>'
    },
    {
      id: 'zen_master',
      title: 'Zen Master',
      desc: 'Permaneceu em modo Relaxamento para contemplação pura.',
      icon: '<svg viewBox="0 0 24 24" fill="none"><circle cx="12" cy="12" r="10" stroke-width="2"/><circle cx="12" cy="12" r="4" stroke-width="2"/></svg>'
    }
  ];

  /* ==========================================================================
     2. GLOBAL STATE & PERSISTENCE
     ========================================================================== */

  const STORAGE_KEY = 'grass_premium_vault_v1';

  let state = {
    activeGrassId: 'classic-green',
    unlockedGrassIds: ['classic-green'],
    touchesCount: 0,
    timeOnSiteSeconds: 0,
    windIntensity: 25, // 0 to 100
    windPreset: 'gentle',
    rainActive: false,
    rainIntensity: 'light', // light, medium, heavy
    timeOfDay: 'morning', // sunrise, morning, afternoon, sunset, night
    creaturesEnabled: {
      butterflies: true,
      ladybugs: true,
      flowers: true,
      fireflies: true
    },
    audio: {
      enabled: false,
      masterVolume: 0.7,
      windVol: 0.65,
      birdsVol: 0.5,
      rainVol: 0.7,
      meadowVol: 0.45
    },
    achievements: {},
    testedWindLevels: {},
    windGustsCount: 0,
    rainSessionsCount: 0,
    grassUsageTime: {}
  };

  function loadState() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        state = Object.assign(state, parsed);
        // Ensure classic green is always unlocked
        if (!state.unlockedGrassIds.includes('classic-green')) {
          state.unlockedGrassIds.push('classic-green');
        }
      }
    } catch (e) {
      console.warn('LocalStorage unavailable or corrupt, using memory state:', e);
    }
  }

  function saveState() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) {
      console.warn('Error saving to LocalStorage:', e);
    }
  }

  /* ==========================================================================
     3. PROCEDURAL SOUND SANCTUARY (WEB AUDIO API SYNTHESIZER)
     Zero external MP3 dependencies, 100% offline mathematical acoustics.
     ========================================================================== */

  class SoundSanctuary {
    constructor() {
      this.ctx = null;
      this.isInitialized = false;
      this.masterGain = null;

      // Audio Nodes
      this.windGain = null;
      this.windFilter = null;
      this.rainGain = null;
      this.rainFilter = null;
      this.meadowGain = null;
      this.birdsGain = null;

      this.birdTimer = null;
    }

    init() {
      if (this.isInitialized) return;
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (!AudioCtx) {
        console.warn('Web Audio API not supported by this browser.');
        return;
      }
      this.ctx = new AudioCtx();

      // Master Gain
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(state.audio.enabled ? state.audio.masterVolume : 0, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.initWindSynth();
      this.initRainSynth();
      this.initMeadowSynth();
      this.initBirdScheduler();

      this.isInitialized = true;
    }

    resume() {
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    initWindSynth() {
      // Wind generated with lowpass-filtered pinkish noise
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let b0 = 0, b1 = 0, b2 = 0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        b0 = 0.99886 * b0 + white * 0.0555179;
        b1 = 0.99332 * b1 + white * 0.0750759;
        b2 = 0.96900 * b2 + white * 0.1538520;
        output[i] = (b0 + b1 + b2) * 0.18;
      }

      const whiteNoise = this.ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      this.windFilter = this.ctx.createBiquadFilter();
      this.windFilter.type = 'bandpass';
      this.windFilter.frequency.setValueAtTime(260, this.ctx.currentTime);
      this.windFilter.Q.setValueAtTime(1.8, this.ctx.currentTime);

      this.windGain = this.ctx.createGain();
      this.windGain.gain.setValueAtTime(state.audio.windVol * 0.6, this.ctx.currentTime);

      whiteNoise.connect(this.windFilter);
      this.windFilter.connect(this.windGain);
      this.windGain.connect(this.masterGain);
      whiteNoise.start(0);
    }

    initRainSynth() {
      // Rain generated with filtered noise and micro impulses
      const bufferSize = this.ctx.sampleRate * 2;
      const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        output[i] = (Math.random() * 2 - 1) * 0.3;
      }

      const rainNoise = this.ctx.createBufferSource();
      rainNoise.buffer = noiseBuffer;
      rainNoise.loop = true;

      this.rainFilter = this.ctx.createBiquadFilter();
      this.rainFilter.type = 'highpass';
      this.rainFilter.frequency.setValueAtTime(1200, this.ctx.currentTime);

      this.rainGain = this.ctx.createGain();
      // Set to 0 if rain is inactive
      const vol = state.rainActive ? state.audio.rainVol * 0.5 : 0;
      this.rainGain.gain.setValueAtTime(vol, this.ctx.currentTime);

      rainNoise.connect(this.rainFilter);
      this.rainFilter.connect(this.rainGain);
      this.rainGain.connect(this.masterGain);
      rainNoise.start(0);
    }

    initMeadowSynth() {
      // Gentle cricket/meadow background
      this.meadowGain = this.ctx.createGain();
      this.meadowGain.gain.setValueAtTime(state.audio.meadowVol * 0.35, this.ctx.currentTime);
      this.meadowGain.connect(this.masterGain);

      // Algorithmic high frequency cricket chirps
      const scheduleCricket = () => {
        if (!state.audio.enabled || !this.ctx) {
          setTimeout(scheduleCricket, 1500);
          return;
        }
        if (state.timeOfDay === 'night' || state.timeOfDay === 'sunset') {
          this.triggerCricketChirp();
        }
        setTimeout(scheduleCricket, 400 + Math.random() * 800);
      };
      scheduleCricket();
    }

    triggerCricketChirp() {
      if (!this.ctx || this.ctx.state !== 'running') return;
      try {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(4500 + Math.random() * 600, this.ctx.currentTime);

        g.gain.setValueAtTime(0, this.ctx.currentTime);
        g.gain.linearRampToValueAtTime(0.04 * state.audio.meadowVol, this.ctx.currentTime + 0.02);
        g.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.08);

        osc.connect(g);
        g.connect(this.meadowGain);

        osc.start(this.ctx.currentTime);
        osc.stop(this.ctx.currentTime + 0.09);
      } catch (e) {}
    }

    initBirdScheduler() {
      this.birdsGain = this.ctx.createGain();
      this.birdsGain.gain.setValueAtTime(state.audio.birdsVol * 0.5, this.ctx.currentTime);
      this.birdsGain.connect(this.masterGain);

      const scheduleBirds = () => {
        if (state.audio.enabled && this.ctx && this.ctx.state === 'running') {
          // Birds sing mostly during sunrise, morning, afternoon
          if (state.timeOfDay !== 'night' && !state.rainActive) {
            this.playBirdChirp();
          }
        }
        const delay = 3000 + Math.random() * 6000;
        this.birdTimer = setTimeout(scheduleBirds, delay);
      };
      this.birdTimer = setTimeout(scheduleBirds, 2500);
    }

    playBirdChirp() {
      if (!this.ctx || this.ctx.state !== 'running') return;
      try {
        const osc = this.ctx.createOscillator();
        const g = this.ctx.createGain();
        const now = this.ctx.currentTime;
        const baseFreq = 2200 + Math.random() * 800;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.5, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 0.9, now + 0.16);
        osc.frequency.exponentialRampToValueAtTime(baseFreq * 1.3, now + 0.24);

        g.gain.setValueAtTime(0, now);
        g.gain.linearRampToValueAtTime(0.12 * state.audio.birdsVol, now + 0.04);
        g.gain.exponentialRampToValueAtTime(0.0001, now + 0.28);

        osc.connect(g);
        g.connect(this.birdsGain);

        osc.start(now);
        osc.stop(now + 0.3);
      } catch (e) {}
    }

    updateWindSound(intensity) {
      if (!this.isInitialized || !this.windFilter) return;
      const freq = 150 + (intensity / 100) * 600;
      const q = 1.2 + (intensity / 100) * 2.2;
      this.windFilter.frequency.setTargetAtTime(freq, this.ctx.currentTime, 0.2);
      this.windFilter.Q.setTargetAtTime(q, this.ctx.currentTime, 0.2);
      const gain = (0.2 + (intensity / 100) * 0.8) * state.audio.windVol * 0.6;
      this.windGain.gain.setTargetAtTime(gain, this.ctx.currentTime, 0.2);
    }

    updateRainSound(active, intensity) {
      if (!this.isInitialized || !this.rainGain) return;
      if (!active) {
        this.rainGain.gain.setTargetAtTime(0, this.ctx.currentTime, 0.3);
      } else {
        const mult = intensity === 'light' ? 0.35 : (intensity === 'medium' ? 0.65 : 1.0);
        this.rainGain.gain.setTargetAtTime(mult * state.audio.rainVol * 0.5, this.ctx.currentTime, 0.3);
      }
    }

    setMasterVolume(val) {
      state.audio.masterVolume = val;
      if (this.masterGain && state.audio.enabled) {
        this.masterGain.gain.setTargetAtTime(val, this.ctx.currentTime, 0.1);
      }
    }

    toggleAudio(forceState) {
      this.init();
      this.resume();
      state.audio.enabled = typeof forceState === 'boolean' ? forceState : !state.audio.enabled;
      if (this.masterGain) {
        const target = state.audio.enabled ? state.audio.masterVolume : 0;
        this.masterGain.gain.setTargetAtTime(target, this.ctx.currentTime, 0.1);
      }
      saveState();
      return state.audio.enabled;
    }
  }

  const audioEngine = new SoundSanctuary();

  /* ==========================================================================
     4. GRAND 2D CANVAS SIMULATION ENGINE
     Mathematical multi-layer grass physics, natural oscillation, cursor shear
     ========================================================================== */

  class Blade {
    constructor(x, y, layer, height, baseWidth, restAngle, colors, particleType) {
      this.x = x;
      this.y = y;
      this.layer = layer; // 0: back, 1: mid, 2: foreground
      this.height = height;
      this.baseWidth = baseWidth;
      this.restAngle = restAngle;
      this.currentAngle = restAngle;
      this.targetAngle = restAngle;
      this.angularVelocity = 0;

      // Realistic spring-damper tuning per layer
      this.spring = 0.055 + (layer * 0.015);
      this.damping = 0.90 + (layer * 0.02);

      this.curveBias = (Math.random() - 0.5) * 0.15;
      this.colors = colors;
      this.particleType = particleType;

      // Dew / Rain drops on blade
      this.hasDroplet = Math.random() < 0.25;
      this.dropletPos = 0.5 + Math.random() * 0.45;
    }

    update(windForce, mouseX, mouseY, mouseSpeed, mousePushAngle, mouseHoverRadius) {
      // 1. Wind torque
      const layerWind = windForce * (0.6 + this.layer * 0.25);
      this.targetAngle = this.restAngle + layerWind;

      // 2. Cursor repulsion / flattening physics
      if (mouseX !== null && mouseY !== null) {
        const dx = this.x - mouseX;
        // Tip Y estimate
        const tipY = this.y - this.height * Math.cos(this.currentAngle);
        const dy = (this.y + tipY) * 0.5 - mouseY;
        const dist = Math.hypot(dx, dy);

        if (dist < mouseHoverRadius) {
          const proximity = 1 - (dist / mouseHoverRadius);
          // Push direction away from mouse X
          const pushDirection = dx >= 0 ? 1 : -1;
          const dynamicForce = pushDirection * (proximity * 0.95);
          
          // Cursor velocity shear influence
          const shearInfluence = Math.sin(mousePushAngle) * (mouseSpeed * 0.012) * proximity;
          
          // Compressed grass effect ("Grama amassada"): holds deflection while mouse is near
          this.targetAngle += dynamicForce + shearInfluence;

          // If cursor is very close, add impulse directly to velocity
          if (dist < mouseHoverRadius * 0.5) {
            this.angularVelocity += pushDirection * proximity * 0.04;
          }
        }
      }

      // 3. Damped Harmonic Oscillation (Spring Physics)
      const displacement = this.targetAngle - this.currentAngle;
      const acceleration = displacement * this.spring;
      this.angularVelocity += acceleration;
      this.angularVelocity *= this.damping;
      this.currentAngle += this.angularVelocity;

      // Clamp angle to prevent unnatural flipping
      const MAX_BEND = 1.35;
      if (this.currentAngle > MAX_BEND) this.currentAngle = MAX_BEND;
      if (this.currentAngle < -MAX_BEND) this.currentAngle = -MAX_BEND;
    }

    draw(ctx, isRaining, timeOfDay) {
      const sin = Math.sin(this.currentAngle + this.curveBias);
      const cos = Math.cos(this.currentAngle + this.curveBias);

      // Bézier curve points: Base -> Mid Control -> Tip
      const bx = this.x;
      const by = this.y;

      const halfH = this.height * 0.55;
      const cx = bx + sin * halfH * 0.6;
      const cy = by - cos * halfH;

      const tipX = bx + sin * this.height;
      const tipY = by - cos * this.height;

      // Create vertical color gradient
      const grad = ctx.createLinearGradient(bx, by, tipX, tipY);
      grad.addColorStop(0, this.colors.root);
      grad.addColorStop(0.55, this.colors.body);
      grad.addColorStop(0.9, this.colors.tip);
      grad.addColorStop(1, isRaining ? '#ffffff' : this.colors.highlight);

      // Draw tapered blade with quadratic curve
      const hw = this.baseWidth * 0.5;
      ctx.beginPath();
      ctx.moveTo(bx - hw, by);
      ctx.quadraticCurveTo(cx, cy, tipX, tipY);
      ctx.quadraticCurveTo(cx + hw * 0.3, cy, bx + hw, by);
      ctx.closePath();

      ctx.fillStyle = grad;
      ctx.fill();

      // Rain / Dew drop highlight
      if ((isRaining || timeOfDay === 'sunrise') && this.hasDroplet && this.layer >= 1) {
        const dropX = bx + (tipX - bx) * this.dropletPos;
        const dropY = by + (tipY - by) * this.dropletPos;
        ctx.beginPath();
        ctx.arc(dropX, dropY, 1.6, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
        ctx.fill();
      }

      // Sparkle particles for Diamond and Gold Grass
      if (this.particleType && this.layer === 2 && Math.random() < 0.003) {
        drawGleam(ctx, tipX, tipY, this.particleType);
      }
    }
  }

  function drawGleam(ctx, x, y, type) {
    ctx.save();
    ctx.translate(x, y);
    ctx.beginPath();
    ctx.arc(0, 0, 2.5, 0, Math.PI * 2);
    if (type === 'gold') {
      ctx.fillStyle = '#FFE57F';
      ctx.shadowColor = '#FFD700';
    } else if (type === 'diamond') {
      ctx.fillStyle = '#E0F7FA';
      ctx.shadowColor = '#00E5FF';
    } else if (type === 'emerald') {
      ctx.fillStyle = '#69F0AE';
      ctx.shadowColor = '#00E676';
    } else if (type === 'divine') {
      ctx.fillStyle = '#E1BEE7';
      ctx.shadowColor = '#BA68C8';
    } else {
      ctx.fillStyle = '#FFFFFF';
      ctx.shadowColor = '#FFFFFF';
    }
    ctx.shadowBlur = 8;
    ctx.fill();
    ctx.restore();
  }

  /* ==========================================================================
     5. GARDEN FAUNA & ENCOUNTERS (BUTTERFLIES, LADYBUGS, FIREFLIES)
     ========================================================================== */

  class Butterfly {
    constructor(canvasWidth, canvasHeight) {
      this.w = canvasWidth;
      this.h = canvasHeight;
      this.x = Math.random() * canvasWidth;
      this.y = canvasHeight * 0.5 + Math.random() * (canvasHeight * 0.3);
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.2;
      this.wingAngle = 0;
      this.wingSpeed = 0.22 + Math.random() * 0.1;
      this.size = 10 + Math.random() * 6;
      this.hue = Math.random() < 0.5 ? 42 : 140; // Gold or Emerald butterfly
    }

    update(mouseX, mouseY, windX) {
      // Gentle flutter curve
      this.wingAngle += this.wingSpeed;
      this.x += this.vx + windX * 0.4;
      this.y += this.vy + Math.sin(this.wingAngle * 0.7) * 0.8;

      // Mouse proximity evasion
      if (mouseX !== null && mouseY !== null) {
        const dx = this.x - mouseX;
        const dy = this.y - mouseY;
        const dist = Math.hypot(dx, dy);
        if (dist < 100) {
          this.vx += (dx / dist) * 1.2;
          this.vy += (dy / dist) * 1.2;
          this.wingSpeed = 0.45; // Rapid flapping
        } else {
          this.wingSpeed = 0.22;
        }
      }

      // Drag
      this.vx *= 0.98;
      this.vy *= 0.98;

      // Screen loop bounds
      if (this.x < -40) this.x = this.w + 40;
      if (this.x > this.w + 40) this.x = -40;
      if (this.y < this.h * 0.2) this.vy += 0.2;
      if (this.y > this.h - 60) this.vy -= 0.3;
    }

    draw(ctx) {
      ctx.save();
      ctx.translate(this.x, this.y);
      const flap = Math.abs(Math.sin(this.wingAngle));

      ctx.fillStyle = `hsla(${this.hue}, 80%, 65%, 0.9)`;
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 0.8;

      // Left Wing
      ctx.save();
      ctx.scale(flap, 1);
      ctx.beginPath();
      ctx.ellipse(-this.size * 0.6, 0, this.size * 0.7, this.size * 0.4, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Right Wing
      ctx.save();
      ctx.scale(-flap, 1);
      ctx.beginPath();
      ctx.ellipse(-this.size * 0.6, 0, this.size * 0.7, this.size * 0.4, -0.2, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
      ctx.restore();

      // Body
      ctx.fillStyle = '#101610';
      ctx.beginPath();
      ctx.ellipse(0, 0, 2, this.size * 0.4, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class Firefly {
    constructor(canvasWidth, canvasHeight) {
      this.w = canvasWidth;
      this.h = canvasHeight;
      this.x = Math.random() * canvasWidth;
      this.y = canvasHeight * 0.45 + Math.random() * (canvasHeight * 0.45);
      this.vx = (Math.random() - 0.5) * 0.5;
      this.vy = (Math.random() - 0.5) * 0.4;
      this.pulse = Math.random() * Math.PI * 2;
      this.pulseSpeed = 0.03 + Math.random() * 0.04;
      this.radius = 2.5 + Math.random() * 1.5;
    }

    update(windX) {
      this.pulse += this.pulseSpeed;
      this.x += this.vx + windX * 0.2;
      this.y += this.vy + Math.sin(this.pulse) * 0.3;

      if (this.x < 0) this.x = this.w;
      if (this.x > this.w) this.x = 0;
      if (this.y < this.h * 0.3) this.vy += 0.1;
      if (this.y > this.h - 40) this.vy -= 0.1;
    }

    draw(ctx) {
      const alpha = 0.3 + 0.65 * (0.5 + 0.5 * Math.sin(this.pulse));
      ctx.save();
      ctx.translate(this.x, this.y);

      // Glow halo
      const glow = ctx.createRadialGradient(0, 0, 0, 0, 0, this.radius * 4.5);
      glow.addColorStop(0, `rgba(196, 229, 138, ${alpha * 0.9})`);
      glow.addColorStop(0.5, `rgba(164, 189, 121, ${alpha * 0.35})`);
      glow.addColorStop(1, 'rgba(49, 93, 50, 0)');

      ctx.fillStyle = glow;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius * 4.5, 0, Math.PI * 2);
      ctx.fill();

      // Core
      ctx.fillStyle = `rgba(255, 255, 230, ${alpha})`;
      ctx.beginPath();
      ctx.arc(0, 0, this.radius, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    }
  }

  class RainDrop {
    constructor(canvasWidth, canvasHeight) {
      this.w = canvasWidth;
      this.h = canvasHeight;
      this.reset();
      this.y = Math.random() * canvasHeight;
    }

    reset() {
      this.x = Math.random() * (this.w + 200) - 100;
      this.y = -20;
      this.length = 18 + Math.random() * 16;
      this.speed = 14 + Math.random() * 12;
      this.alpha = 0.25 + Math.random() * 0.45;
    }

    update(windShear) {
      this.x += windShear * 1.5;
      this.y += this.speed;

      if (this.y > this.h) {
        this.reset();
      }
    }

    draw(ctx, windShear) {
      ctx.beginPath();
      ctx.moveTo(this.x, this.y);
      ctx.lineTo(this.x + windShear * 1.2, this.y + this.length);
      ctx.strokeStyle = `rgba(180, 215, 245, ${this.alpha})`;
      ctx.lineWidth = 1.2;
      ctx.stroke();
    }
  }

  /* ==========================================================================
     6. MAIN SIMULATOR CLASS
     ========================================================================== */

  class GrassSimulator {
    constructor(canvasId) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) return;
      this.ctx = this.canvas.getContext('2d');

      this.blades = [];
      this.butterflies = [];
      this.fireflies = [];
      this.rainDrops = [];

      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);

      // Cursor telemetry
      this.mouse = {
        x: null,
        y: null,
        prevX: null,
        prevY: null,
        vx: 0,
        vy: 0,
        speed: 0,
        angle: 0,
        isHovering: false,
        lastActiveTime: Date.now()
      };

      this.windTime = 0;
      this.firstInteractionTriggered = false;

      this.init();
    }

    init() {
      this.resize();
      this.buildBlades();
      this.buildCreatures();
      this.bindEvents();
      this.startLoop();
    }

    resize() {
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = this.width * this.dpr;
      this.canvas.height = this.height * this.dpr;
      this.ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);

      // Rebuild blades if size changes substantially
      if (this.blades.length === 0 || Math.abs(this.blades.length - this.getOptimalBladeCount()) > 300) {
        this.buildBlades();
      }
    }

    getOptimalBladeCount() {
      // Calculate responsive blade count based on screen width
      const width = this.width;
      let count = Math.floor(width * 2.2);
      if (width < 768) {
        count = Math.floor(width * 1.4); // Mobile performance optimization
      }
      return Math.min(Math.max(count, 1200), 4500);
    }

    buildBlades() {
      this.blades = [];
      const count = this.getOptimalBladeCount();
      const grassDef = GRASS_COLLECTION.find(g => g.id === state.activeGrassId) || GRASS_COLLECTION[0];

      // Multi-layer grass distribution
      for (let i = 0; i < count; i++) {
        // Position across screen with natural clustering
        const x = Math.random() * (this.width + 80) - 40;
        const layer = Math.random() < 0.3 ? 0 : (Math.random() < 0.65 ? 1 : 2);

        // Ground anchor baseline with slight depth variation
        const baseY = this.height + 15 - (layer * 8) + (Math.random() * 20 - 10);

        // Height variation
        let bladeH = 140 + Math.random() * 120;
        if (layer === 0) bladeH *= 0.68;
        if (layer === 1) bladeH *= 0.88;
        if (layer === 2) bladeH *= 1.15;

        // Base width
        const baseWidth = (2.2 + layer * 1.4) + Math.random() * 1.2;
        const restAngle = (Math.random() - 0.5) * 0.35;

        this.blades.push(new Blade(
          x,
          baseY,
          layer,
          bladeH,
          baseWidth,
          restAngle,
          grassDef.colors,
          grassDef.particleEffect
        ));
      }

      // Sort back-to-front so foreground renders on top
      this.blades.sort((a, b) => a.layer - b.layer || a.y - b.y);
    }

    buildCreatures() {
      this.butterflies = [
        new Butterfly(this.width, this.height),
        new Butterfly(this.width, this.height),
        new Butterfly(this.width, this.height)
      ];

      this.fireflies = [];
      for (let i = 0; i < 24; i++) {
        this.fireflies.push(new Firefly(this.width, this.height));
      }

      this.rainDrops = [];
      for (let i = 0; i < 160; i++) {
        this.rainDrops.push(new RainDrop(this.width, this.height));
      }
    }

    updateGrassVariety(varietyId) {
      const def = GRASS_COLLECTION.find(g => g.id === varietyId);
      if (!def) return;
      state.activeGrassId = varietyId;
      saveState();

      // Smoothly update colors & particles of existing blades
      this.blades.forEach(blade => {
        blade.colors = def.colors;
        blade.particleType = def.particleEffect;
      });
    }

    bindEvents() {
      window.addEventListener('resize', () => this.resize(), { passive: true });

      const handlePointerMove = (clientX, clientY) => {
        if (!this.firstInteractionTriggered) {
          this.firstInteractionTriggered = true;
          triggerFirstTouch();
        }

        if (this.mouse.prevX !== null && this.mouse.prevY !== null) {
          this.mouse.vx = clientX - this.mouse.prevX;
          this.mouse.vy = clientY - this.mouse.prevY;
          this.mouse.speed = Math.hypot(this.mouse.vx, this.mouse.vy);
          this.mouse.angle = Math.atan2(this.mouse.vy, this.mouse.vx);
        }

        this.mouse.prevX = this.mouse.x;
        this.mouse.prevY = this.mouse.y;
        this.mouse.x = clientX;
        this.mouse.y = clientY;
        this.mouse.isHovering = true;
        this.mouse.lastActiveTime = Date.now();

        // Register touch interaction
        registerTouch();
      };

      // Mouse events
      window.addEventListener('mousemove', (e) => {
        handlePointerMove(e.clientX, e.clientY);
      }, { passive: true });

      window.addEventListener('mouseleave', () => {
        this.mouse.x = null;
        this.mouse.y = null;
        this.mouse.isHovering = false;
      });

      // Touch events (Mobile & Tablet)
      window.addEventListener('touchmove', (e) => {
        if (e.touches.length > 0) {
          const t = e.touches[0];
          handlePointerMove(t.clientX, t.clientY);
        }
      }, { passive: true });

      window.addEventListener('touchend', () => {
        this.mouse.x = null;
        this.mouse.y = null;
        this.mouse.isHovering = false;
      }, { passive: true });
    }

    startLoop() {
      let lastTime = performance.now();

      const animate = (currentTime) => {
        const dt = (currentTime - lastTime) * 0.001;
        lastTime = currentTime;

        this.render(dt);
        requestAnimationFrame(animate);
      };

      requestAnimationFrame(animate);
    }

    render(dt) {
      this.ctx.clearRect(0, 0, this.width, this.height);

      // Wind simulation calculations
      const windSpeedMult = (state.windIntensity / 100) * 1.8 + 0.15;
      this.windTime += dt * windSpeedMult;

      // Base wind wave + periodic gust surge
      const baseWave = Math.sin(this.windTime * 1.5) * 0.18 + Math.cos(this.windTime * 0.6) * 0.08;
      const gust = Math.max(0, Math.sin(this.windTime * 0.25) - 0.45) * 0.35;
      const totalWindForce = (baseWave + gust) * (state.windIntensity / 100);

      // Draw subtle ground gradient base
      const groundGrad = this.ctx.createLinearGradient(0, this.height - 40, 0, this.height);
      groundGrad.addColorStop(0, 'transparent');
      groundGrad.addColorStop(1, 'rgba(10, 16, 11, 0.95)');
      this.ctx.fillStyle = groundGrad;
      this.ctx.fillRect(0, this.height - 40, this.width, 40);

      // Update & Draw Grass Blades
      const hoverRadius = 135;
      for (let i = 0; i < this.blades.length; i++) {
        const blade = this.blades[i];
        blade.update(
          totalWindForce,
          this.mouse.x,
          this.mouse.y,
          this.mouse.speed,
          this.mouse.angle,
          hoverRadius
        );
        blade.draw(this.ctx, state.rainActive, state.timeOfDay);
      }

      // Draw Rain if active
      if (state.rainActive) {
        const windShear = totalWindForce * 18;
        const dropLimit = state.rainIntensity === 'light' ? 50 : (state.rainIntensity === 'medium' ? 100 : 160);
        for (let i = 0; i < dropLimit; i++) {
          const drop = this.rainDrops[i];
          drop.update(windShear);
          drop.draw(this.ctx, windShear);
        }
      }

      // Draw Fauna (Butterflies, Ladybugs, Fireflies)
      if (state.creaturesEnabled.butterflies && state.timeOfDay !== 'night' && !state.rainActive) {
        this.butterflies.forEach(b => {
          b.update(this.mouse.x, this.mouse.y, totalWindForce * 5);
          b.draw(this.ctx);
        });
      }

      if (state.creaturesEnabled.fireflies && (state.timeOfDay === 'night' || state.timeOfDay === 'sunset')) {
        this.fireflies.forEach(f => {
          f.update(totalWindForce * 3);
          f.draw(this.ctx);
        });
      }

      // Inertial decay for cursor
      this.mouse.vx *= 0.9;
      this.mouse.vy *= 0.9;
      this.mouse.speed *= 0.9;
    }
  }

  /* ==========================================================================
     7. STORE MINI-CANVAS PREVIEWS
     Live micro-physics preview for every card in the collection
     ========================================================================== */

  function initCardPreviews() {
    const previewCanvases = document.querySelectorAll('.preview-canvas');
    previewCanvases.forEach(canvas => {
      const grassId = canvas.getAttribute('data-grass-id');
      const grassDef = GRASS_COLLECTION.find(g => g.id === grassId);
      if (!grassDef) return;

      const ctx = canvas.getContext('2d');
      const w = (canvas.width = canvas.clientWidth * 2);
      const h = (canvas.height = canvas.clientHeight * 2);
      ctx.setTransform(2, 0, 0, 2, 0, 0);

      const blades = [];
      const numBlades = 90;
      for (let i = 0; i < numBlades; i++) {
        const x = (i / numBlades) * (w / 2) + (Math.random() * 8 - 4);
        const y = h / 2 + 5;
        const layer = Math.random() < 0.5 ? 1 : 2;
        const bH = 65 + Math.random() * 35;
        const bW = 2.4 + Math.random() * 1.5;
        const rest = (Math.random() - 0.5) * 0.3;
        blades.push(new Blade(x, y, layer, bH, bW, rest, grassDef.colors, grassDef.particleEffect));
      }

      let time = Math.random() * 10;
      let mouseX = null;

      canvas.addEventListener('mousemove', (e) => {
        const rect = canvas.getBoundingClientRect();
        mouseX = e.clientX - rect.left;
      });
      canvas.addEventListener('mouseleave', () => { mouseX = null; });

      function loop() {
        ctx.clearRect(0, 0, w / 2, h / 2);
        time += 0.025;
        const wind = Math.sin(time) * 0.12;

        blades.forEach(b => {
          b.update(wind, mouseX, h / 2 - 20, 10, 0, 45);
          b.draw(ctx, false, 'morning');
        });
        requestAnimationFrame(loop);
      }
      requestAnimationFrame(loop);
    });
  }

  /* ==========================================================================
     8. TELEMETRY, STATS & ACHIEVEMENTS SYSTEM
     ========================================================================== */

  let simulator = null;
  let touchThrottle = false;

  function registerTouch() {
    state.touchesCount++;
    const hudTouches = document.getElementById('hud-touches-count');
    const statTouches = document.getElementById('stat-touches');
    if (hudTouches) hudTouches.textContent = state.touchesCount.toLocaleString('pt-BR');
    if (statTouches) statTouches.textContent = state.touchesCount.toLocaleString('pt-BR');

    // Achievement Checks
    if (state.touchesCount >= 1) unlockAchievement('first_touch');
    if (state.touchesCount >= 100) unlockAchievement('grass_addict');

    // Track usage time for current grass
    if (!state.grassUsageTime[state.activeGrassId]) {
      state.grassUsageTime[state.activeGrassId] = 0;
    }
    state.grassUsageTime[state.activeGrassId]++;

    // Save periodically
    if (!touchThrottle) {
      touchThrottle = true;
      setTimeout(() => {
        saveState();
        updateStatsView();
        touchThrottle = false;
      }, 1000);
    }
  }

  function triggerFirstTouch() {
    const hint = document.getElementById('cursor-hint');
    if (hint) {
      hint.classList.add('faded');
    }
    unlockAchievement('first_touch');
  }

  function unlockAchievement(id) {
    if (state.achievements[id]) return; // already unlocked
    const def = ACHIEVEMENTS_DEF.find(a => a.id === id);
    if (!def) return;

    state.achievements[id] = Date.now();
    saveState();
    showToast(def.title, def.desc, def.icon);
    renderAchievementsGrid();
    updateStatsView();
  }

  function showToast(title, desc, iconSvg) {
    const container = document.getElementById('toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `
      <div class="toast-icon">${iconSvg || '<svg viewBox="0 0 24 24" fill="none"><path d="M12 2l3 7h7l-5.5 4.5 2 7.5L12 17.5 5.5 28l2-7.5L2 9h7z" stroke-width="2"/></svg>'}</div>
      <div>
        <div class="toast-title">Honor Desbloqueado: ${title}</div>
        <div class="toast-desc">${desc}</div>
      </div>
    `;

    container.appendChild(toast);
    // Trigger transition
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 400);
    }, 4500);
  }

  function updateStatsView() {
    const statTime = document.getElementById('stat-time');
    const statUnlocked = document.getElementById('stat-unlocked');
    const statFavorite = document.getElementById('stat-favorite');
    const statWindCount = document.getElementById('stat-wind-count');
    const statRainCount = document.getElementById('stat-rain-count');

    if (statTime) {
      const mins = Math.floor(state.timeOnSiteSeconds / 60);
      const secs = state.timeOnSiteSeconds % 60;
      statTime.textContent = `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }

    if (statUnlocked) {
      statUnlocked.textContent = `${state.unlockedGrassIds.length} / ${GRASS_COLLECTION.length}`;
    }

    if (statFavorite) {
      let favId = state.activeGrassId;
      let maxTime = -1;
      for (const [id, count] of Object.entries(state.grassUsageTime)) {
        if (count > maxTime) {
          maxTime = count;
          favId = id;
        }
      }
      const favGrass = GRASS_COLLECTION.find(g => g.id === favId);
      statFavorite.textContent = favGrass ? favGrass.name.split(' ')[0] : 'Classic';
    }

    if (statWindCount) statWindCount.textContent = state.windGustsCount;
    if (statRainCount) statRainCount.textContent = state.rainSessionsCount;
  }

  function renderAchievementsGrid() {
    const grid = document.getElementById('achievements-grid');
    if (!grid) return;
    grid.innerHTML = '';

    ACHIEVEMENTS_DEF.forEach(ach => {
      const isUnlocked = !!state.achievements[ach.id];
      const card = document.createElement('div');
      card.className = `achievement-card ${isUnlocked ? 'unlocked' : ''}`;
      card.innerHTML = `
        <div class="achievement-icon">${ach.icon}</div>
        <div>
          <div class="achievement-title">${ach.title}</div>
          <div class="achievement-desc">${isUnlocked ? ach.desc : 'Requisito bloqueado. Interaja com o gramado para revelar.'}</div>
        </div>
      `;
      grid.appendChild(card);
    });
  }

  /* ==========================================================================
     9. STORE / CATALOG RENDERING & SIMULATED PURCHASE MODAL
     ========================================================================== */

  let pendingUnlockGrass = null;

  function renderCollection() {
    const grid = document.getElementById('collection-grid');
    if (!grid) return;
    grid.innerHTML = '';

    GRASS_COLLECTION.forEach(grass => {
      const isUnlocked = state.unlockedGrassIds.includes(grass.id);
      const isActive = state.activeGrassId === grass.id;

      let actionBtnHtml = '';
      if (isActive) {
        actionBtnHtml = `<button class="btn-card-action btn-card-active" disabled>Em Uso no Gramado</button>`;
      } else if (isUnlocked) {
        actionBtnHtml = `<button class="btn-card-action btn-card-equip" data-equip="${grass.id}">Selecionar Grama</button>`;
      } else {
        actionBtnHtml = `<button class="btn-card-action btn-card-unlock" data-unlock="${grass.id}">Desbloquear (${grass.price})</button>`;
      }

      const card = document.createElement('div');
      card.className = `grass-card ${isActive ? 'active-equipped' : ''}`;
      card.innerHTML = `
        <div class="card-header-row">
          <span class="card-num">${grass.number}</span>
          <span class="card-badge ${isActive ? 'badge-active' : grass.badgeClass}">
            ${isActive ? 'EQUIPPED' : grass.badge}
          </span>
        </div>

        <div class="card-preview-wrap">
          <canvas class="preview-canvas" data-grass-id="${grass.id}"></canvas>
          <span class="preview-interactive-badge">Touch to preview</span>
        </div>

        <h3 class="card-name">${grass.name}</h3>
        <div class="card-price">${grass.price}</div>
        <p class="card-desc">"${grass.quote}"</p>

        <div class="card-specs">
          <div class="spec-item">
            <span class="spec-name">Densidade</span>
            <span class="spec-val">${grass.specs.density}</span>
          </div>
          <div class="spec-item">
            <span class="spec-name">Elasticidade</span>
            <span class="spec-val">${grass.specs.springback}</span>
          </div>
          <div class="spec-item">
            <span class="spec-name">Raridade</span>
            <span class="spec-val">${grass.specs.rarity}</span>
          </div>
          <div class="spec-item">
            <span class="spec-name">Prestígio</span>
            <span class="spec-val">${grass.specs.prestige}</span>
          </div>
        </div>

        ${actionBtnHtml}
      `;

      grid.appendChild(card);
    });

    // Attach listeners
    grid.querySelectorAll('[data-equip]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-equip');
        equipGrass(id);
      });
    });

    grid.querySelectorAll('[data-unlock]').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const id = e.currentTarget.getAttribute('data-unlock');
        openUnlockModal(id);
      });
    });

    initCardPreviews();
  }

  function equipGrass(id) {
    const grass = GRASS_COLLECTION.find(g => g.id === id);
    if (!grass) return;

    state.activeGrassId = id;
    saveState();

    if (simulator) {
      simulator.updateGrassVariety(id);
    }

    updateHeaderGrassBadge();
    renderCollection();

    showToast(
      'Grama Selecionada',
      `${grass.name} agora floresce em seu gramado executivo.`,
      '<svg viewBox="0 0 24 24" fill="none"><path d="M12 22C12 14 7 7 19 2C10 8 13 15 12 22Z" stroke-width="2"/></svg>'
    );
  }

  function openUnlockModal(id) {
    const grass = GRASS_COLLECTION.find(g => g.id === id);
    if (!grass) return;
    pendingUnlockGrass = grass;

    const modal = document.getElementById('purchase-modal');
    const title = document.getElementById('modal-grass-title');
    const summaryName = document.getElementById('modal-summary-name');
    const summaryPrice = document.getElementById('modal-summary-price');
    const ironyText = document.getElementById('modal-irony-text');

    if (title) title.textContent = `Desbloquear ${grass.name}`;
    if (summaryName) summaryName.textContent = grass.name;
    if (summaryPrice) summaryPrice.textContent = grass.price;
    if (ironyText) {
      ironyText.innerHTML = `
        "${grass.quote}"<br>
        <span style="font-size: 0.78rem; opacity: 0.85; display: block; margin-top: 0.6rem; color: var(--color-gold);">
          [Demonstração de Luxo Digital: Nenhum dado financeiro será requisitado. O valor de ${grass.price} é uma sátira à exclusividade desnecessária.]
        </span>
      `;
    }

    modal.classList.add('open');
    modal.setAttribute('aria-hidden', 'false');
  }

  function closeUnlockModal() {
    const modal = document.getElementById('purchase-modal');
    modal.classList.remove('open');
    modal.setAttribute('aria-hidden', 'true');
    pendingUnlockGrass = null;
  }

  function confirmUnlockModal() {
    if (!pendingUnlockGrass) return;
    const grass = pendingUnlockGrass;

    if (!state.unlockedGrassIds.includes(grass.id)) {
      state.unlockedGrassIds.push(grass.id);
    }
    saveState();

    closeUnlockModal();
    equipGrass(grass.id);

    // Achievements
    unlockAchievement('high_roller');
    if (state.unlockedGrassIds.length === GRASS_COLLECTION.length) {
      unlockAchievement('billionaire_lawn');
    }

    renderCollection();
    updateStatsView();
  }

  function updateHeaderGrassBadge() {
    const grass = GRASS_COLLECTION.find(g => g.id === state.activeGrassId) || GRASS_COLLECTION[0];
    const headerName = document.getElementById('header-grass-name');
    const hudName = document.getElementById('hud-grass-name');
    const hudBadge = document.getElementById('hud-grass-badge');

    if (headerName) headerName.textContent = grass.name;
    if (hudName) hudName.textContent = grass.name;
    if (hudBadge) {
      hudBadge.textContent = grass.isFree ? 'Free Experience' : 'Premium Member';
    }
  }

  /* ==========================================================================
     10. ATMOSPHERIC, WIND & WEATHER CONTROLS
     ========================================================================== */

  function setWindIntensity(val) {
    const num = parseInt(val, 10);
    state.windIntensity = num;

    // Track tested wind level presets
    if (num === 0) state.testedWindLevels['0'] = true;
    if (num === 25) state.testedWindLevels['25'] = true;
    if (num === 50) state.testedWindLevels['50'] = true;
    if (num === 75) state.testedWindLevels['75'] = true;
    if (num === 100) state.testedWindLevels['100'] = true;

    if (Object.keys(state.testedWindLevels).length >= 5) {
      unlockAchievement('wind_master');
    }

    state.windGustsCount++;
    saveState();

    // UI Updates
    const dockSlider = document.getElementById('dock-wind-slider');
    const expSlider = document.getElementById('exp-wind-slider');
    const valText = document.getElementById('wind-slider-value');
    const hudWind = document.getElementById('hud-wind-status');

    if (dockSlider) dockSlider.value = num;
    if (expSlider) expSlider.value = num;
    if (valText) valText.textContent = `${num}%`;

    let label = 'Gentle';
    if (num === 0) label = 'Calm';
    else if (num <= 30) label = 'Gentle';
    else if (num <= 60) label = 'Natural';
    else if (num <= 85) label = 'Strong';
    else label = 'Storm';

    if (hudWind) hudWind.textContent = `${label} (${num}%)`;

    // Audio update
    audioEngine.updateWindSound(num);

    // Sync preset buttons
    document.querySelectorAll('[data-wind]').forEach(btn => {
      const p = parseInt(btn.getAttribute('data-wind'), 10);
      btn.classList.toggle('active', p === num);
    });

    updateStatsView();
  }

  function setTimeOfDay(timeKey) {
    state.timeOfDay = timeKey;
    saveState();

    const overlay = document.getElementById('atmosphere-overlay');
    if (overlay) {
      overlay.setAttribute('data-time', timeKey);
    }

    // Sync pills and buttons
    document.querySelectorAll('.time-pill, #exp-time-buttons .btn-preset').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-time') === timeKey);
    });

    if (timeKey === 'night') {
      unlockAchievement('night_gardener');
    }
  }

  function setRainMode(active, intensity) {
    state.rainActive = active;
    if (intensity) state.rainIntensity = intensity;

    if (active) {
      state.rainSessionsCount++;
      unlockAchievement('rain_lover');
    }
    saveState();

    const rainFilter = document.getElementById('rain-atmosphere-filter');
    const dockToggle = document.getElementById('dock-rain-toggle');
    const expToggle = document.getElementById('exp-rain-toggle');
    const expStatus = document.getElementById('exp-rain-status');

    if (rainFilter) rainFilter.classList.toggle('active', active);
    if (dockToggle) dockToggle.classList.toggle('active', active);
    if (expToggle) expToggle.classList.toggle('active', active);
    if (expStatus) expStatus.textContent = active ? `Rain: ${state.rainIntensity.toUpperCase()}` : 'Rain: Inactive';

    document.querySelectorAll('#rain-intensity-presets .btn-preset').forEach(btn => {
      btn.classList.toggle('active', btn.getAttribute('data-rain') === state.rainIntensity);
    });

    audioEngine.updateRainSound(active, state.rainIntensity);
    updateStatsView();
  }

  /* ==========================================================================
     11. RELAX MODE (FULLSCREEN ZEN) & VIEW TOGGLES
     ========================================================================== */

  let relaxTimer = null;

  function toggleRelaxMode(forceState) {
    const isRelax = typeof forceState === 'boolean' ? forceState : !document.body.classList.contains('relax-mode');
    document.body.classList.toggle('relax-mode', isRelax);

    const hudBtn = document.getElementById('hud-relax-btn');
    const quickBtn = document.getElementById('quick-relax-btn');
    if (hudBtn) hudBtn.classList.toggle('active', isRelax);
    if (quickBtn) quickBtn.classList.toggle('active', isRelax);

    if (isRelax) {
      // Start 60 second timer for Zen Master achievement
      relaxTimer = setTimeout(() => {
        if (document.body.classList.contains('relax-mode')) {
          unlockAchievement('zen_master');
        }
      }, 60000);
    } else {
      clearTimeout(relaxTimer);
    }
  }

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      if (document.exitFullscreen) document.exitFullscreen();
    }
  }

  /* ==========================================================================
     12. DOM BINDINGS & EVENT HOOKS
     ========================================================================== */

  function setupEventListeners() {
    // Mobile menu toggle
    const mobileBtn = document.getElementById('mobile-nav-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileBtn && navMenu) {
      mobileBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
      navMenu.querySelectorAll('a').forEach(a => {
        a.addEventListener('click', () => navMenu.classList.remove('open'));
      });
    }

    // Header scroll background styling
    window.addEventListener('scroll', () => {
      const header = document.getElementById('site-header');
      if (header) {
        header.classList.toggle('scrolled', window.scrollY > 40);
      }
    }, { passive: true });

    // Audio Toggles
    const quickAudioBtn = document.getElementById('quick-audio-btn');
    const dockSoundToggle = document.getElementById('dock-sound-toggle');
    const masterSoundToggle = document.getElementById('master-sound-toggle');
    const dockSoundLabel = document.getElementById('dock-sound-label');

    const updateAudioUI = (enabled) => {
      if (quickAudioBtn) quickAudioBtn.classList.toggle('active', enabled);
      if (dockSoundToggle) dockSoundToggle.classList.toggle('active', enabled);
      if (dockSoundLabel) dockSoundLabel.textContent = enabled ? 'Audio: On' : 'Audio: Off';
      if (masterSoundToggle) {
        masterSoundToggle.innerHTML = enabled ? '<span>Sound Sanctuary: Active</span>' : '<span>Sound Sanctuary: Off</span>';
        masterSoundToggle.classList.toggle('active', enabled);
      }
    };

    const handleAudioToggle = () => {
      const enabled = audioEngine.toggleAudio();
      updateAudioUI(enabled);
    };

    if (quickAudioBtn) quickAudioBtn.addEventListener('click', handleAudioToggle);
    if (dockSoundToggle) dockSoundToggle.addEventListener('click', handleAudioToggle);
    if (masterSoundToggle) masterSoundToggle.addEventListener('click', handleAudioToggle);

    // Audio Volume Sliders
    const setupVolume = (id, prop) => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', (e) => {
          const val = e.target.value / 100;
          state.audio[prop] = val;
          saveState();
          if (audioEngine.isInitialized) {
            if (prop === 'windVol') audioEngine.updateWindSound(state.windIntensity);
            if (prop === 'rainVol') audioEngine.updateRainSound(state.rainActive, state.rainIntensity);
          }
        });
      }
    };
    setupVolume('vol-wind', 'windVol');
    setupVolume('vol-birds', 'birdsVol');
    setupVolume('vol-rain', 'rainVol');
    setupVolume('vol-meadow', 'meadowVol');

    // Wind sliders
    const dockWindSlider = document.getElementById('dock-wind-slider');
    const expWindSlider = document.getElementById('exp-wind-slider');
    if (dockWindSlider) {
      dockWindSlider.addEventListener('input', (e) => setWindIntensity(e.target.value));
    }
    if (expWindSlider) {
      expWindSlider.addEventListener('input', (e) => setWindIntensity(e.target.value));
    }

    // Wind presets
    document.querySelectorAll('[data-wind]').forEach(btn => {
      btn.addEventListener('click', () => {
        setWindIntensity(btn.getAttribute('data-wind'));
      });
    });

    // Time of day buttons
    document.querySelectorAll('.time-pill, #exp-time-buttons .btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        setTimeOfDay(btn.getAttribute('data-time'));
      });
    });

    // Rain buttons
    const dockRainToggle = document.getElementById('dock-rain-toggle');
    const expRainToggle = document.getElementById('exp-rain-toggle');
    if (dockRainToggle) {
      dockRainToggle.addEventListener('click', () => setRainMode(!state.rainActive));
    }
    if (expRainToggle) {
      expRainToggle.addEventListener('click', () => setRainMode(!state.rainActive));
    }

    document.querySelectorAll('#rain-intensity-presets .btn-preset').forEach(btn => {
      btn.addEventListener('click', () => {
        setRainMode(true, btn.getAttribute('data-rain'));
      });
    });

    // Creatures toggle cards
    document.querySelectorAll('.creature-card-toggle').forEach(card => {
      card.addEventListener('click', () => {
        const type = card.getAttribute('data-creature');
        state.creaturesEnabled[type] = !state.creaturesEnabled[type];
        card.classList.toggle('enabled', state.creaturesEnabled[type]);
        const statusSpan = card.querySelector('.creature-status');
        if (statusSpan) {
          statusSpan.textContent = state.creaturesEnabled[type] ? 'Active' : 'Dormant';
        }
        saveState();
        unlockAchievement('nature_explorer');
      });
    });

    // Relax mode toggles
    const hudRelaxBtn = document.getElementById('hud-relax-btn');
    const quickRelaxBtn = document.getElementById('quick-relax-btn');
    const relaxExitBtn = document.getElementById('relax-exit-btn');

    if (hudRelaxBtn) hudRelaxBtn.addEventListener('click', () => toggleRelaxMode(true));
    if (quickRelaxBtn) quickRelaxBtn.addEventListener('click', () => toggleRelaxMode(true));
    if (relaxExitBtn) relaxExitBtn.addEventListener('click', () => toggleRelaxMode(false));

    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && document.body.classList.contains('relax-mode')) {
        toggleRelaxMode(false);
      }
    });

    // Fullscreen toggle
    const fullscreenBtn = document.getElementById('quick-fullscreen-btn');
    if (fullscreenBtn) fullscreenBtn.addEventListener('click', toggleFullscreen);

    // Modal controls
    const modalCloseBtn = document.getElementById('modal-close-btn');
    const modalCancelBtn = document.getElementById('modal-cancel-btn');
    const modalConfirmBtn = document.getElementById('modal-confirm-btn');
    const purchaseModal = document.getElementById('purchase-modal');

    if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeUnlockModal);
    if (modalCancelBtn) modalCancelBtn.addEventListener('click', closeUnlockModal);
    if (modalConfirmBtn) modalConfirmBtn.addEventListener('click', confirmUnlockModal);
    if (purchaseModal) {
      purchaseModal.addEventListener('click', (e) => {
        if (e.target === purchaseModal) closeUnlockModal();
      });
    }

    // Back to top button
    const backToTop = document.getElementById('btn-back-to-top');
    if (backToTop) {
      backToTop.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      });
    }

    // Reset local data option
    const resetBtn = document.getElementById('footer-reset-data');
    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        if (confirm('Deseja resetar todas as preferências, conquistas e telemetria salvas?')) {
          localStorage.removeItem(STORAGE_KEY);
          location.reload();
        }
      });
    }

    // Smooth navigation spy
    const navLinks = document.querySelectorAll('.nav-link');
    window.addEventListener('scroll', () => {
      const scrollPos = window.scrollY + 120;
      document.querySelectorAll('section').forEach(sec => {
        if (scrollPos >= sec.offsetTop && scrollPos < sec.offsetTop + sec.offsetHeight) {
          const id = sec.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { passive: true });
  }

  /* ==========================================================================
     13. LIFECYCLE TICKER & APP INITIALIZATION
     ========================================================================== */

  function startTelemetryTimer() {
    setInterval(() => {
      state.timeOnSiteSeconds++;
      if (state.timeOnSiteSeconds % 5 === 0) {
        saveState();
      }
      updateStatsView();
    }, 1000);
  }

  function initApp() {
    loadState();

    // 1. Initialize Simulator
    simulator = new GrassSimulator('grass-canvas');

    // 2. Setup DOM & Bindings
    setupEventListeners();

    // 3. Render Views
    renderCollection();
    renderAchievementsGrid();
    updateHeaderGrassBadge();
    updateStatsView();

    // 4. Restore Environmental State
    setTimeOfDay(state.timeOfDay);
    setWindIntensity(state.windIntensity);
    if (state.rainActive) setRainMode(true, state.rainIntensity);

    // 5. Start Telemetry
    startTelemetryTimer();

    // 6. Handle first user gesture to unlock Web Audio if already enabled
    const unlockAudioContext = () => {
      if (audioEngine.isInitialized) audioEngine.resume();
      window.removeEventListener('click', unlockAudioContext);
      window.removeEventListener('touchstart', unlockAudioContext);
    };
    window.addEventListener('click', unlockAudioContext, { once: true });
    window.addEventListener('touchstart', unlockAudioContext, { once: true });
  }

  // Launch when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initApp);
  } else {
    initApp();
  }

})();
