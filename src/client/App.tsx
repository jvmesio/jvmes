import React from 'react';
// import Display from './components/Display';
import Form from './components/Form';
import ImgMediaCard from './components/ImgMediaCard';
import NodesDisplay from './components/NodesDisplay';
import { useEffect, useState } from 'react';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';

/* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
function openNav() {
  const sideBarWidth = document.getElementById("mySidebar") as HTMLDivElement;
  sideBarWidth.style.width = '250px';
  const main = document.getElementById("main") as HTMLDivElement;
  main.style.marginLeft = '250px';
}

/* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
function closeNav() {
  const sideBarWidth = document.getElementById("mySidebar") as HTMLDivElement;
  sideBarWidth.style.width = '0';
  const main = document.getElementById("main") as HTMLDivElement;
  main.style.marginLeft = '0';
}

export default function App() {

  const [nodes, setNodes] = useState<Node[]>([]);
  const [edges, setEdges] = useState<Edge[]>([]);
  
  return (
    <>
      <div id="mySidebar" className="sidebar">
        <a className="closebtn" onClick={() => closeNav()}>&times;</a>
        <Form nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
      </div>

      <div id="main"className="greeting">
        <button className="openbtn" onClick={() => openNav()}>&#9776; Open Sidebar</button>
        {/* <ImgMediaCard /> */}

      </div>
      <div id="nodes-display">

        <NodesDisplay nodes={nodes} edges={edges} setNodes={setNodes} setEdges={setEdges}/>
      </div>

    </>
  );
}