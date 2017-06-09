'use strict';

import Component from 'metal-component';
import Soy from 'metal-soy';

import templates from './Home.soy';

class Home extends Component {}
Soy.register(Home, templates);

export default Home;
