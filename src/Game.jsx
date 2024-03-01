import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Suspense } from "react";
import { Physics } from "@react-three/rapier";
import { useMemo } from "react";
import { Controls } from "./config";
import { KeyboardControls } from "@react-three/drei";

export function Game() {
  const keyMap = useMemo(
    () => [
      { name: Controls.forward, keys: ["KeyW"] },
      { name: Controls.backward, keys: ["KeyS"] },
      { name: Controls.left, keys: ["KeyA"] },
      { name: Controls.right, keys: ["KeyD"] },
      { name: Controls.jump, keys: ["Space"] },
    ],
    []
  );

  return (
    <KeyboardControls map={keyMap}>
      <Canvas shadows camera={{ position: [8, 8, 8], fov: 70 }}>
        <color attach="background" args={["#eeeeee"]} />
        <Suspense>
          <Physics debug>
            <Experience />
          </Physics>
        </Suspense>
      </Canvas>
    </KeyboardControls>
  );
}
