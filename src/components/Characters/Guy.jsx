import { useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useState } from "react";
import { useEffect } from "react";
import { useMemo } from "react";
import { useGraph } from "@react-three/fiber";
import { SkeletonUtils } from "three-stdlib";
import { RigidBody, CapsuleCollider } from "@react-three/rapier";

const ANIMATION_PREFIX =
  "CharacterArmature|CharacterArmature|CharacterArmature";

export function Guy({ ...props }) {
  const group = useRef();
  const { scene, materials, animations } = useGLTF("/models/Guy.glb");

  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  const { actions } = useAnimations(animations, group);

  const [animation, setAnimation] = useState(`${ANIMATION_PREFIX}|Idle`);

  useEffect(() => {
    actions[animation].reset().fadeIn(0.5).play();
    return () => actions[animation].fadeOut(0.5);
  }, [animation]);

  return (
    <RigidBody ref={group} {...props} colliders={false} lockRotations>
      <CapsuleCollider args={[0.3, 1, 0.3]} position={[0, 1.3, 0]} />
      <group>
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
              material={materials.Atlas}
              skeleton={nodes.Character.skeleton}
              rotation={[-Math.PI / 2, 0, 0]}
              scale={100}
            />
          </group>
        </group>
      </group>
    </RigidBody>
  );
}

useGLTF.preload("/models/Guy.glb");
