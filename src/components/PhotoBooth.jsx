import { CameraControls, Gltf, shaderMaterial } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import {
  CharacterModelBone,
  SimpleCharacter,
} from "@react-three/viverse";
import { Suspense, useEffect, useRef } from "react";
import { BackSide, Color } from "three";
import useWorld from "./hooks/userWorld";

// Mixamo bone mapping for VRM avatars
const mixamoBoneMap = {
  mixamorigHips: "hips",
  mixamorigSpine: "spine",
  mixamorigSpine1: "chest",
  mixamorigSpine2: "upperChest",
  mixamorigNeck: "neck",
  mixamorigHead: "head",
  mixamorigLeftShoulder: "leftShoulder",
  mixamorigLeftArm: "leftUpperArm",
  mixamorigLeftForeArm: "leftLowerArm",
  mixamorigLeftHand: "leftHand",
  mixamorigRightShoulder: "rightShoulder",
  mixamorigRightArm: "rightUpperArm",
  mixamorigRightForeArm: "rightLowerArm",
  mixamorigRightHand: "rightHand",
  mixamorigLeftUpLeg: "leftUpperLeg",
  mixamorigLeftLeg: "leftLowerLeg",
  mixamorigLeftFoot: "leftFoot",
  mixamorigLeftToeBase: "leftToes",
  mixamorigRightUpLeg: "rightUpperLeg",
  mixamorigRightLeg: "rightLowerLeg",
  mixamorigRightFoot: "rightFoot",
  mixamorigRightToeBase: "rightToes",
};

export const PhotoBooth = ({ visible = false }) => {
  const avatar = useWorld((state) => state.avatar);
  const pose = useWorld((state) => state.pose);

  const controls = useRef();
  useEffect(() => {
    if (visible && controls.current) {
      controls.current.setLookAt(0, 1, -100, 0, 1, 0, false);
      controls.current.setLookAt(0, 1, -5, 0, 0.5, 0, true);
    }
  }, [visible]);

  const item = useWorld((state) => state.item);
  const theme = useWorld((state) => state.theme);

  return (
    <group visible={visible}>
      {visible && (
        <>
          <CameraControls ref={controls} maxDistance={5} minDistance={1} />
          <mesh>
            <sphereGeometry args={[42, 16, 16]} />
            <gradientBackgroundMaterial
              from={theme.from}
              to={theme.to}
              side={BackSide}
            />
          </mesh>
          <directionalLight intensity={2} position={[3, 2, -3]} />
          <directionalLight
            intensity={3}
            position={[-2, 2, 4]}
            color={theme.to}
          />
          <directionalLight
            intensity={3}
            position={[2, 2, 4]}
            color={theme.from}
          />
          <Suspense>
            <SimpleCharacter
              physics={false}
              cameraBehavior={false}
              model={
                avatar
                  ? {
                      type: "vrm",
                      url: avatar?.vrmUrl,
                      castShadow: true,
                      receiveShadow: true,
                    }
                  : undefined
              }
              animation={{
                idle: {
                  type: "gltf",
                  url: pose.url,
                  boneMap: mixamoBoneMap,
                },
              }}
              movement={{
                walk: false,
                run: false,
              }}
            >
              {item && (
                <CharacterModelBone bone={item.bone}>
                  <Gltf
                    src={item.model}
                    scale={item.scale}
                    position={item.position}
                    rotation={item.rotation}
                    // scale={0.6}
                    // position={[-0.08, 0.02, 0]}
                    // rotation={[0, Math.PI, -0.4]}
                  />
                </CharacterModelBone>
              )}
            </SimpleCharacter>
          </Suspense>
        </>
      )}
    </group>
  );
};

const GradientBackgroundMaterial = shaderMaterial(
  {
    from: new Color("white"),
    to: new Color("black"),
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  /* glsl */ `
  uniform vec3 from;
  uniform vec3 to;
  varying vec2 vUv;
  void main() {
    vec3 color = mix(from, to, smoothstep(0.4, 0.6, vUv.y));
    gl_FragColor = vec4(color, 1.0);
  }
`
);

extend({ GradientBackgroundMaterial });
