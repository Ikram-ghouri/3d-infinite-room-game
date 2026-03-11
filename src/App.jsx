import { Canvas } from "@react-three/fiber";
import { Experience } from "./components/Experience";
import { Viverse } from "@react-three/viverse";
import { UI } from "./components/ui/UI";
function App() {
  return (
    <Viverse clientId={import.meta.env.VITE_VIVERSE_APP_ID}>
      <UI/>
    <Canvas shadows camera={{ position: [3, 3, 3], fov: 40 }} gl={{
      preserveDrawingBuffer:true
    }}>
      <color attach="background" args={["#151118"]} />
      <fog attach={"fog"} color='#151118' near={16} far={22} />
      
      <Experience />
    </Canvas>
    </Viverse>
  );
}

export default App;