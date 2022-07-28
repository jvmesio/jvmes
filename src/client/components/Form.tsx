import { useEffect, useState, useRef } from 'react';
import styles from '../scss/application.scss';
import ReactFlow, { Node, Edge } from 'react-flow-renderer';
import ImgMediaCard from './ImgMediaCard';

interface MovieData {
  tconst: string,
  primaryTitle: string,
  /** Space separated genres as a string */
  genres: string,
  year: string,
  rating: number
}

type MovieSearchOpt = 'genre' | 'actor' | 'director';

/* custom hook for handling changes in input boxes */
function useInput(init: string) {
  const [ value, setValue ] = useState(init);
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setValue(e.target.value);
  };
  /* return the onChange value instead of setValue function */
  return [ value, setValue, onChange ] as const;
}

function createNode(id: string, xPos: number, yPos: number, label: string | JSX.Element) {
  const actorObj: Node = {
    id,
    position: { x: xPos, y: yPos },
    data: { label }
  };
  return actorObj;
}

function createEdge(sourceId: string, targetId: string) {
  const edgeObj: Edge = {
    id: `${sourceId}-${targetId}`,
    source: sourceId,
    target: targetId
  };
  return edgeObj;
}

interface Props {
  nodes: Node[];
  edges: Edge[];
  setNodes: React.Dispatch<React.SetStateAction<Node<any>[]>>;
  setEdges: React.Dispatch<React.SetStateAction<Edge<any>[]>>;
}

function Form({nodes, edges, setNodes, setEdges }: Props) {
  const [actorInput, setActorInput, actorNameOnChange] = useInput('');
  const [directorInput, setDirectorInput, directorNameOnChange] = useInput('');
  const [actors, setActors] = useState<string[]>([]);
  const [directors, setDirectors] = useState<string[]>([]);
  const [genres, setGenres] = useState<string[]>([]);
  const [fetchedMovies, setFetchedMovies] = useState<object>({});
  
  const xPosMovie: React.MutableRefObject<number> = useRef(300);
  const yPosMovie: React.MutableRefObject<number> = useRef(0);

  const xPosActor: React.MutableRefObject<number> = useRef(600);
  const yPosActor: React.MutableRefObject<number> = useRef(-300);

  // { id: 'user-node',
  //   data: { label: <img id="user-photo" src='https://toppng.com/uploads/preview/circled-user-icon-user-pro-icon-11553397069rpnu1bqqup.png' className='userNode'/> },
  //   position: { x: 5, y: 5 } },
  // { id: '2',
  //   data: { label: <button>Keanu</button> },
  //   position: { x: 5, y: 100 } },
  
  /**
   * Gets recommendations for movies by the given `by` and `searchString`,
   * then creates nodes and edges between the search query and the resulting movies
   */

  //this will checked if the movie/Node already exisit in the fetchedMovies
  //if yes, set edge to the already existing node and changing styling of that node
  //if no, create a new node and proceed as usual
  
  // const tconst = ___.tconst
  // const source = actorObj/movieObj/.tconst
  // There is Harrison Ford and Blade Runner 2049 pre-exisiting
  // sourceNode is Ryan Gosling
  // tconst is id for Blade Runner 2049
  // function alreadyFetched(sourceNode: Node, tconst: string): void {
  //   if(fetchedMovies[tconst]) {
  //     //just add styling
  //   }
  // }
  
  function getRecommends(by: MovieSearchOpt, searchString: string) {

    const doubleRecStyling = {
      border: "1px solid green"
    }

    // Create actor node
    const imageUrl = (
      searchString === 'John Travolta' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/John_Travolta_Cannes_2018_%28cropped%29.jpg/220px-John_Travolta_Cannes_2018_%28cropped%29.jpg'
      : searchString === 'Quentin Tarantino' ? 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0b/Quentin_Tarantino_by_Gage_Skidmore.jpg/220px-Quentin_Tarantino_by_Gage_Skidmore.jpg'
      : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTK7Yq93GcfpJU4PxEYr_iODT_aomZwiz9l1g&usqp=CAU'
    )
    const actorLabel = <div> <img src={imageUrl}/> </div>;
    const actorNode = createNode(searchString, xPosActor.current += 200, yPosActor.current, actorLabel);
    setNodes((prevNodes) => [...prevNodes, actorNode]);

    /* added edgeObj that will connect actor node to user node */
    const edgeNode = createEdge('user-node', searchString);
    setEdges((prevEdges) => [...prevEdges, edgeNode]);

    fetch(`/api/recommendations/?${by}=${searchString}`)
    .then((response) => response.json())
    .then((data) => {
      console.log('Moves by Actor: ', data);
      data.forEach((movie: MovieData, index: number) => {
        const movieLabel = <ImgMediaCard movieName={movie.primaryTitle} movieId={movie.tconst} />;
        const movieNode = createNode(movie.tconst, xPosMovie.current += 120, yPosMovie.current += 50, movieLabel);
        setNodes((prevNodes) => [...prevNodes, movieNode]);

        const movieEdge = createEdge(searchString, movie.tconst);
        setEdges((prevEdges) => [...prevEdges, movieEdge]);
      });
    })
    .catch((err: Error) => console.log(`${err}`));
  }

  const addActor = () => {
    if (!actorInput) return;
    if (!actors.includes(actorInput)) setActors((prev) => ([...prev, actorInput]));
    setActorInput('');

    getRecommends('actor', actorInput);
  };

  const addDirector = () => {
    if (!directorInput) return;
    if (!directors.includes(directorInput)) setDirectors((prev) => ([...prev, directorInput]));
    setDirectorInput('');

    getRecommends('director', directorInput);
  };

  const toggleGenre = (genre: string) => {
    const existingIndex = genres.indexOf(genre);
    if (existingIndex > -1) {
      // Remove genre node
      setNodes((prevNodes) => {
        const newNodes = prevNodes.filter((node) => node.id !== genre);
        return newNodes;
      });
      // Remove related edges
      setEdges((prevEdges) => {
        const newEdges = prevEdges.filter((edge) => !edge.id.match(`${genre}-`));
        return newEdges;
      });
      // TODO: Somehow remove movie nodes as long as they don't have ties to other nodes
      setGenres((prevGenres) => [...prevGenres.slice(0, existingIndex), ...prevGenres.slice(existingIndex + 1)]);
    }
    else {
      setGenres((prevGenres) => [...prevGenres, genre]);

      getRecommends('genre', genre);
    }
  };

  const handleActorRemove = (actorIndex: number) => {
    // TODO: Remove Node/edges
    setActors((prev) => [...prev.slice(0, actorIndex), ...prev.slice(actorIndex + 1)]);
  };

  const handleDirectorRemove = (directorIndex: number) => {
    // TODO: Remove Node/edges
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

  const genreOptions = ['Animation', 'Action', 'Short', 'Comedy', 'Documentary', 'Horror', 'Drama', 'Biography', 'Fantasy', 'Family', 'Adventure', 'Romance', 'Western'];
  const genreCheckBoxes = genreOptions.map(genre =>
    <label htmlFor={genre} className='checkbox' key={genre} onClick={() => toggleGenre(genre)}>
      <input type='checkbox' className='checkbox' id={genre} value={genre} /> {genre}
    </label>
  );

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
