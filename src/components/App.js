import React, { Component } from 'react';
import ExampleForm from './ExampleForm.js';
import { observer } from 'mobservable-react';

class App extends Component {
  render() {
    return <div>
      <h1>React-Mobservable-Form Demo</h1>
      <ExampleForm onSubmit={(data) => {
        alert('From `App`: ' + JSON.stringify(data));
      }}/>
    </div>;
  }
}

export default observer(App);
