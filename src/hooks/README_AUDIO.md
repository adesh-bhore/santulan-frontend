# TSN Audio System

## Overview
The TSN Audio System provides an immersive soundscape during the Time-Space Network (TSN) building visualization. It uses the Web Audio API to generate procedural audio without requiring external audio files.

## Features

### Ambient Soundscape
- **Low frequency drone** (55 Hz) - Creates a deep, mechanical rumble
- **Mid frequency pad** (110 Hz) - Adds warmth and body
- **High frequency shimmer** (440 Hz) - Provides sparkle with LFO modulation

### Sound Effects
- **Node creation** - High-pitched metallic "ping" when nodes are created
- **Edge connection** - Swooshing sound as edges are drawn between nodes
- **Rhythmic pulse** - Heartbeat-like pulse every 800ms

### Controls
- **Mute/Unmute toggle** - Icon button in the TSN visualization modal
- **Volume2 icon** - Audio is playing
- **VolumeX icon** - Audio is muted

## Implementation

### Hook Usage
```javascript
import { useTSNAudio } from '../../hooks/useTSNAudio';

const { 
  startAudio,      // Initialize and start ambient audio
  stopAudio,       // Stop all audio
  playNodeSound,   // Play node creation sound
  playEdgeSound,   // Play edge connection sound
  toggleMute,      // Toggle mute/unmute
  isMuted          // Current mute state
} = useTSNAudio();
```

### Integration Example
```javascript
// Start audio when modal opens
useEffect(() => {
  if (isOpen) {
    const pulseInterval = startAudio();
    return () => {
      stopAudio();
      clearInterval(pulseInterval);
    };
  }
}, [isOpen]);

// Play sound effects during building
playNodeSound();  // When creating a node
playEdgeSound();  // When creating an edge
```

## Technical Details

### Web Audio API
The system uses the Web Audio API to generate sounds programmatically:
- **OscillatorNode** - Generates sine, triangle, and sawtooth waveforms
- **GainNode** - Controls volume and creates envelopes
- **AudioContext** - Manages audio processing graph

### No External Files Required
All sounds are generated in real-time using oscillators and gain envelopes. This means:
- No audio files to download
- Smaller bundle size
- Instant playback (no loading time)
- Procedural variation in sounds

### Browser Compatibility
- Chrome/Edge: Full support
- Firefox: Full support
- Safari: Full support (requires user interaction to start)

## Sound Design Philosophy

The audio is designed to match the vintage aesthetic of the application:
- **Mechanical sounds** - Evokes old railway equipment and telegraph machines
- **Subtle and ambient** - Doesn't overpower the visual experience
- **Procedural** - Each sound is slightly different, avoiding repetition
- **Low volume** - Set to 30% by default to be non-intrusive

## Future Enhancements

Potential improvements:
1. Add reverb and delay effects for more depth
2. Stage-specific music (different themes for each building stage)
3. Completion celebration sound
4. Volume slider for user control
5. Different sound profiles (mechanical, electronic, orchestral)

## Notes

- Audio context is automatically resumed on user interaction (browser requirement)
- All oscillators are properly cleaned up to prevent memory leaks
- The pulse interval is stored in a ref for proper cleanup
- Master gain node allows instant mute/unmute without stopping oscillators
