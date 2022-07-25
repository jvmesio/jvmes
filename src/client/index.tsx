import { render } from 'react-dom';

function TestComp() {
  return <span>Hi</span>;
}

render(<TestComp />, document.querySelector('#root'));