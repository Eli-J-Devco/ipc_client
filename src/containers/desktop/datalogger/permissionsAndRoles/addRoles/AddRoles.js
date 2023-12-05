/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/

import React from 'react'
import Modal from '../../../../../components/modal/Modal';
import {  RCheckbox, RText } from '../../../../../components/Controls'
import { Tooltip } from 'react-tooltip';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';
import Button from '../../../../../components/button/Button';
import ModalDefault from 'react-bootstrap/Modal';


export default function AddRoles(props) {
  const { closeAddRoles } = props;
  
  const options = [
    { id: "1", value: "datalogger", label: 'Data Logger' },
    { id: "2", value: "inverter", label: 'Inverter' },
    { id: "3", value: "weather", label: 'Weather' },
    { id: "4", value: "sensor", label: 'Sensor' },
    { id: "5", value: "ups", label: 'UPS' }
  ];
  const selectedOption = { value: "inverter", label: 'Inverter' }
  const footer = <div>
      <Button variant="dark" onClick={() => closeAddRoles()}>
          <Button.Text text="Add" />
      </Button>
      <Button variant="grey" className="ms-3" onClick={() => closeAddRoles()}>
          <Button.Text text="Cancel" />
      </Button>
    </div>
  
  return (
    <Modal
      isOpen={true}
      close={closeAddRoles}
      title="Add Roles"
      footer={footer}
    > 
      <div>
        <div >
          <RText
            label="Name"
            inputClass="form-control"
            inputId="name"
            inputName="name"
            name="name"
            // value={curItem.device_name}
            info="Name Note"
          > </RText>

          <Tooltip id="my-tooltip" />
        </div>

        <div >
          <RText
            label="Description"
            inputClass="form-control"
            inputId="description"
            inputName="description"
            name="description"
            // value={curItem.device_name}
            info="Description Note"
          > </RText>

          <Tooltip id="my-tooltip" />
        </div>

       
      </div>
    </Modal>
  )
}
