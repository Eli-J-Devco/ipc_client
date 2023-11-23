// import { useTranslation } from "react-i18next";
import styles from './NetworkAccess.module.scss';
import { RSwitch, RButton, RText } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function NetworkAccess() {
    // const { t } = useTranslation();
    const protocol = [
        { value: 0, label: 'Global' },
        { value: 1, label: 'No access' },
        { value: 2, label: 'Access' },
    ];
    const selectedProtocol = [{ value: 1, label: 'No access' }];
    const handleDropdownChange = (event) => { }

    const handleInputChange = (event) => { }



    return (
        <div className={styles.network_access}>
            <div className='note'>
                <p> Your browser is communicating via Ethernet-1; <span style={{ color: "red" }}>WARNING: changes to settings on this port may affect your connection!</span> </p>
            </div>

            <div className={styles.form_body}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="row">
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Firewall Rules Limit Incoming Connections</legend>
                                        <div className={styles.form_table}>
                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th>Protocol</th>
                                                        <th>Ethernet Port 1</th>
                                                        <th>Ethernet Port 2</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>HTTPS</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>HTTP</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>SSH, SCP, rsync</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Telnet</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>FTP</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>Modbus TCP</td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                        <td>
                                                            <ReactSelectDropdown
                                                                className="protocol"
                                                                inputId="protocol"
                                                                inputName="protocol"
                                                                name="protocol"
                                                                value={selectedProtocol}
                                                                onChange={handleDropdownChange}
                                                                optionList={protocol}

                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                </div>
                                <div className="col-md-6">
                                    <fieldset>
                                        <legend>Allowed IP Addresses if Access Level is Whitelist</legend>
                                        <div className={styles.form_table}>
                                            <table className="table table-borderless">
                                                <thead>
                                                    <tr>
                                                        <th>Enable</th>
                                                        <th>IP Address</th>
                                                        <th>Subnet Mask</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>

                                                    <tr>
                                                        <td>
                                                            <div className="checkmark">
                                                                <RSwitch
                                                                    inputId="remote_access"
                                                                    inputName="remote_access"
                                                                    checked={1}
                                                                    onChange={handleInputChange}
                                                                />
                                                            </div>
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                        <td>
                                                            <RText
                                                                inputClass="form-control"
                                                                inputId="key"
                                                                inputName="key"
                                                                name="key"
                                                                onChange={handleInputChange}
                                                            />
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                    </fieldset>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-12'>
                            <div className='form-footer'>
                                <div className='mb-3'>
                                    <RButton
                                        className="btn_save"
                                        text="Save"
                                        iClass={true}
                                        iClassType="save"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default NetworkAccess;