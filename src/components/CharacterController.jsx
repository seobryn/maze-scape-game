import { useKeyboardControls } from "@react-three/drei";
import { Controls } from "../config";
import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useState } from "react";

const MOVEMENT_TOLERANCE = 0.1;

const JUMP_FORCE = 3;
const MOVEMENT_SPEED = 1;
const MAX_VEL = 3;

const AnimationStates = {
  Death: "Death",
  Duck: "Duck",
  HitReact: "HitReact",
  Idle: "Idle",
  Idle_Attack: "Idle_Attack",
  Idle_Hold: "Idle_Hold",
  Jump: "Jump",
  Jump_Idle: "Jump_Idle",
  Jump_Land: "Jump_Land",
  No: "No",
  Punch: "Punch",
  Run: "Run",
  Run_Attack: "Run_Attack",
  Run_Hold: "Run_Hold",
  Walk: "Walk",
  Walk_Hold: "Walk_Hold",
  Wave: "Wave",
  Yes: "Yes",
};

export function CharacterController({ Model }) {
  const forward = useKeyboardControls((state) => state[Controls.forward]);
  const backward = useKeyboardControls((state) => state[Controls.backward]);
  const left = useKeyboardControls((state) => state[Controls.left]);
  const right = useKeyboardControls((state) => state[Controls.right]);
  const jump = useKeyboardControls((state) => state[Controls.jump]);

  const [animationState, setAnimationState] = useState(AnimationStates.Idle);

  const rb = useRef();
  const character = useRef();
  const isInFloor = useRef(true);

  const validateAnimations = (linVel) => {
    if (linVel.y >= 0.2) {
      setAnimationState(AnimationStates.Jump_Idle);
      return;
    }
    if (
      Math.abs(linVel.x) >= MOVEMENT_TOLERANCE ||
      Math.abs(linVel.z) >= MOVEMENT_TOLERANCE
    ) {
      setAnimationState(AnimationStates.Walk);
    } else {
      setAnimationState(AnimationStates.Idle);
    }
  };

  useFrame(() => {
    const impulse = { x: 0, y: 0, z: 0 };
    const linVel = rb.current.linvel();
    let applyRotation = false;

    if (jump && isInFloor.current) {
      impulse.y += JUMP_FORCE;
      isInFloor.current = false;
    }

    if (right && linVel.x < MAX_VEL) {
      impulse.x += MOVEMENT_SPEED;
      applyRotation = true;
    } else if (left && linVel.x > -MAX_VEL) {
      impulse.x -= MOVEMENT_SPEED;
      applyRotation = true;
    }

    if (forward && linVel.z > -MAX_VEL) {
      impulse.z -= MOVEMENT_SPEED;
      applyRotation = true;
    } else if (backward && linVel.z < MAX_VEL) {
      impulse.z += MOVEMENT_SPEED;
      applyRotation = true;
    }

    rb.current.applyImpulse(impulse, true);
    if (applyRotation) {
      const angle = Math.atan2(linVel.x, linVel.z);
      character.current.rotation.y = angle;
    }

    validateAnimations(linVel);
  });

  return (
    <Model
      rigidBody={rb}
      characterRef={character}
      lockRotations
      state={animationState}
      rotation={[0, Math.PI, 0]}
      onCollisionEnter={() => {
        isInFloor.current = true;
      }}
    />
  );
}
