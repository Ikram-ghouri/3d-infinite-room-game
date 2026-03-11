import { useGLTF } from "@react-three/drei";
import { extend } from "@react-three/fiber";
import { BvhPhysicsBody } from "@react-three/viverse";
import { BvhPhysicsSensor } from "@react-three/viverse";
import { useEffect, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { AdditiveBlending, DoubleSide, Color } from "three";
import { shaderMaterial } from "@react-three/drei";
import { useCallback } from "react";
import useWorld from "./hooks/userWorld";

export function Collider(props) {
    const { nodes, materials } = useGLTF("models/room_colliders.glb");
  return (
    <group {...props} dispose={null}>
      <FrameCollider
        frameId={"01"}
        geometry={nodes.collider_01.geometry}
        position={[-4.491, 0.981, 5.815]}
      />
      <FrameCollider
        frameId={"02"}
        geometry={nodes.collider_02.geometry}
        position={[-5.799, 0.981, -4.633]}
      />
      <FrameCollider
        frameId={"03"}
        geometry={nodes.collider_03.geometry}
        position={[-5.799, 0.981, 4.466]}
      />
      <FrameCollider
        frameId={"04"}
        geometry={nodes.collider_04.geometry}
        position={[5.984, 0.981, -4.633]}
      />
      <FrameCollider
        frameId={"05"}
        geometry={nodes.collider_05.geometry}
        position={[5.984, 0.981, 4.466]}
      />
      <FrameCollider
        frameId={"06"}
        geometry={nodes.collider_06.geometry}
        position={[-4.491, 0.981, -5.933]}
      />
      <FrameCollider
        frameId={"07"}
        geometry={nodes.collider_07.geometry}
        position={[4.45, 0.981, -5.933]}
      />
      <FrameCollider
        frameId={"08"}
        geometry={nodes.collider_08.geometry}
        position={[4.45, 0.981, 5.815]}
      />
    </group>
  );
}

const FrameCollider = ({ geometry, position, frameId }) => {
  const gridPosition = useWorld((state) => state.gridPosition);
  const hoveredFrame = useWorld((state) => state.hoveredFrame);
  const setHoveredFrame = useWorld((state) => state.setHoveredFrame);
  const hovered = hoveredFrame === frameId;
  const materialRef = useRef();
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.lifetime = 0;
    }
  }, [gridPosition]);

  useFrame(({ clock }, delta) => {
    if (materialRef.current) {
      materialRef.current.uTime = clock.elapsedTime;
      materialRef.current.lifetime += delta;
      const newHovered = hovered ? 1 : 0;
      if (newHovered !== materialRef.current.hovered) {
        materialRef.current.hoveredChangedAt = clock.elapsedTime;
        materialRef.current.hovered = newHovered;
      }
    }
  });

  const onIntersectedChanged = useCallback(
    (intersected) => {
      const hoveredFrame = useWorld.getState().hoveredFrame;
      if (intersected) {
        setHoveredFrame(frameId);
      } else if (hoveredFrame === frameId) {
        setHoveredFrame(null);
      }
    },
    [frameId, setHoveredFrame]
  );

  return (
    <group position={position}>
      <BvhPhysicsSensor
        onIntersectedChanged={onIntersectedChanged}
        isStatic={false}
      >
        <mesh geometry={geometry}>
          <frameColliderMaterial
            ref={materialRef}
            opacity={0.2}
            transparent
            depthWrite={false}
            blending={AdditiveBlending}
            side={DoubleSide}
            hoverColorFrom={"yellow"}
            hoverColorTo={"#86e9ea"}
            toneMapped={false}
          />
        </mesh>
      </BvhPhysicsSensor>
    </group>
  );
};

const FrameColliderMaterial = shaderMaterial(
  {
    color: new Color("white"),
    hoverColorFrom: new Color("blue"),
    hoverColorTo: new Color("yellow"),
    hovered: 0,
    hoveredChangedAt: 0,
    opacity: 1.0,
    lifetime: 0,
    uTime: 0,
  },
  /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`,
  /* glsl */ `
  varying vec2 vUv;
  uniform vec3 color;
  uniform vec3 hoverColorFrom;
  uniform vec3 hoverColorTo;
  uniform float hoveredChangedAt;
  uniform float hovered;
  uniform float opacity;
  uniform float uTime;
  uniform float lifetime;
  void main() {

      float transitionSpeed = 0.4;
      float alpha = opacity * smoothstep(0.0, transitionSpeed, lifetime);
      vec3 finalColor = color;
      float progression = smoothstep(0.0, transitionSpeed, uTime - hoveredChangedAt );
      float alphaMask = smoothstep(0.7, 1.0, vUv.y);
      float alphaMaskHovered = smoothstep(0.5, 1.0, vUv.y);

      vec2 centeredUv = (vUv * 2.0) - 1.0;
      centeredUv.x *= 1.8; // Adjust for aspect ratio
      vec2 gridUv = centeredUv * 30.0; // Adjust 30.0 for more/fewer dots
      
      // Get fractional part to create repeating grid
      vec2 grid = fract(gridUv);
      
      // Move to center of each grid cell (center at 0.5, 0.5)
      vec2 cellCenter = grid - 0.5;
      
      // Calculate distance from current point to cell center
      float dist = length(cellCenter);
      
      // Create circular dots with a smooth edge
      float dotSize = 0.35; // Adjust for dot size
      float dotsTexture = max(0.5, smoothstep(dotSize +0.01, dotSize - 0.01, dist));
      
      alpha *= mix(dotsTexture, 1.0, smoothstep(0.8, 1.0, vUv.y));

      vec3 hoverColor = mix(hoverColorTo, hoverColorFrom, alphaMaskHovered);

      // vec3 bottomBloom = smoothstep(0.7, 1.0, vUv.y) * (hoverColor * 5.0);
      // hoverColor += bottomBloom;

      if (hovered > 0.0) {
      finalColor = mix(color, hoverColor, progression);
      
      
      alpha *= mix(alphaMask, alphaMaskHovered, progression);
      } else {
      finalColor = mix(hoverColor, color, progression);
      alpha *= mix(alphaMaskHovered, alphaMask, progression);
      }
      gl_FragColor = vec4(finalColor, alpha);
  }
`
);

extend({ FrameColliderMaterial });

useGLTF.preload("models/room_colliders.glb");
