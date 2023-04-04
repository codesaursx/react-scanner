# @CodesaursX/react-scanner

A React component to read QR and Barcodes in web-applications.

## Installation

```zsh
npm install @codesaursx/react-scanner --save
# or
yarn add @codesaursx/react-scanner
```

## Usage

Once you install the package, you can import the component and use it as follow:

```ts
import { useState } from 'react';
import { Scanner } from '@codesaursx/react-scanner';

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
```

## Contributing

Contributions are always welcome, please open an issue first. :)

## License

[MIT](https://choosealicense.com/licenses/mit/)
