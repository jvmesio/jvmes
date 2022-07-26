import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Controls,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
} from 'react-flow-renderer';

const Display = (): JSX.Element => {
  const initialNodes: Node[] = [
    {
      id: '1',
      type: 'input',
      data: { label: 'Zookeeper' },
      position: { x: 250, y: 450 },
    },
    {
      id: '2',
      data: { label: 'Kafka 1' },
      position: { x: 250, y: 550 },
    }
  ];

  const initialEdges: Edge[] = [
    { id: 'el-1', source: '1', target: '2' }
  ];
  const [nodes, setNodes] = useState<Node[]>(initialNodes); // initialize nodes to be the default nodes
  const [edges, setEdges] = useState<Edge[]>(initialEdges); // initialize edges (lines that connect nodes) to the defaults

  const onNodesChange = useCallback(
    (changes: NodeChange[]) => setNodes((nds) => applyNodeChanges(changes, nds)),
    [setNodes]
  );
  const onEdgesChange = useCallback(
    (changes: EdgeChange[]) => setEdges((eds) => applyEdgeChanges(changes, eds)),
    [setEdges]
  );


  return (
    <div className='w-[100%] h-[85vh] relative' id='dragCanvas'>
      <ReactFlow
        className='z-[999]'
        nodes={nodes}
        edges={edges}
        defaultNodes={nodes}
        defaultEdges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        fitView
        style={{background: '#cbd5e1'}}
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div >
  );
};

export default Display;