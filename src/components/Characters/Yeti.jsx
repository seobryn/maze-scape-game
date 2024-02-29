import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Yeti(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Yeti.glb");
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
            name="Yeti"
            geometry={nodes.Yeti.geometry}
            material={materials.Atlas}
            skeleton={nodes.Yeti.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Yeti.glb");
