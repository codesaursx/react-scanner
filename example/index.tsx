import 'react-app-polyfill/ie11';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { Scanner } from '../.';

const App = () => {
  const [code, setCode] = React.useState('');
  return (
    <div>
      <Scanner
        width="400px"
        height="400px"
        delay={2000}
        onUpdate={(e, data) => {
          if (data) {
            console.log(data);
            setCode(data.getText());
          }
        }}
      />
      <p>result: {code}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
