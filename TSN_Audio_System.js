/* ═══════════════════════════════════════════════════════════════ */
/*     TSN BUILDING AUDIO SOUNDTRACK SUITE                         */
/*     Add this to your existing TSN_3D_Visualization.html         */
/* ═══════════════════════════════════════════════════════════════ */

// Add Tone.js library before closing </body> tag:
// <script src="https://cdnjs.cloudflare.com/ajax/libs/tone/14.8.49/Tone.js"></script>

/* ═══════════════════════════════════════ */
/*     AUDIO SYSTEM CONFIGURATION          */
/* ═══════════════════════════════════════ */

const TSNAudio = {
  initialized: false,
  isMuted: false,
  
  // Audio context and instruments
  synth: null,
  bassSynth: null,
  ambientSynth: null,
  noiseSynth: null,
  reverb: null,
  delay: null,
  
  // Audio patterns
  sequences: {},
  loops: {},
  
  // Initialize audio system
  async init() {
    if (this.initialized) return;
    
    await Tone.start();
    console.log('TSN Audio System initialized');
    
    // Create vintage mechanical sounds
    this.createInstruments();
    this.createEffects();
    this.createSequences();
    
    this.initialized = true;
  },
  
  // Create vintage synthesizers
  createInstruments() {
    // Main melody synth (brass/metallic sound for nodes)
    this.synth = new Tone.PolySynth(Tone.FMSynth, {
      harmonicity: 2,
      modulationIndex: 3,
      envelope: {
        attack: 0.01,
        decay: 0.3,
        sustain: 0.2,
        release: 0.5
      },
      modulation: {
        type: "sine"
      }
    }).toDestination();
    
    // Bass synth (deep mechanical rumble)
    this.bassSynth = new Tone.MonoSynth({
      oscillator: {
        type: "sawtooth"
      },
      envelope: {
        attack: 0.1,
        decay: 0.3,
        sustain: 0.4,
        release: 0.8
      },
      filter: {
        Q: 2,
        type: "lowpass",
        rolloff: -24
      }
    }).toDestination();
    
    // Ambient pad (atmospheric background)
    this.ambientSynth = new Tone.PolySynth(Tone.Synth, {
      oscillator: {
        type: "sine"
      },
      envelope: {
        attack: 2,
        decay: 1,
        sustain: 0.7,
        release: 3
      }
    }).toDestination();
    
    // Noise synth (mechanical clicks and steam hisses)
    this.noiseSynth = new Tone.NoiseSynth({
      noise: {
        type: "white"
      },
      envelope: {
        attack: 0.005,
        decay: 0.1,
        sustain: 0
      }
    }).toDestination();
    
    // Set volumes
    this.synth.volume.value = -12;
    this.bassSynth.volume.value = -15;
    this.ambientSynth.volume.value = -20;
    this.noiseSynth.volume.value = -25;
  },
  
  // Create audio effects
  createEffects() {
    // Reverb for space and depth
    this.reverb = new Tone.Reverb({
      decay: 4,
      wet: 0.3
    }).toDestination();
    
    // Delay for mechanical echoes
    this.delay = new Tone.FeedbackDelay({
      delayTime: "8n",
      feedback: 0.3,
      wet: 0.2
    }).toDestination();
    
    // Connect effects
    this.synth.connect(this.reverb);
    this.synth.connect(this.delay);
    this.ambientSynth.connect(this.reverb);
  },
  
  // Create musical sequences
  createSequences() {
    // Ambient background drone (continuous)
    this.loops.ambient = new Tone.Loop((time) => {
      this.ambientSynth.triggerAttackRelease(
        ["C2", "G2", "C3"], 
        "2n", 
        time
      );
    }, "4m");
    
    // Rhythmic pulse (heartbeat of the system)
    this.sequences.pulse = new Tone.Sequence(
      (time, note) => {
        this.bassSynth.triggerAttackRelease(note, "16n", time);
      },
      ["C1", null, "C1", null, "G1", null, "C1", null],
      "8n"
    );
    
    // Melodic pattern (building progression)
    this.sequences.melody = new Tone.Sequence(
      (time, note) => {
        if (note) {
          this.synth.triggerAttackRelease(note, "16n", time);
        }
      },
      [
        "C4", null, "E4", null, 
        "G4", null, "C5", null,
        "B4", null, "G4", null,
        "E4", null, "C4", null
      ],
      "16n"
    );
  },
  
  /* ═══════════════════════════════════════ */
  /*     STAGE-SPECIFIC SOUNDSCAPES          */
  /* ═══════════════════════════════════════ */
  
  // Start building soundtrack
  startBuildingMusic() {
    if (!this.initialized || this.isMuted) return;
    
    Tone.Transport.bpm.value = 90;
    
    // Start ambient background
    this.loops.ambient.start(0);
    
    // Start rhythmic pulse
    this.sequences.pulse.start(0);
    
    // Start transport
    Tone.Transport.start();
  },
  
  // Stage 1: Creating trip nodes (0-30%)
  playStage1() {
    if (!this.initialized || this.isMuted) return;
    
    // Add melodic pattern
    this.sequences.melody.start("+0.5");
    
    // Increase tempo slightly
    Tone.Transport.bpm.rampTo(100, 5);
  },
  
  // Stage 2: Creating depot nodes (30-50%)
  playStage2() {
    if (!this.initialized || this.isMuted) return;
    
    // Change melody pattern to more complex
    this.sequences.melody.stop();
    
    this.sequences.melody2 = new Tone.Sequence(
      (time, chord) => {
        if (chord) {
          this.synth.triggerAttackRelease(chord, "8n", time);
        }
      },
      [
        ["C4", "E4", "G4"], null,
        ["D4", "F4", "A4"], null,
        ["E4", "G4", "B4"], null,
        ["F4", "A4", "C5"], null
      ],
      "8n"
    ).start();
  },
  
  // Stage 3: Generating trip edges (50-70%)
  playStage3() {
    if (!this.initialized || this.isMuted) return;
    
    // Increase intensity
    Tone.Transport.bpm.rampTo(110, 3);
    
    // Add arpeggiated pattern
    this.sequences.arpeggio = new Tone.Sequence(
      (time, note) => {
        this.synth.triggerAttackRelease(note, "32n", time);
      },
      ["C5", "E5", "G5", "C6", "G5", "E5", "C5", "G4"],
      "16n"
    ).start();
  },
  
  // Stage 4: Generating wait edges (70-85%)
  playStage4() {
    if (!this.initialized || this.isMuted) return;
    
    // Add tension with dissonance
    this.sequences.tension = new Tone.Sequence(
      (time, note) => {
        this.bassSynth.triggerAttackRelease(note, "8n", time);
      },
      ["C1", "Db1", "D1", "Eb1"],
      "4n"
    ).start();
  },
  
  // Stage 5: Final edges (85-100%)
  playStage5() {
    if (!this.initialized || this.isMuted) return;
    
    // Build to climax
    Tone.Transport.bpm.rampTo(120, 2);
    
    // Full chord progression
    this.sequences.finale = new Tone.Sequence(
      (time, chord) => {
        this.synth.triggerAttackRelease(chord, "4n", time);
      },
      [
        ["C4", "E4", "G4", "C5"],
        ["G3", "B3", "D4", "G4"],
        ["A3", "C4", "E4", "A4"],
        ["F3", "A3", "C4", "F4"]
      ],
      "2n"
    ).start();
  },
  
  // Completion celebration sound
  playCompletion() {
    if (!this.initialized || this.isMuted) return;
    
    // Triumphant ascending arpeggio
    const notes = ["C4", "E4", "G4", "C5", "E5", "G5", "C6"];
    let delay = 0;
    
    notes.forEach(note => {
      setTimeout(() => {
        this.synth.triggerAttackRelease(note, "8n");
      }, delay);
      delay += 100;
    });
    
    // Final chord
    setTimeout(() => {
      this.synth.triggerAttackRelease(["C4", "E4", "G4", "C5"], "1n");
    }, delay + 200);
  },
  
  // Stop all music
  stopMusic() {
    Tone.Transport.stop();
    
    // Stop all sequences
    Object.values(this.sequences).forEach(seq => {
      if (seq && seq.stop) seq.stop();
    });
    
    // Stop all loops
    Object.values(this.loops).forEach(loop => {
      if (loop && loop.stop) loop.stop();
    });
  },
  
  /* ═══════════════════════════════════════ */
  /*     SOUND EFFECTS FOR INTERACTIONS      */
  /* ═══════════════════════════════════════ */
  
  // Node creation sound (mechanical click)
  playNodeSound() {
    if (!this.initialized || this.isMuted) return;
    
    this.noiseSynth.triggerAttackRelease("32n");
    
    // High pitched metallic ping
    this.synth.triggerAttackRelease(
      ["C6", "E6"], 
      "64n", 
      undefined, 
      0.3
    );
  },
  
  // Edge creation sound (connection whoosh)
  playEdgeSound(type) {
    if (!this.initialized || this.isMuted) return;
    
    const edgeSounds = {
      trip: ["G4", "C5"],      // Bright ascending
      wait: ["E4", "E4"],      // Sustained
      deadhead: ["C4", "G4"],  // Movement
      rest: ["A3", "E4"]       // Calming
    };
    
    const notes = edgeSounds[type] || edgeSounds.wait;
    this.synth.triggerAttackRelease(notes, "32n", undefined, 0.2);
  },
  
  // Progress milestone sound (every 10%)
  playMilestoneSound() {
    if (!this.initialized || this.isMuted) return;
    
    // Three note ascending phrase
    this.synth.triggerAttackRelease("C5", "16n");
    setTimeout(() => {
      this.synth.triggerAttackRelease("E5", "16n");
    }, 100);
    setTimeout(() => {
      this.synth.triggerAttackRelease("G5", "16n");
    }, 200);
  },
  
  // Button click sound
  playClickSound() {
    if (!this.initialized || this.isMuted) return;
    
    this.noiseSynth.triggerAttackRelease("64n");
    this.synth.triggerAttackRelease("C5", "64n", undefined, 0.4);
  },
  
  // Toggle mute
  toggleMute() {
    this.isMuted = !this.isMuted;
    
    if (this.isMuted) {
      Tone.Master.volume.value = -Infinity;
    } else {
      Tone.Master.volume.value = 0;
    }
    
    return this.isMuted;
  }
};

/* ═══════════════════════════════════════ */
/*     INTEGRATION WITH EXISTING CODE      */
/* ═══════════════════════════════════════ */

// Add this to your existing buildTSN() function:

async function buildTSN() {
  if (isBuilding) return;
  
  // Initialize audio on first build
  if (!TSNAudio.initialized) {
    await TSNAudio.init();
  }
  
  // Start background music
  TSNAudio.startBuildingMusic();
  
  isBuilding = true;
  isPaused = false;
  buildProgress = 0;
  
  document.getElementById('start-btn').style.display = 'none';
  document.getElementById('pause-btn').style.display = 'block';
  
  // Stage 1: Create trip nodes
  currentStage = 'Creating trip nodes...';
  updateStatus();
  TSNAudio.playStage1(); // 🔊 Stage 1 music
  
  for (let i = 0; i < TSN_CONFIG.totalTrips && isBuilding; i++) {
    if (isPaused) await waitForResume();
    
    const depot = TSN_CONFIG.depots[Math.floor(Math.random() * TSN_CONFIG.depots.length)];
    const timeSlot = Math.floor(Math.random() * TSN_CONFIG.timeSlots);
    
    const startNode = createNode(depot, timeSlot, nodes.length);
    nodes.push(startNode);
    TSNAudio.playNodeSound(); // 🔊 Node creation sound
    
    const endTimeSlot = Math.min(timeSlot + Math.floor(Math.random() * 12) + 6, TSN_CONFIG.timeSlots - 1);
    const endDepot = TSN_CONFIG.depots[Math.floor(Math.random() * TSN_CONFIG.depots.length)];
    const endNode = createNode(endDepot, endTimeSlot, nodes.length);
    nodes.push(endNode);
    
    buildProgress = (i / TSN_CONFIG.totalTrips) * 0.3;
    
    // Play milestone sound every 10%
    if (Math.floor(buildProgress * 100) % 10 === 0 && buildProgress > 0) {
      TSNAudio.playMilestoneSound(); // 🔊 Milestone reached
    }
    
    updateProgress();
    await sleep(5);
  }
  
  // Stage 2: Create depot nodes
  currentStage = 'Creating depot nodes...';
  updateStatus();
  TSNAudio.playStage2(); // 🔊 Stage 2 music
  
  for (let d = 0; d < TSN_CONFIG.depots.length && isBuilding; d++) {
    for (let t = 0; t < TSN_CONFIG.timeSlots && isBuilding; t += 12) {
      if (isPaused) await waitForResume();
      
      const node = createNode(TSN_CONFIG.depots[d], t, nodes.length);
      nodes.push(node);
      TSNAudio.playNodeSound(); // 🔊 Node creation sound
      
      buildProgress = 0.3 + ((d * TSN_CONFIG.timeSlots + t) / (TSN_CONFIG.depots.length * TSN_CONFIG.timeSlots)) * 0.2;
      updateProgress();
      await sleep(2);
    }
  }
  
  // Stage 3: Create trip edges
  currentStage = 'Generating trip edges...';
  updateStatus();
  TSNAudio.playStage3(); // 🔊 Stage 3 music
  
  for (let i = 0; i < TSN_CONFIG.totalTrips && isBuilding; i++) {
    if (isPaused) await waitForResume();
    
    const startNodeIndex = i * 2;
    const endNodeIndex = i * 2 + 1;
    
    if (startNodeIndex < nodes.length && endNodeIndex < nodes.length) {
      createEdge(nodes[startNodeIndex], nodes[endNodeIndex], 'trip');
      edges.push({ from: startNodeIndex, to: endNodeIndex, type: 'trip' });
      TSNAudio.playEdgeSound('trip'); // 🔊 Edge creation sound
    }
    
    buildProgress = 0.5 + (i / TSN_CONFIG.totalTrips) * 0.2;
    updateProgress();
    await sleep(3);
  }
  
  // Stage 4: Create wait edges
  currentStage = 'Generating wait edges...';
  updateStatus();
  TSNAudio.playStage4(); // 🔊 Stage 4 music
  
  const waitEdgeCount = Math.min(nodes.length * 0.5, 2500);
  for (let i = 0; i < waitEdgeCount && isBuilding; i++) {
    if (isPaused) await waitForResume();
    
    const nodeIndex = Math.floor(Math.random() * (nodes.length - 1));
    const nextNodeIndex = nodeIndex + 1;
    
    if (nodes[nodeIndex] && nodes[nextNodeIndex]) {
      createEdge(nodes[nodeIndex], nodes[nextNodeIndex], 'wait');
      edges.push({ from: nodeIndex, to: nextNodeIndex, type: 'wait' });
      TSNAudio.playEdgeSound('wait'); // 🔊 Edge creation sound
    }
    
    buildProgress = 0.7 + (i / waitEdgeCount) * 0.15;
    updateProgress();
    await sleep(2);
  }
  
  // Stage 5: Create deadhead and rest edges
  currentStage = 'Generating deadhead & rest edges...';
  updateStatus();
  TSNAudio.playStage5(); // 🔊 Stage 5 music
  
  const miscEdgeCount = Math.min(nodes.length * 0.3, 1500);
  for (let i = 0; i < miscEdgeCount && isBuilding; i++) {
    if (isPaused) await waitForResume();
    
    const node1Index = Math.floor(Math.random() * nodes.length);
    const node2Index = Math.floor(Math.random() * nodes.length);
    
    if (node1Index !== node2Index && nodes[node1Index] && nodes[node2Index]) {
      const type = Math.random() > 0.5 ? 'deadhead' : 'rest';
      createEdge(nodes[node1Index], nodes[node2Index], type);
      edges.push({ from: node1Index, to: node2Index, type });
      TSNAudio.playEdgeSound(type); // 🔊 Edge creation sound
    }
    
    buildProgress = 0.85 + (i / miscEdgeCount) * 0.15;
    updateProgress();
    await sleep(2);
  }
  
  // Complete
  buildProgress = 1.0;
  currentStage = 'Complete!';
  updateProgress();
  updateStatus();
  
  TSNAudio.playCompletion(); // 🔊 Completion celebration
  
  // Fade out music after 2 seconds
  setTimeout(() => {
    TSNAudio.stopMusic();
  }, 2000);
  
  isBuilding = false;
  document.getElementById('pause-btn').style.display = 'none';
  document.getElementById('start-btn').style.display = 'block';
  document.getElementById('start-btn').textContent = 'REBUILD';
  document.getElementById('status-display').innerHTML = '✓ TSN Construction Complete';
}

// Add audio toggle button to controls
// Add this HTML before closing #controls div:
/*
<button class="control-btn" id="audio-btn" onclick="toggleAudio()">
  🔊 AUDIO ON
</button>
*/

function toggleAudio() {
  const isMuted = TSNAudio.toggleMute();
  const btn = document.getElementById('audio-btn');
  btn.textContent = isMuted ? '🔇 AUDIO OFF' : '🔊 AUDIO ON';
  btn.classList.toggle('muted', isMuted);
  
  TSNAudio.playClickSound(); // Click feedback
}

// Add click sounds to existing buttons
document.getElementById('start-btn').addEventListener('click', () => {
  TSNAudio.playClickSound();
  // ... existing code
});

document.getElementById('pause-btn').addEventListener('click', () => {
  TSNAudio.playClickSound();
  // ... existing code
});

document.getElementById('reset-btn').addEventListener('click', () => {
  TSNAudio.playClickSound();
  TSNAudio.stopMusic();
  // ... existing code
});
