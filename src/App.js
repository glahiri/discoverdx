import React from 'react';
import {Provider} from 'react-redux';
import PegaApp from './_components/PegaApp';
import {store} from './store';

const styleLink = document.createElement("link");
styleLink.rel = "stylesheet";
styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
document.head.appendChild(styleLink);


function App() {
  return (
    <Provider store={store}>
        <PegaApp/>
    </Provider>
  );
}

export default App;
