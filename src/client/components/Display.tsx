import React, { useCallback, useState, useRef } from 'react';
import ReactFlow, {
  Controls,
  addEdge,
  Background,
  applyNodeChanges,
  applyEdgeChanges,
  Node,
  Edge,
  NodeChange,
  EdgeChange,
} from 'react-flow-renderer';

const Display = (): JSX.Element => {
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