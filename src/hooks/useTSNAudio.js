import { useEffect, useRef, useState } from 'react';

/**
 * Custom hook for TSN Building Audio System
 * Provides ambient soundscape during TSN visualization
 */
export const useTSNAudio = () => {
  const [isMuted, setIsMuted] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);
  const audioContextRef = useRef(null);
  const oscillatorsRef = useRef([]);
  const gainNodesRef = useRef([]);
  const masterGainRef = useRef(null);

  // Initialize Web Audio API
  const initAudio = () => {
    if (isInitialized) return;

    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      audioContextRef.current = new AudioContext();
      
      // Create master gain node for volume control
      masterGainRef.current = audioContextRef.current.createGain();
      masterGainRef.current.gain.value = 0.3; // 30% volume
      masterGainRef.current.connect(audioContextRef.current.destination);

      setIsInitialized(true);
      console.log('TSN Audio System initialized');
    } catch (error) {
      console.error('Failed to initialize audio:', error);
    }
  };

  // Create ambient drone sound
  const createAmbientDrone = () => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    
    // Low frequency hum (base layer)
    const bassOsc = ctx.createOscillator();
    bassOsc.type = 'sine';
    bassOsc.frequency.value = 55; // A1 note
    
    const bassGain = ctx.createGain();
    bassGain.gain.value = 0.15;
    
    bassOsc.connect(bassGain);
    bassGain.connect(masterGainRef.current);
    
    // Mid frequency pad
    const midOsc = ctx.createOscillator();
    midOsc.type = 'triangle';
    midOsc.frequency.value = 110; // A2 note
    
    const midGain = ctx.createGain();
    midGain.gain.value = 0.08;
    
    midOsc.connect(midGain);
    midGain.connect(masterGainRef.current);
    
    // High frequency shimmer
    const highOsc = ctx.createOscillator();
    highOsc.type = 'sine';
    highOsc.frequency.value = 440; // A4 note
    
    const highGain = ctx.createGain();
    highGain.gain.value = 0.03;
    
    // Add LFO for shimmer effect
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.5; // 0.5 Hz modulation
    
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 0.02;
    
    lfo.connect(lfoGain);
    lfoGain.connect(highGain.gain);
    
    highOsc.connect(highGain);
    highGain.connect(masterGainRef.current);
    
    // Start all oscillators
    bassOsc.start();
    midOsc.start();
    highOsc.start();
    lfo.start();
    
    // Store references for cleanup
    oscillatorsRef.current.push(bassOsc, midOsc, highOsc, lfo);
    gainNodesRef.current.push(bassGain, midGain, highGain, lfoGain);
  };

  // Create pulsing rhythm
  const createPulse = () => {
    if (!audioContextRef.current || !masterGainRef.current) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    // Create a repeating pulse pattern
    const pulseInterval = setInterval(() => {
      if (!audioContextRef.current || isMuted) return;
      
      const osc = ctx.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 220; // A3 note
      
      const gain = ctx.createGain();
      gain.gain.value = 0;
      
      osc.connect(gain);
      gain.connect(masterGainRef.current);
      
      const startTime = ctx.currentTime;
      
      // Quick attack and decay
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(0.1, startTime + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.2);
      
      osc.start(startTime);
      osc.stop(startTime + 0.2);
    }, 800); // Pulse every 800ms
    
    return pulseInterval;
  };

  // Play node creation sound
  const playNodeSound = () => {
    if (!audioContextRef.current || !masterGainRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 1200 + Math.random() * 400; // Random high pitch
    
    const gain = ctx.createGain();
    gain.gain.value = 0;
    
    osc.connect(gain);
    gain.connect(masterGainRef.current);
    
    // Quick blip
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.05, now + 0.005);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.05);
    
    osc.start(now);
    osc.stop(now + 0.05);
  };

  // Play edge creation sound
  const playEdgeSound = () => {
    if (!audioContextRef.current || !masterGainRef.current || isMuted) return;

    const ctx = audioContextRef.current;
    const now = ctx.currentTime;
    
    const osc = ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, now);
    osc.frequency.exponentialRampToValueAtTime(800, now + 0.1);
    
    const gain = ctx.createGain();
    gain.gain.value = 0;
    
    osc.connect(gain);
    gain.connect(masterGainRef.current);
    
    // Swoosh sound
    gain.gain.setValueAtTime(0, now);
    gain.gain.linearRampToValueAtTime(0.03, now + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);
    
    osc.start(now);
    osc.stop(now + 0.15);
  };

  // Start the audio system
  const startAudio = () => {
    initAudio();
    
    if (!audioContextRef.current) return;
    
    // Resume audio context (required by browsers)
    if (audioContextRef.current.state === 'suspended') {
      audioContextRef.current.resume();
    }
    
    createAmbientDrone();
    const pulseInterval = createPulse();
    
    return pulseInterval;
  };

  // Stop all audio
  const stopAudio = () => {
    // Stop all oscillators
    oscillatorsRef.current.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator might already be stopped
      }
    });
    
    oscillatorsRef.current = [];
    gainNodesRef.current = [];
  };

  // Toggle mute
  const toggleMute = () => {
    if (masterGainRef.current) {
      const newMutedState = !isMuted;
      masterGainRef.current.gain.value = newMutedState ? 0 : 0.3;
      setIsMuted(newMutedState);
      return newMutedState;
    }
    return isMuted;
  };

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopAudio();
      if (audioContextRef.current) {
        audioContextRef.current.close();
      }
    };
  }, []);

  return {
    startAudio,
    stopAudio,
    playNodeSound,
    playEdgeSound,
    toggleMute,
    isMuted,
    isInitialized
  };
};
