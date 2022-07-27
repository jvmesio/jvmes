import { useState, useCallback, useEffect } from 'react';
import ReactFlow, {
  addEdge,
  FitViewOptions,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
  Connection,
  Background,
  MiniMap,
  Controls
} from 'react-flow-renderer';

const dummyActorData: any = [
  {
    movie: 'The Matrix',
    actor: 'Keanu Reeves',
    year: '1999',
    id: '1',
  },
  {
    movie: 'The Matrix Reloaded',
    actor: 'Keanu Reeves',
    year: '2003',
    id: '2',
  },
  {
    movie: 'The Matrix Revolutions',
    actor: 'Keanu Reeves',
    year: '2003',
    id: '3',
  }
];

const initialNodes: Node[] = [
  { id: 'user-node',
    data: { label: <img id="user-photo" src='https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png' className='userNode'/> },
    position: { x: 5, y: 5 } },
  { id: '2',
    data: { label: <button>Keanu</button> },
    position: { x: 5, y: 100 } },
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: 'user-node', target: '2'},
];

const fitViewOptions: FitViewOptions = {
  padding: 0.2
}

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

function Flow({nodes  , edges, setNodes, setEdges}: Props) {
  // const [nodes, setNodes] = useState<Node[]>(initialNodes);
  // const [edges, setEdges] = useState<Edge[]>(initialEdges);

  // useEffect(() => {
  //   const newNode =  { id: 'newMovie1',
  //     data: { label: <img id="user-photo" src='https://flxt.tmsimg.com/assets/p22804_p_v8_av.jpg' className='userNode'/> },
  //     position: { x: 150 , y: 250 } };
  //   setNodes((prevNodes: any) => [...prevNodes, newNode ]);

  //   const newEdge = { id: 'ek-matrix1', source: '2', target: 'newMovie1'};
  //   setEdges((prevEdges: any) => [...prevEdges, newEdge ]);

  // });

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );
  const onConnect = useCallback(
    (connection: Connection) => setEdges((eds) => addEdge(connection, eds)),
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      fitView
      fitViewOptions={fitViewOptions}
      className='nodesDisplay'
      >
        <MiniMap />
        <Controls />
        <Background />
      </ ReactFlow>
  )
}

export default Flow;