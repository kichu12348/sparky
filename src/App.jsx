import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";
import "./App.css";
import { Suspense, useState } from "react";

function Model() {
  const { scene } = useGLTF("/models/sparky_glb.glb");
  const [rotateY, setRotateY] = useState(-Math.PI / 2);

  useFrame(() => {
    setRotateY((prev) => prev + 0.01);
    scene.rotation.y = rotateY;
  });
  return (
    <mesh>
      <OrbitControls
        enableZoom={true}
        enablePan={true}
        enableRotate={true}
        minDistance={1}
        maxDistance={5}
        target={[0, 0, 0]}
      />
      <primitive
        object={scene}
        scale={1}
        position={[0, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        castShadow
        autoRotate
        autoRotateSpeed={2}
      />
    </mesh>
  );
}

const FallBack = () => {
  return (
    <div
      style={{
        height: "100vh",
        width: "100vw",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",

        "h1": {
          fontSize: "2rem",
          color: "#fff",
        },
        "p": {
          fontSize: "1rem",
          color: "#ccc",
        },
      }}
    >
      <h1>Loading...</h1>
      <p>Please wait while the model is loading.</p>
    </div>
  );
};

function App() {
  return (
    <>
      <Suspense fallback={<FallBack />}>
        <Canvas
          style={{ height: "100svh", width: "100vw" }}
          camera={{ position: [0, 0, 2], fov: 75 }}
          shadows
        >
          <ambientLight intensity={10} />
          <directionalLight position={[5, 5, 5]} intensity={5} castShadow />

          <Model />
        </Canvas>
      </Suspense>
    </>
  );
}

export default App;
