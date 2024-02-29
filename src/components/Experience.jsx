import { OrbitControls } from '@react-three/drei'

export function Experience() {
    return (
        <>
            <OrbitControls />
            <mesh>
                <boxGeometry />
                <meshNormalMaterial />
            </mesh>
        </>
    )
}