import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useTSNAudio } from '../../hooks/useTSNAudio';
import styles from './TSNVisualizationModal.module.css';

export const TSNVisualizationModal = ({ isOpen, onClose }) => {
  const canvasRef = useRef(null);
  const sceneRef = useRef(null);
  const rendererRef = useRef(null);
  const animationFrameRef = useRef(null);
  const pulseIntervalRef = useRef(null);
  const [nodeCount, setNodeCount] = useState(0);
  const [edgeCount, setEdgeCount] = useState(0);
  const [completion, setCompletion] = useState(0);
  const [currentStage, setCurrentStage] = useState('Initializing');
  const [isBuilding, setIsBuilding] = useState(false);
  
  const { startAudio, stopAudio, playNodeSound, playEdgeSound, toggleMute, isMuted } = useTSNAudio();

  console.log('TSNVisualizationModal render - isOpen:', isOpen);

  useEffect(() => {
    console.log('TSNVisualizationModal useEffect - isOpen:', isOpen, 'canvasRef:', canvasRef.current);
    if (!isOpen || !canvasRef.current) return;

    // Start audio system
    pulseIntervalRef.current = startAudio();

    // Load Three.js dynamically
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    
    script.onload = () => {
      initializeVisualization();
    };

    document.body.appendChild(script);

    return () => {
      cleanup();
      stopAudio();
      if (pulseIntervalRef.current) {
        clearInterval(pulseIntervalRef.current);
      }
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [isOpen]);

  const cleanup = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    if (rendererRef.current) {
      rendererRef.current.dispose();
    }
    if (sceneRef.current) {
      sceneRef.current.traverse((object) => {
        if (object.geometry) object.geometry.dispose();
        if (object.material) {
          if (Array.isArray(object.material)) {
            object.material.forEach(material => material.dispose());
          } else {
            object.material.dispose();
          }
        }
      });
    }
  };

  const initializeVisualization = () => {
    if (!window.THREE || !canvasRef.current) return;

    const THREE = window.THREE;
    const canvas = canvasRef.current;

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x1A0F0A);
    scene.fog = new THREE.Fog(0x1A0F0A, 50, 200);
    sceneRef.current = scene;

    // Camera
    const camera = new THREE.PerspectiveCamera(
      60,
      canvas.clientWidth / canvas.clientHeight,
      0.1,
      1000
    );
    camera.position.set(0, 30, 80);
    camera.lookAt(0, 0, 0);

    // Renderer
    const renderer = new THREE.WebGLRenderer({ 
      canvas: canvas,
      antialias: true,
      alpha: true
    });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    rendererRef.current = renderer;

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xB8860B, 0.3);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0xD4AF37, 1, 100);
    pointLight1.position.set(20, 30, 20);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0x52B788, 0.8, 100);
    pointLight2.position.set(-20, 20, -20);
    scene.add(pointLight2);

    const pointLight3 = new THREE.PointLight(0x8ECAE6, 0.6, 80);
    pointLight3.position.set(0, -20, 30);
    scene.add(pointLight3);

    // Data structures
    const nodes = [];
    const edges = [];
    const nodeObjects = [];
    const edgeObjects = [];

    // TSN Parameters
    const TSN_CONFIG = {
      depots: ['Swargate', 'Nigdi', 'Bhosari', 'Katraj'],
      totalTrips: 450,
      timeSlots: 288,
      targetNodes: 5000,
      targetEdges: 20000
    };

    // Materials
    const nodeMaterial = new THREE.MeshPhongMaterial({
      color: 0xD4AF37,
      emissive: 0xB8860B,
      emissiveIntensity: 0.3,
      shininess: 100
    });

    const edgeMaterials = {
      trip: new THREE.LineBasicMaterial({ 
        color: 0x52B788, 
        transparent: true, 
        opacity: 0.7
      }),
      wait: new THREE.LineBasicMaterial({ 
        color: 0xD4AF37, 
        transparent: true, 
        opacity: 0.5
      }),
      deadhead: new THREE.LineBasicMaterial({ 
        color: 0x8ECAE6, 
        transparent: true, 
        opacity: 0.6
      }),
      rest: new THREE.LineBasicMaterial({ 
        color: 0xF2CC8F, 
        transparent: true, 
        opacity: 0.5
      })
    };

    // Create a node in 3D space
    const createNode = (location, timeSlot) => {
      const locationIndex = TSN_CONFIG.depots.indexOf(location);
      const depotAngle = (locationIndex / TSN_CONFIG.depots.length) * Math.PI * 2;
      
      const radius = 30 + (Math.random() - 0.5) * 10;
      const height = (timeSlot / TSN_CONFIG.timeSlots) * 60 - 30;
      
      const x = Math.cos(depotAngle) * radius;
      const z = Math.sin(depotAngle) * radius;
      const y = height;
      
      const geometry = new THREE.SphereGeometry(0.3, 8, 8);
      const mesh = new THREE.Mesh(geometry, nodeMaterial);
      mesh.position.set(x, y, z);
      
      const glowGeometry = new THREE.SphereGeometry(0.5, 8, 8);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: 0xD4AF37,
        transparent: true,
        opacity: 0.3
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      mesh.add(glow);
      
      scene.add(mesh);
      nodeObjects.push(mesh);
      
      return { x, y, z, location, timeSlot };
    };

    // Create an edge between two nodes
    const createEdge = (fromNode, toNode, type) => {
      const points = [
        new THREE.Vector3(fromNode.x, fromNode.y, fromNode.z),
        new THREE.Vector3(toNode.x, toNode.y, toNode.z)
      ];
      
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      const material = edgeMaterials[type] || edgeMaterials.wait;
      const line = new THREE.Line(geometry, material);
      
      scene.add(line);
      edgeObjects.push(line);
      
      return line;
    };

    const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

    // Build TSN progressively (target: ~40 seconds total)
    const buildTSN = async () => {
      setIsBuilding(true);
      let buildProgress = 0;

      // Stage 1: Create trip nodes (~10 seconds)
      setCurrentStage('Creating trip nodes...');
      
      for (let i = 0; i < TSN_CONFIG.totalTrips; i++) {
        const depot = TSN_CONFIG.depots[Math.floor(Math.random() * TSN_CONFIG.depots.length)];
        const timeSlot = Math.floor(Math.random() * TSN_CONFIG.timeSlots);
        
        const startNode = createNode(depot, timeSlot);
        nodes.push(startNode);
        playNodeSound(); // Audio feedback
        
        const endTimeSlot = Math.min(timeSlot + Math.floor(Math.random() * 12) + 6, TSN_CONFIG.timeSlots - 1);
        const endDepot = TSN_CONFIG.depots[Math.floor(Math.random() * TSN_CONFIG.depots.length)];
        const endNode = createNode(endDepot, endTimeSlot);
        nodes.push(endNode);
        playNodeSound(); // Audio feedback
        
        buildProgress = (i / TSN_CONFIG.totalTrips) * 0.25;
        setNodeCount(nodes.length);
        setCompletion(Math.floor(buildProgress * 100));
        
        await sleep(22); // ~10 seconds for 450 trips (450 * 22ms ≈ 10s)
      }

      // Stage 2: Create depot nodes (~5 seconds)
      setCurrentStage('Creating depot nodes...');
      
      for (let d = 0; d < TSN_CONFIG.depots.length; d++) {
        for (let t = 0; t < TSN_CONFIG.timeSlots; t += 12) {
          const node = createNode(TSN_CONFIG.depots[d], t);
          nodes.push(node);
          playNodeSound(); // Audio feedback
          
          buildProgress = 0.25 + ((d * TSN_CONFIG.timeSlots + t) / (TSN_CONFIG.depots.length * TSN_CONFIG.timeSlots)) * 0.125;
          setNodeCount(nodes.length);
          setCompletion(Math.floor(buildProgress * 100));
          
          await sleep(50); // ~5 seconds for depot nodes
        }
      }

      // Stage 3: Create trip edges (~10 seconds)
      setCurrentStage('Generating trip edges...');
      
      for (let i = 0; i < TSN_CONFIG.totalTrips; i++) {
        const startNodeIndex = i * 2;
        const endNodeIndex = i * 2 + 1;
        
        if (startNodeIndex < nodes.length && endNodeIndex < nodes.length) {
          createEdge(nodes[startNodeIndex], nodes[endNodeIndex], 'trip');
          edges.push({ from: startNodeIndex, to: endNodeIndex, type: 'trip' });
          playEdgeSound(); // Audio feedback
        }
        
        buildProgress = 0.375 + (i / TSN_CONFIG.totalTrips) * 0.25;
        setEdgeCount(edges.length);
        setCompletion(Math.floor(buildProgress * 100));
        
        await sleep(22); // ~10 seconds for trip edges
      }

      // Stage 4: Create wait edges (~8 seconds)
      setCurrentStage('Generating wait edges...');
      
      const waitEdgeCount = Math.min(nodes.length * 0.5, 2500);
      for (let i = 0; i < waitEdgeCount; i++) {
        const nodeIndex = Math.floor(Math.random() * (nodes.length - 1));
        const nextNodeIndex = nodeIndex + 1;
        
        if (nodes[nodeIndex] && nodes[nextNodeIndex]) {
          createEdge(nodes[nodeIndex], nodes[nextNodeIndex], 'wait');
          edges.push({ from: nodeIndex, to: nextNodeIndex, type: 'wait' });
        }
        
        buildProgress = 0.625 + (i / waitEdgeCount) * 0.2;
        setEdgeCount(edges.length);
        setCompletion(Math.floor(buildProgress * 100));
        
        await sleep(3); // ~8 seconds for wait edges
      }

      // Stage 5: Create deadhead and rest edges (~7 seconds)
      setCurrentStage('Generating deadhead & rest edges...');
      
      const miscEdgeCount = Math.min(nodes.length * 0.3, 1500);
      for (let i = 0; i < miscEdgeCount; i++) {
        const node1Index = Math.floor(Math.random() * nodes.length);
        const node2Index = Math.floor(Math.random() * nodes.length);
        
        if (node1Index !== node2Index && nodes[node1Index] && nodes[node2Index]) {
          const type = Math.random() > 0.5 ? 'deadhead' : 'rest';
          createEdge(nodes[node1Index], nodes[node2Index], type);
          edges.push({ from: node1Index, to: node2Index, type });
        }
        
        buildProgress = 0.825 + (i / miscEdgeCount) * 0.175;
        setEdgeCount(edges.length);
        setCompletion(Math.floor(buildProgress * 100));
        
        await sleep(5); // ~7 seconds for misc edges
      }

      // Complete
      setCompletion(100);
      setCurrentStage('Complete!');
      setIsBuilding(false);
      
      // Auto-close after completion (close immediately to move to stage 3)
      setTimeout(() => {
        onClose();
      }, 1000);
    };

    // Camera rotation
    let cameraAngle = 0;
    const cameraRadius = 80;
    const cameraHeight = 30;

    // Animation loop
    const animate = () => {
      animationFrameRef.current = requestAnimationFrame(animate);
      
      cameraAngle += 0.002;
      camera.position.x = Math.cos(cameraAngle) * cameraRadius;
      camera.position.z = Math.sin(cameraAngle) * cameraRadius;
      camera.position.y = cameraHeight;
      camera.lookAt(0, 0, 0);
      
      nodeObjects.forEach((node, i) => {
        if (node.children[0]) {
          node.children[0].material.opacity = 0.2 + Math.sin(Date.now() * 0.001 + i * 0.1) * 0.1;
        }
      });
      
      renderer.render(scene, camera);
    };

    // Start animation and build
    animate();
    setTimeout(() => {
      buildTSN();
    }, 1000);
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <canvas ref={canvasRef} className={styles.canvas} />
        
        {/* Vintage Frame */}
        <div className={styles.vintageFrame}>
          <div className={`${styles.cornerOrnament} ${styles.topLeft}`}></div>
          <div className={`${styles.cornerOrnament} ${styles.topRight}`}></div>
          <div className={`${styles.cornerOrnament} ${styles.bottomLeft}`}></div>
          <div className={`${styles.cornerOrnament} ${styles.bottomRight}`}></div>
        </div>

        {/* Info Panel */}
        <div className={styles.infoPanel}>
          <div className={styles.infoPanelHeader}>
            <h2>⚙ TSN CONSTRUCTION</h2>
            <button 
              className={styles.audioToggle}
              onClick={toggleMute}
              title={isMuted ? 'Unmute Audio' : 'Mute Audio'}
            >
              {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
            </button>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Nodes Created:</span>
            <span className={`${styles.infoValue} ${isBuilding ? styles.building : ''}`}>
              {nodeCount}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Edges Generated:</span>
            <span className={`${styles.infoValue} ${isBuilding ? styles.building : ''}`}>
              {edgeCount}
            </span>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Completion:</span>
            <span className={styles.infoValue}>{completion}%</span>
          </div>
          <div className={styles.progressBar}>
            <div 
              className={styles.progressFill} 
              style={{ width: `${completion}%` }}
            ></div>
            <div className={styles.progressText}>{completion}%</div>
          </div>
          <div className={styles.infoRow}>
            <span className={styles.infoLabel}>Current Stage:</span>
            <span className={styles.infoValue} style={{ fontSize: '11px' }}>
              {currentStage}
            </span>
          </div>
        </div>

        {/* Legend */}
        <div className={styles.legend}>
          <h3>EDGE TYPES</h3>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.trip}`}></div>
            <div className={styles.legendLabel}>Trip (Scheduled Service)</div>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.wait}`}></div>
            <div className={styles.legendLabel}>Wait (At Location)</div>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.deadhead}`}></div>
            <div className={styles.legendLabel}>Deadhead (Empty Move)</div>
          </div>
          <div className={styles.legendItem}>
            <div className={`${styles.legendColor} ${styles.rest}`}></div>
            <div className={styles.legendLabel}>Rest (Driver Break)</div>
          </div>
        </div>

        {/* Status Display */}
        <div className={styles.statusDisplay}>
          Building Time-Space Network Graph...
        </div>
      </div>
    </div>
  );
};
