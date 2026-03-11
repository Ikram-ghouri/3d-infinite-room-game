import userWorld, { GRID_CELL_SIZE, HALF_GRID_CELL_SIZE } from "./hooks/userWorld";
import {BvhPhysicsBody, PrototypeBox} from "@react-three/viverse";
import { Text } from "@react-three/drei";
import { Collider } from "./Collider";

import { Room } from "./Room";




export const InfiniteWorld = ({...props}) => {
    const gridPosition = userWorld((state) => state.gridPosition);
    const gridSize = userWorld((state) => state.gridSize);
    return (
    <group
        {...props} 
        position-x={(-gridSize.x/2)*GRID_CELL_SIZE + HALF_GRID_CELL_SIZE} //center the grid
        position-y={0.5}
        position-z={(-gridSize.y/2) * GRID_CELL_SIZE + HALF_GRID_CELL_SIZE} //center the grid
    >
        {Array.from({length: gridSize.x},(_,i) =>i).map((x)=>
            Array.from({length: gridSize.y},(_,j) =>j).map((y)=>{
                const roomX = x + gridPosition.x -Math.floor(gridSize.x/2);
                const roomY = y + gridPosition.y -Math.floor(gridSize.y/2);
                return (
                    <group
                    key = {`${x}-${y}`}
                    position={[
                        x*GRID_CELL_SIZE+gridPosition.x*GRID_CELL_SIZE,
                        0,
                        y*GRID_CELL_SIZE+gridPosition.y*GRID_CELL_SIZE
                    ]} 
                    >
                    {gridPosition.x === roomX && gridPosition.y === roomY && (
                        <Collider/>
                    )}
                    <BvhPhysicsBody kinematic>
                        <Room x={roomX} y={roomY}/>
                    </BvhPhysicsBody>
                    <Text
                        fontSize={1}
                        position-y={0}
                        rotation-x={-Math.PI/2}
                        fontWeight="bold"
                        textAlign="center"
                        lineHeight={1}
                        recieveShadow
                    >
                        ROOM{"\n"}[{roomX},{roomY}]
                        <meshStandardMaterial color="white"/>


                    </Text>
                </group>
                );
            })
            )}
    </group>
    )
}