import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import QuickStart from './containers/desktop/datalogger/quickstart/QuickStart';
import Datalogger from './layouts/datalogger/Datalogger';
import Error from './layouts/error/Error';
import Login from './layouts/login/Login';
import Scada from './layouts/scada/Scada';
import ScadaDashboard from './containers/desktop/scada/daskboard/Dashboard';
import Devices from './containers/desktop/datalogger/devices/Devices';
import ScadaDevices from './containers/desktop/scada/devices/Devices';

export default class App extends Component {
  render() {
    return (
        <div className="App">
          <Routes>
            <Route path='/' element = {<Login />}> </Route>

            <Route path='/datalogger' element = {<Datalogger />}>
              <Route index element = {<QuickStart />} />
              <Route path='devices' element = {<Devices />} />
            </Route>

            <Route path='/scada' element = {<Scada />}>
              {/* <Route index element = {<ScadaDashboard />} /> */}
              <Route path='dashboard' element = {<ScadaDashboard />} />
              <Route path='devices' element = {<ScadaDevices />} />
            </Route>

            <Route path='/*' element = {<Error />} />

          </Routes>
        </div>
    );
  };
}

