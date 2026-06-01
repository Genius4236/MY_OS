import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  Float,
  Stars,
} from "@react-three/drei";

import { useRef } from "react";

function FloatingCube({ position }) {

  const meshRef = useRef();

  useFrame(() => {

    if (meshRef.current) {

      meshRef.current.rotation.x += 0.003;

      meshRef.current.rotation.y += 0.003;
    }
  });

  return (
    <Float speed={2} rotationIntensity={2}>

      <mesh
        ref={meshRef}
        position={position}
      >

        {/* <boxGeometry args={[1, 1, 1]} /> */}

        <meshStandardMaterial
          color="#00ff88"
          emissive="#00ff88"
          emissiveIntensity={1}
        />

      </mesh>

    </Float>
  );
}

function CyberScene() {

  return (
    <div className="absolute inset-0 z-0">

      <Canvas camera={{ position: [0, 0, 8] }}>

        {/* LIGHTS */}
        <ambientLight intensity={0.4} />

        <pointLight
          position={[10, 10, 10]}
          intensity={2}
          color="#00ff88"
        />

        {/* STARS */}
        <Stars
          radius={100}
          depth={50}
          count={5000}
          factor={4}
        />

        {/* FLOATING OBJECTS */}
        <FloatingCube position={[-3, 0, 0]} />

        <FloatingCube position={[3, 1, -2]} />

        <FloatingCube position={[0, -2, -1]} />

        {/* CAMERA */}
        <OrbitControls
          enableZoom={false}
          autoRotate
          autoRotateSpeed={0.5}
        />

      </Canvas>

    </div>
  );
}

export default CyberScene;