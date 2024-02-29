import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef } from "react";

export function Giant(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Giant.glb");
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
            name="Giant"
            geometry={nodes.Giant.geometry}
            material={materials["Atlas.001"]}
            skeleton={nodes.Giant.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={86.601}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Giant.glb");
