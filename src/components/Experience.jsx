import { Environment, OrbitControls, Sky } from "@react-three/drei";
import { Guy } from "./Characters/Guy";
import { Ground } from "./Buildings/Ground";
import { CharacterController } from "./CharacterController";

export function Experience() {
  return (
    <>
      <Environment preset="sunset" />
      <ambientLight intensity={0.5} />
      <Sky />
      <OrbitControls />
      <CharacterController Model={Guy} />
      <Ground />
    </>
  );
}
