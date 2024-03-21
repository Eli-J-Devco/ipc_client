/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import Constants from "./Constants";

const timeUnits = {
    [Constants.TIME_UNIT.SHORT.ms]: {
        short: Constants.TIME_UNIT.SHORT.ms,
        full: Constants.TIME_UNIT.FULL.ms,
        unit: 1
    },
    [Constants.TIME_UNIT.SHORT.s]: {
        short: Constants.TIME_UNIT.SHORT.s,
        full: Constants.TIME_UNIT.FULL.s,
        unit: 1000
    },
    [Constants.TIME_UNIT.SHORT.m]: {
        short: Constants.TIME_UNIT.SHORT.m,
        full: Constants.TIME_UNIT.FULL.m,
        unit: 60000
    },
    [Constants.TIME_UNIT.SHORT.h]: {
        short: Constants.TIME_UNIT.SHORT.h,
        full: Constants.TIME_UNIT.FULL.h,
        unit: 3600000
    },
    [Constants.TIME_UNIT.SHORT.d]: {
        short: Constants.TIME_UNIT.SHORT.d,
        full: Constants.TIME_UNIT.FULL.d,
        unit: 86400000
    }
};

/**
 * Format time unit
 * @author nhan.tran 2024-03-07
 * @param {integer} input time
 * @param {string} time unit
 * @param {string} format of time
 * @param {boolean} if need to convert to another time unit
 * @param {string} from time unit
 * @param {string} to time unit
 * @return String
 */
export const formatTimeUnit = (time, timeUnit, format, needConvert, from, to) => {
    if (needConvert) {
        time = time * timeUnits[from].unit / timeUnits[to].unit;
    }
    return `${time} ${timeUnits[needConvert ? to : timeUnit][format]}`;
};


export const generateRandomPassword = () => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{10,}$/;
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@$!%*?&';
    let password = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        password += characters[randomIndex];
    }
    return regex.test(password) ? password : generateRandomPassword();
};