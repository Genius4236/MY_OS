import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Float, Stars } from "@react-three/drei";
import { useRef, useState, useEffect } from "react";
function HologramShape({ position, shapeType = "torusKnot", color }) {
  const meshRef = useRef();
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.15;
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.2;
    }
  });
  return (
    <Float speed={1.5} rotationIntensity={1.5} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        {shapeType === "torusKnot" && (
          <torusKnotGeometry args={[0.9, 0.28, 120, 16]} />
        )}
        {shapeType === "icosahedron" && (
          <icosahedronGeometry args={[0.9, 1]} />
        )}
        {shapeType === "octahedron" && (
          <octahedronGeometry args={[0.8, 0]} />
        )}
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={1.8}
          wireframe={true}
          transparent={true}
          opacity={0.4}
        />
      </mesh>
    </Float>
  );
}
function GridPlane({ color }) {
  const gridRef = useRef();
  useFrame((state) => {
    if (gridRef.current) {
      // Slowly rotate grid plane
      gridRef.current.rotation.z = state.clock.getElapsedTime() * 0.02;
    }
  });
  return (
    <group ref={gridRef} position={[0, -3.2, 0]} rotation={[-Math.PI / 2, 0, 0]}>
      <gridHelper 
        args={[30, 24, color, color]} 
        position={[0, 0, 0]}
      />
    </group>
  );
}
function CyberScene() {
  const [themeColor, setThemeColor] = useState("#00ff88");
  useEffect(() => {
    const updateThemeColor = () => {
      const activeTheme = document.documentElement.getAttribute("data-theme") || "green";
      if (activeTheme === "cyan") {
        setThemeColor("#00f3ff");
      } else if (activeTheme === "amber") {
        setThemeColor("#ffb700");
      } else if (activeTheme === "violet") {
        setThemeColor("#d600ff");
      } else {
        setThemeColor("#00ff88");
      }
    };
    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["data-theme"],
    });
    return () => observer.disconnect();
  }, []);
  return (
    <div className="absolute inset-0 z-0 select-none pointer-events-none opacity-45">
      <Canvas camera={{ position: [0, 1.5, 7.5], fov: 60 }}>
        {/* Lights */}
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color={themeColor} />
        <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#ffffff" />
        {/* Slow drifting stars backdrop */}
        <Stars
          radius={80}
          depth={40}
          count={2500}
          factor={3.5}
          saturation={0.5}
          fade
          speed={0.8}
        />
        {/* Rotating wireframe hologram models */}
        <HologramShape position={[-3.2, 0.8, -1.5]} shapeType="icosahedron" color={themeColor} />
        <HologramShape position={[3.2, -0.5, -2]} shapeType="torusKnot" color={themeColor} />
        <HologramShape position={[0, 2.0, -3.5]} shapeType="octahedron" color={themeColor} />
        {/* Coordinate grids */}
        <GridPlane color={themeColor} />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          enableRotate={false}
        />
      </Canvas>
    </div>
  );
}
export default CyberScene;