import React, { Component } from 'react';
import ExampleForm from './ExampleForm.js';
import BootstrapExampleForm from './BootstrapExampleForm.js';
import { observer } from 'mobservable-react';

class App extends Component {
  render() {
    return <div className="container">
      <h1>React-Mobservable-Form Demo</h1>
      <a href="https://github.com/JamesHageman/react-mobservable-form-demo">
        Github
      </a>
      <div className="row">

        <div className="col-md-6">
          <h2>Basic Example</h2>
          <ExampleForm onSubmit={(data) => {
            alert('`ExampleForm`, from `App`: ' + JSON.stringify(data));
          }}/>
        </div>

        <div className="col-md-6">
          <h2>Bootstrap Example</h2>
          <BootstrapExampleForm onSubmit={(data) => {
            alert('`BootstrapExampleForm`, from `App`: ' + JSON.stringify(data));
          }}/>
        </div>

      </div>
    </div>;
  }
}

export default observer(App);
