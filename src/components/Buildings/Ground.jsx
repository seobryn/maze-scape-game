import { RigidBody, CuboidCollider } from "@react-three/rapier";
export function Ground() {
  return (
    <RigidBody gravityScale={0}>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#333" />
      </mesh>
      <CuboidCollider args={[100, 0.1, 100]} />
    </RigidBody>
  );
}
