import { InfiniteWorld } from "./infiniteWorld";
import { PhotoBooth } from "./PhotoBooth";
import {
  SimpleCharacter,

  BvhPhysicsWorld,
} from "@react-three/viverse";
import useWorld from "./hooks/userWorld";
import { Suspense, useRef, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";

export const Experience = () => {
  
  const characterRef = useRef();
  
  const avatar = useWorld((state) => state.avatar);
  const computeCharacterCell = useWorld((state) => state.computeCharacterCell);
  const mode = useWorld((state) => state.mode) || 'explore'; // Get mode from store or default to 'explore'
  
  const gl = useThree((state) => state.gl);  
  const setgl = useWorld((state) => state.setGl);
  const characterPosition = useWorld((state) => state.characterPosition);  
  const position = [0, 3, 0] || characterPosition ;
  useEffect(() => {
    setgl(gl);
  }, [gl, setgl]);

  useFrame(() => {
    if (characterRef.current && computeCharacterCell) {
      computeCharacterCell(characterRef.current.position);
    }
  });
  
  return (
    <BvhPhysicsWorld gravity={[0, -9.81, 0]}>

      {/* Basic lighting */}
      <directionalLight
        intensity={1.2}
        position={[5, 10, 10]}
        castShadow
      />
      <ambientLight intensity={1} />
{mode === 'explore' &&(
  <Suspense>
      {/* Character MUST be inside the physics world */}
      <SimpleCharacter position={position}
      
        ref={characterRef}
        model={avatar ? {
          type: 'vrm',
          url: avatar.vrmUrl,
          castShadow: true,
          receiveShadow: true,
        } : undefined}
      />
</Suspense>
)}
    <InfiniteWorld visible={mode === 'explore'}/>
    <PhotoBooth visible={mode === 'photos'}/>
</BvhPhysicsWorld>
  );
};
