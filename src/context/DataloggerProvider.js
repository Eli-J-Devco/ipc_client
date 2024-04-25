/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React, { createContext, useState } from 'react';

export const DataloggerContext = createContext();

/**
 * Datalogger Provider
 * @author nhan.tran 2024-03-11
 * @param {object} children
 * @returns {object} DataloggerContext.Provider
 */
export const DataloggerProvider = ({ children }) => {
    const [projectSetup, setProjectSetup] = useState([]);
    const [ethernetConfig, setEthernetConfig] = useState([]);
    const [rs485Config, setRS485Config] = useState([]);
    const [loggingIntervalConfig, setLoggingIntervalConfig] = useState([]);
    const [uploadChanelConfig, setUploadChanelConfig] = useState([]);
    const [screenList, setScreenList] = useState([]);

    return (
        <DataloggerContext.Provider
            value={{
                projectSetup,
                setProjectSetup,
                ethernetConfig,
                setEthernetConfig,
                rs485Config,
                setRS485Config,
                loggingIntervalConfig,
                setLoggingIntervalConfig,
                uploadChanelConfig,
                setUploadChanelConfig,
                screenList,
                setScreenList
            }}>
            {children}
        </DataloggerContext.Provider>
    );
};