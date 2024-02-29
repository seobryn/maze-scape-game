import { Canvas } from '@react-three/fiber'
import { Experience } from './components/Experience'

export function Game() {

  return (
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 30 }}>
      {/* eslint-disable-next-line react/no-unknown-property */}
      <color attach="background" args={["#eeeeee"]} />
      <Experience />
    </Canvas>
  )
}
