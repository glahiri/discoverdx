import React from 'react';
import {Provider} from 'react-redux';
import PegaApp from './_components/PegaApp';
import {store} from './store';
import 'semantic-ui-css/semantic.min.css'


function App() {
  return (
    <Provider store={store}>
        <PegaApp/>
    </Provider>
  );
}

export default App;
