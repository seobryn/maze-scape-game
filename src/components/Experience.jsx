import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Guy } from "./Characters/Guy";
import { Ground } from "./Buildings/Ground";

export function Experience() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <Sky />
      <OrbitControls />
      <Guy position={[0,2,0]}/>
      <Ground />
    </>
  );
}
