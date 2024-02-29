import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

export function Woman(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/Woman.glb");
  const { actions } = useAnimations(animations, group);
  return (
    <group ref={group} {...props} >
      <group name="Root_Scene">
        <group name="RootNode">
          <group
            name="CharacterArmature"
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          >
            <primitive object={nodes.Root} />
          </group>
          <skinnedMesh
            name="Character"
            geometry={nodes.Character.geometry}
            material={materials["Atlas.001"]}
            skeleton={nodes.Character.skeleton}
            rotation={[-Math.PI / 2, 0, 0]}
            scale={100}
          />
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/Woman.glb");
