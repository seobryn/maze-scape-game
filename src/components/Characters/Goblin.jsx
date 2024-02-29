import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Goblin(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Goblin.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props}>
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="EnemyArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="Goblin"
            geometry={nodes.Goblin.geometry}
            material={materials.Atlas}
            skeleton={nodes.Goblin.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={147.976}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Goblin.glb");
