import { RigidBody, CuboidCollider } from "@react-three/rapier";
export function Ground() {
  return (
    <RigidBody mass={0} type="fixed">
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <CuboidCollider args={[50, 0.1, 50]} />
    </RigidBody>
  );
}
