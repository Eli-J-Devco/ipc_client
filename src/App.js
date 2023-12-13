import React, { Component } from 'react';
import { Routes, Route } from 'react-router-dom';
import Datalogger from './layouts/datalogger/Datalogger';
import Error from './layouts/error/Error';
import LoginAdmin from './layouts/login/loginAdmin/LoginAdmin';
import ForgotPassword from './layouts/login/forgotPassword/ForgotPassword';
import ResetPassword from './layouts/login/resetPassword/ResetPassword';
import Scada from './layouts/scada/Scada';
import ScadaDashboard from './containers/desktop/scada/daskboard/Dashboard';
import ScadaDevices from './containers/desktop/scada/devices/Devices';
import ScadaOverview from './containers/desktop/scada/overview/Overview';
import ScadaSetup from './containers/desktop/scada/devices/setup/Setup';
import ScadaDCCombiner from './containers/desktop/scada/devices/dcCombiner/DCCombiner';

import Devices from './containers/desktop/datalogger/devices/Devices';
import ConfigDevice from './containers/desktop/datalogger/devices/configDevice/ConfigDevice';

import Templates from './containers/desktop/datalogger/templates/Templates';
import TemplatesManagement from './containers/desktop/datalogger/templates/templatesManagement/TemplatesManagement';
import Template from './containers/desktop/datalogger/templates/template/Template';
import PointList from './containers/desktop/datalogger/templates/template/pointList/PointList';
import RegisterBlocks from './containers/desktop/datalogger/templates/template/registerBlocks/RegisterBlocks';
import Advanced from './containers/desktop/datalogger/templates/template/advanced/Advanced';

import QuickStart from './containers/desktop/datalogger/quickstart/QuickStart';
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

import Alarms from './containers/desktop/datalogger/alarms/Alarms';

import Data from './containers/desktop/datalogger/data/Data';
import DataLogs from './containers/desktop/datalogger/data/dataLogs/DataLogs';
import DataLoggingRate from './containers/desktop/datalogger/data/loggingRate/LoggingRate';
import SyncHistory from './containers/desktop/datalogger/data/syncHistory/SyncHistory';

import RS485 from './containers/desktop/datalogger/RS485/RS485';
import RS485OneRS from './containers/desktop/datalogger/RS485/rs485OneRS/Rs485OneRS';
import RS485TwoRS from './containers/desktop/datalogger/RS485/rs485TwoRS/Rs485TwoRS';
import RS485Options from './containers/desktop/datalogger/RS485/options/Options';

import UploadChannel from './containers/desktop/datalogger/uploadChannel/UploadChannel';
import Schedule from './containers/desktop/datalogger/uploadChannel/schedule/Schedule';
import Channel from './containers/desktop/datalogger/uploadChannel/channel/Channel';

import Networking from './containers/desktop/datalogger/networking/Networking';
import NetworkEnthernetOne from './containers/desktop/datalogger/networking/ethernetOne/EthernetOne';
import NetworkEnthernetTwo from './containers/desktop/datalogger/networking/ethernetTwo/EthernetTwo';
import NetworkAccess from './containers/desktop/datalogger/networking/networkAccess/NetworkAccess';
import NWRemoteAccess from './containers/desktop/datalogger/networking/remoteAccess/RemoteAccess';
import StaticRoutes from './containers/desktop/datalogger/networking/staticRoutes/StaticRoutes';

import ModHoppers from './containers/desktop/datalogger/modHoppers/ModHoppers';
import ModHoppersOne from './containers/desktop/datalogger/modHoppers/modHoppersOne/ModHoppersOne';
import ModHoppersTwo from './containers/desktop/datalogger/modHoppers/modHoppersTwo/ModHoppersTwo';
import GroupOptions from './containers/desktop/datalogger/modHoppers/groupOptions/GroupOptions';

import System from './containers/desktop/datalogger/system/System';
import SystemSiteInformation from './containers/desktop/datalogger/system/siteInformation/SiteInformation';
import DateTime from './containers/desktop/datalogger/system/datetime/DateTime';
import BackupRestore from './containers/desktop/datalogger/system/backupRestore/BackupRestore';
import SystemFirmware from './containers/desktop/datalogger/system/firmware/Firmware';
import AutoUpdate from './containers/desktop/datalogger/system/autoUpdate/AutoUpdate';
import RebootShutdown from './containers/desktop/datalogger/system/rebootShutdown/RebootShutdown';
import Synchronized from './containers/desktop/datalogger/system/synchronized/Synchronized';
import Alarm from './containers/desktop/datalogger/system/alarm/Alarm';
import Users from './containers/desktop/datalogger/users/Users';
import PermissionsAndRoles from './containers/desktop/datalogger/permissionsAndRoles/PermissionsAndRoles';
import Overview from './containers/desktop/datalogger/overview/Overview';

import Trend from './containers/desktop/scada/trend/Trend';
import Realtime from './containers/desktop/scada/trend/realtime/Realtime';
import Historical from './containers/desktop/scada/trend/historical/Historical';
import Weather from './containers/desktop/scada/trend/weather/Weather';
import UPS from './containers/desktop/scada/trend/ups/UPS';
import Meter from './containers/desktop/scada/trend/meter/Meter';

export default class App extends Component {
    render() {
        return (
            <div className="App">
                <Routes>
                    <Route path='/' element = {<LoginAdmin />}> </Route>
                    <Route path='/forgot-password' element = {<ForgotPassword />}> </Route>
                    <Route path='/reset-password' element = {<ResetPassword />}> </Route>

                    <Route path='/datalogger' element = {<Datalogger />}>
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
                        <Route path='overview' element = {<Overview />} />
                        <Route path='rs485' element = {<RS485 />} >
                            <Route index element = {<RS485OneRS />} />
                                <Route path='2' element={<RS485TwoRS />} />
                                <Route path='options' element = {<RS485Options />} />
                        </Route>

                        
                        <Route path='modHoppers' element = {<ModHoppers />} >
                            <Route index element = {<ModHoppersOne />} />
                                <Route path='2' element={<ModHoppersTwo />} />
                                <Route path='group-options' element = {<GroupOptions />} />
                        </Route>

                        <Route path='devices' element = {<Devices />} />
                        <Route path='' element = {<UploadChannel />} />

                        <Route path='upload' element = {<UploadChannel />} >
                            <Route index element = {<Channel />} />
                                <Route path='channel' element={<Channel />} />
                                <Route path='schedule' element={<Schedule />} />
                        </Route>

                        <Route path='networking' element = {<Networking />} >
                            <Route index element = {<NetworkEnthernetOne />} />
                                <Route path='ethernet-1' element={<NetworkEnthernetOne />} />
                                <Route path='ethernet-2' element={<NetworkEnthernetTwo />} />
                                <Route path='network-access' element={<NetworkAccess />} />
                                <Route path='remote-acesss' element={<NWRemoteAccess />} />
                                <Route path='static-routes' element={<StaticRoutes />} />
                        </Route>


                        <Route path='devices' element = {<Devices />} >
                            <Route path=':id' element={<ConfigDevice />} />
                        </Route>
                        
                        <Route path='templates' element={<Templates />} >
                            <Route index element={<TemplatesManagement />} />
                            <Route path=':name' element={<Template />} >
                                <Route path='points' element={<PointList />} />
                                <Route path='registers' element={<RegisterBlocks />} />
                                <Route path='advanced' element={<Advanced />} />
                            </Route>
                        </Route>

                        <Route path='data' element={<Data />} >
                            <Route index element={<DataLogs />} />
                            <Route path='logging-rate' element={<DataLoggingRate />} />
                            <Route path='sync-history' element={<SyncHistory />} />
                        </Route>
                        
                        <Route path='alarms' element={<Alarms />} />

                        <Route path='system' element={<System />} >
                            <Route index element={<SystemSiteInformation />} />
                            <Route path='datetime' element={<DateTime />} />
                            <Route path='backup-restore' element={<BackupRestore />} />
                            <Route path='firmware' element={<SystemFirmware />} />
                            <Route path='auto-update' element={<AutoUpdate />} />
                            <Route path='reboot-shutdown' element={<RebootShutdown />} />
                            <Route path='synchronized' element={<Synchronized />} />
                            <Route path='alarm' element={<Alarm />} />
                        </Route>

                        <Route path='users' element={<Users />} >

                        </Route>

                        <Route path='permissions-roles' element={<PermissionsAndRoles />} >

                        </Route>
                    </Route>

                    <Route path='/scada' element = {<Scada />}>
                        <Route index element = {<ScadaOverview />} />
                        <Route path='overview' element = {<ScadaOverview />} />
                        <Route path='dashboard' element = {<ScadaDashboard />} />
                        <Route path='devices' element = {<Scada />}>
                            <Route index element = {<ScadaDevices />} />
                            <Route path='setup/:id' element={<ScadaSetup />} />
                            <Route path='dc-combiner/:id' element={<ScadaDCCombiner />} />
                        </Route>

                        <Route path='trend' element = {<Trend />}>
                            <Route index element = {<Realtime />} />
                            <Route path='historical' element={<Historical />} />
                            <Route path='weather' element={<Weather />} />
                            <Route path='ups' element={<UPS />} />
                            <Route path='meter' element={<Meter />} />
                        </Route>
                        
                    </Route>

                    <Route path='/*' element = {<Error />} />

                </Routes>
            </div>
        );
    };
}

