import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import QuickStart from './containers/desktop/datalogger/quickstart/QuickStart';
import Datalogger from './layouts/datalogger/Datalogger';
import Error from './layouts/error/Error';
import LoginAdmin from './layouts/login/loginAdmin/LoginAdmin';
import ForgotPassword from './layouts/login/forgotPassword/ForgotPassword';
import ResetPassword from './layouts/login/resetPassword/ResetPassword';
import Scada from './layouts/scada/Scada';
import ScadaDashboard from './containers/desktop/scada/daskboard/Dashboard';
import Devices from './containers/desktop/datalogger/devices/Devices';
import ScadaDevices from './containers/desktop/scada/devices/Devices';
import RS485 from './containers/desktop/datalogger/RS485/RS485';
import Device from './containers/desktop/datalogger/RS485/device/Device';
import Options from './containers/desktop/datalogger/RS485/options/Options';
import Templates from './containers/desktop/datalogger/templates/Templates';
import TemplatesManagement from './containers/desktop/datalogger/templates/templatesManagement/TemplatesManagement';
import Template from './containers/desktop/datalogger/templates/template/Template';
import PointList from './containers/desktop/datalogger/templates/template/pointList/PointList';
import RegisterBlocks from './containers/desktop/datalogger/templates/template/registerBlocks/RegisterBlocks';
import Advanced from './containers/desktop/datalogger/templates/template/advanced/Advanced';

import SiteInformation from './containers/desktop/datalogger/quickstart/siteInformation/SiteInformation';
import EnthernetOne from './containers/desktop/datalogger/quickstart/ethernetOne/EthernetOne';
import EnthernetTwo from './containers/desktop/datalogger/quickstart/ethernetTwo/EthernetTwo';
import Firmware from './containers/desktop/datalogger/quickstart/firmware/Firmware';
import RS485One from './containers/desktop/datalogger/quickstart/rs485One/Rs485One';
import RS485Two from './containers/desktop/datalogger/quickstart/rs485Two/Rs485Two';

import LoggingRate from './containers/desktop/datalogger/quickstart/loggingRate/LoggingRate';
import UploadChannels from './containers/desktop/datalogger/quickstart/uploadChannels/UploadChannels';
import RemoteAccess from './containers/desktop/datalogger/quickstart/remoteAccess/RemoteAccess';
import Done from './containers/desktop/datalogger/quickstart/done/Done';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Routes>
                    <Route path='/' element = {<LoginAdmin />}> </Route>
                    <Route path='/forgot-password' element = {<ForgotPassword />}> </Route>
                    <Route path='/reset-password' element = {<ResetPassword />}> </Route>

                    <Route path='/datalogger' element = {<Datalogger />}>
                        <Route index element = {<QuickStart />} />
                        <Route path='quickstart' element = {<QuickStart />}>
                            <Route index element = {<SiteInformation />} />
                                <Route path='ethernet-1' element={<EnthernetOne />} />
                                <Route path='ethernet-2' element = {<EnthernetTwo />} />
                                <Route path='firmware' element = {<Firmware />} />
                                <Route path='rs485-1' element = {<RS485One />} />
                                <Route path='rs485-2' element = {<RS485Two />} />
                                <Route path='logging-rate' element = {<LoggingRate />} />
                                <Route path='upload-channels' element = {<UploadChannels />} />
                                <Route path='remote-access' element = {<RemoteAccess />} />
                                <Route path='done' element = {<Done />} />
                        </Route>
                        <Route path='rs485' element = {<RS485 />} >
                            <Route path=':id' element={<Device />} />
                            <Route path='options' element = {<Options />} />
                        </Route>
                        <Route path='devices' element = {<Devices />} />
                        <Route path='templates' element={<Templates />} >
                            <Route index element = {<TemplatesManagement />} />
                            <Route path=':name' element={<Template />} >
                                <Route path='points' element={<PointList />} />
                                <Route path='registers' element = {<RegisterBlocks />} />
                                <Route path='advanced' element = {<Advanced />} />
                            </Route>
                        </Route>
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

