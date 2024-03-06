/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
const canEdit = {
    ethernet: {
        DHCP: true,
        "Static IP": true,
        Disabled: false,
    },
    ip_address: {
        DHCP: false,
        "Static IP": true,
        Disabled: false,
    },
    subnet_mask: {
        DHCP: false,
        "Static IP": true,
        Disabled: false,
    },
    gateway: {
        DHCP: false,
        "Static IP": true,
        Disabled: false,
    },
    mtu: {
        DHCP: true,
        "Static IP": true,
        Disabled: false,
    },
    dns1: {
        DHCP: true,
        "Static IP": true,
        Disabled: false,
    },
    dns2: {
        DHCP: true,
        "Static IP": true,
        Disabled: false,
    },
    allow_dns: {
        DHCP: true,
        "Static IP": false,
        Disabled: false,
    },
};

export default canEdit;