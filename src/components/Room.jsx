import { Gltf, useGLTF, useTexture } from "@react-three/drei";
import userWorld from "./hooks/userWorld";
import { Suspense } from "react";
import { useMemo } from "react";

export const Room = ({ x, y, ...props }) => {
  const { nodes } = useGLTF("models/room_pictures.glb");
  const photos = userWorld((state) => state.photos);

  // Compute the photos for this room tile
  const roomPhotos = useMemo(() => {
    const key = `${x}_${y}`;
    return photos[key] || {};
  }, [photos, x, y]);

  return (
    <group {...props} dispose={null}>
      <Gltf src="models/room.glb" receiveShadow />

      {/* PICTURE 02 */}
      <mesh
        geometry={nodes.Picture_02.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >

        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["02"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 01 */}
      <mesh
        geometry={nodes.Picture_01.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["01"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 03 */}
      <mesh
        geometry={nodes.Picture_03.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["03"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 04 */}
      <mesh
        geometry={nodes.Picture_04.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["04"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 05 */}
      <mesh
        geometry={nodes.Picture_05.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, Math.PI / 2]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["05"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 06 */}
      <mesh
        geometry={nodes.Picture_06.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["06"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 07 */}
      <mesh
        geometry={nodes.Picture_07.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["07"]?.photoUrl} />
        </Suspense>
      </mesh>

      {/* PICTURE 08 */}
      <mesh
        geometry={nodes.Picture_08.geometry}
        position={[0, 2.676, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <Suspense fallback={<PhotoMaterial />}>
        <PhotoMaterial url={roomPhotos["02"]?.photoUrl} />
        </Suspense>
      </mesh>
    </group>
  );
};

// Custom material (must be PascalCase for JSX)
const PhotoMaterial = () => {
  const texture = useTexture( "/images/empty.webp");
  return <meshStandardMaterial map={texture} color="white" />;
};

useGLTF.preload("models/room_pictures.glb");
useGLTF.preload("models/room.glb");
