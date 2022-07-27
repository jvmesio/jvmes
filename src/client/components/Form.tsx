import { useEffect, useState } from 'react';
import styles from '../scss/application.scss';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import ImgMediaCard from './ImgMediaCard';




/* custom hook for handling changes in input boxes */
function useInput(init: string) {
  const [ value, setValue ] = useState(init);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  /* return the onChange value instead of setValue function */
  return [ value, setValue, onChange ] as const;
}

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

const dummyActorData = [
  {
    primaryTitle: 'The Matrix',
    year: '1999',
    id: '1',
    genre: ['Action', 'Sci-fi'],
    director: 'Wachowski Brothers/Sisters'
  },
  {
    primaryTitle: 'The Matrix Reloaded',
    year: '2003',
    id: '2',
    genre: ['Action', 'Sci-fi'],
    director: 'Wachowski Brothers/Sisters'
  },
  {
    primaryTitle: 'The Matrix Revolutions',
    year: '2003',
    id: '3',
    genre: ['Action', 'Sci-fi'],
    director: 'Wachowski Brothers/Sisters'
  }
];


function Form({nodes  , edges, setNodes, setEdges }: Props) {
  const [actorInput, setActorInput, actorNameOnChange] = useInput('');
  const [directorInput, setDirectorInput, directorNameOnChange] = useInput('');
  const [actors, setActors] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);


  // { id: 'user-node',
  //   data: { label: <img id="user-photo" src='https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png' className='userNode'/> },
  //   position: { x: 5, y: 5 } },
  // { id: '2',
  //   data: { label: <button>Keanu</button> },
  //   position: { x: 5, y: 100 } },

  //Edges sample
  //{ id: 'e1-2', source: 'user-node', target: '2'},
  const addActor = () => {
    if (!actorInput) return;
    if (!actors.includes(actorInput)) setActors((prev) => ([...prev, actorInput]));
    setActorInput('');

    
    
    const actorObj: any = {};
    actorObj.data = {};
    actorObj.id = actorInput;
    actorObj.data.label = <div> <img src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7Yq93GcfpJU4PxEYr_iODT_aomZwiz9l1g&usqp=CAU'/> </div>;
    actorObj.position = { x: 400, y: -200 };
    setNodes((prevNodes) => [...prevNodes, actorObj]);
    
    /* added edgeObj that will connect actorInput nodes to main, usernode */
    const edgeObj: any = {};
    edgeObj.id = `user-node-${actorInput}`;
    edgeObj.source = 'user-node';
    edgeObj.target = actorInput;
    setEdges((prevEdges) => [...prevEdges, edgeObj]);
/*     
    fetch(`/api/recommendations/?actor=${actorInput}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Moves by Actor: ', data);
      data.forEach((movie: any, index: number) => {
      const movieObj: any = {};
      movieObj.data = {};

      movieObj.id = movie.id;
      movieObj.data.label = <ImgMediaCard movieName={movie.primaryTitle} />;
      movieObj.position = { x: (index * 200), y: (index  * 200) };
      setNodes((prevNodes) => [...prevNodes, movieObj]);

      const edgeObj: any = {};
      edgeObj.id = `${movie.actor}-${movie.primaryTitle}`;
      edgeObj.source = movie.actor;
      edgeObj.target = movie.id;
      setEdges((prevEdges) => [...prevEdges, edgeObj]);
    })
    .catch((err: Error) => console.log(`${err}`); */


    dummyActorData.forEach((movie: any, index: number) => {
      const movieObj: any = {};
      movieObj.data = {};

      movieObj.id = movie.id;
      movieObj.data.label = <ImgMediaCard movieName={movie.primaryTitle} movieId={movieObj.id} />;
      movieObj.position = { x: (index * 200), y: (index * 200) };
      setNodes((prevNodes) => [...prevNodes, movieObj]);

      const edgeObj: any = {};
      edgeObj.id = `${actorInput}-${movie.primaryTitle}`;
      edgeObj.source = actorInput;
      edgeObj.target = movie.id;
      setEdges((prevEdges) => [...prevEdges, edgeObj]);
    });
  };

  const addDirector = () => {
    if (!directorInput) return;
    if (!directors.includes(directorInput)) setDirectors((prev) => ([...prev, directorInput]));
    setDirectorInput('');
  };

  const handleActorRemove = (actorIndex: number) => {
    setActors((prev) => [...prev.slice(0, actorIndex), ...prev.slice(actorIndex + 1)]);
  };

  const handleDirectorRemove = (directorIndex: number) => {
    setDirectors((prev) => [...prev.slice(0, directorIndex), ...prev.slice(directorIndex + 1)]);
  };

  const actorElements = actors.map((actor, i) =>
    <li key={actor}>
      {actor} <button onClick={() => handleActorRemove(i)}>X</button>
    </li>
  );

  const directorElements = directors.map((director, i) =>
    <li key={director}>
      {director} <button onClick={() => handleDirectorRemove(i)}>X</button>
    </li>
  );

  const genres = ['Animation', 'Short', 'Comedy', 'Documentary', 'Horror', 'Drama', 'Biography', 'Fantasy', 'Family', 'Adventure', 'Romance', 'Western'];
  const genreCheckBoxes = genres.map(genre =>
    <label htmlFor={genre} className='checkbox' key={genre} >
      <input type='checkbox' className='checkbox' id={genre} value={genre} /> {genre}
    </label>);

  return (
    <section>
      <div className="user-form">
        <form id="actors-form" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label>Actor</label>
            <input type="text" placeholder="Name" value={actorInput} onChange={actorNameOnChange} />
            <button onClick={addActor}>
            Add
            </button>
          </div>
          <div id="actors">
            {actorElements}
          </div>
        </form>

        <form id="director-form" onSubmit={(e) => e.preventDefault()}>
          <label>Director</label>
          <input id="directorName" type="text" placeholder="Name" value={directorInput} onChange={directorNameOnChange} />
          <button id="submit-director" onClick={addDirector}>
            Add
          </button>
          <div id="directors">
            {directorElements}
          </div>
        </form>
        <div id="genre-checkbox">
          {genreCheckBoxes}
        </div>
      </div>
    </section>
  );
}

export default Form;