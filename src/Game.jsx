import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";

export function Game() {
  return (
    <Canvas shadows camera={{ position: [8, 8, 8], fov: 70 }}>
      <color attach="background" args={["#eeeeee"]} />
      <Suspense>
        <Physics debug>
          <Experience />
        </Physics>
      </Suspense>
    </Canvas>
  );
}
