'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './App.soy';

class App extends Component {
  _databaseOpenedHandler() {
    this.page = 'passwords';
  }
}

Soy.register(App, templates);

App.STATE = {
  page: {},
};

export default App;
