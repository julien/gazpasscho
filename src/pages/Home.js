'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';
const {ipcRenderer} = require('electron');
const {dialog} = require('electron').remote;

import templates from './Home.soy';

class Home extends Component {
  created() {
    ipcRenderer.on('error', (event, error) => {
      alert(error.code);
    });

    ipcRenderer.on('databaseOpened', event => {
      this.emit('databaseOpened');
    });
    ipcRenderer.on('dbExists', (event, error) => {
      this.emit('databaseOpened');
    });
    ipcRenderer.send('doesDBExist');
  }

  _selectFileHandler(event) {
    let self = this;
    dialog.showOpenDialog(fileNames => {
      if (fileNames === undefined) {
        return;
      }

      self.element.querySelector('#databaseFile').value = fileNames[0];
    });
  }

  _submitHandler(event) {
    event.preventDefault();

    let form = event.delegateTarget;

    let databaseFile = form.querySelector('#databaseFile').value;

    let databasePassword = form.querySelector('#databasePassword').value;

    ipcRenderer.send('open', {
      databaseFile: databaseFile,
      databasePassword: databasePassword,
    });
  }
}

Soy.register(Home, templates);

export default Home;
