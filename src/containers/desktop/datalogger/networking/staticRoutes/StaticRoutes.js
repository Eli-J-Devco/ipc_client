// import { useTranslation } from "react-i18next";
import styles from './StaticRoutes.module.scss';
import { RSwitch, RButton, RText } from './../../../../../components/Controls';
import ReactSelectDropdown from '../../../../../components/ReactSelectDropdown';

function StaticRoutes() {
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
        <div className={styles.firmwre}>
            <div className='note'>
                <p>Kernel IP routing table</p>
                <table className="table table-borderless">
                    <thead>
                        <tr>
                            <th>Destination</th>
                            <th>Gateway</th>
                            <th>Genmask</th>
                            <th>Flags</th>
                            <th>Metric</th>
                            <th>Ref</th>
                            <th>Use</th>
                            <th>Iface</th>
                        </tr>
                    </thead>

                    <tbody>
                        <tr>
                            <td>0.0.0.0</td>
                            <td>192.168.50.1</td>
                            <td>0.0.0.0</td>
                            <td>UG</td>
                            <td>50</td>
                            <td>0</td>
                            <td>0</td>
                            <td>eth1</td>
                        </tr>

                        <tr>
                            <td>192.168.50.0</td>
                            <td>0.0.0.0</td>
                            <td>255.255.255.0</td>
                            <td>U</td>
                            <td>0</td>
                            <td></td>
                            <td>0</td>
                            <td>eth1</td>
                        </tr>

                    </tbody>
                </table>
            </div>


            <div className={styles.form_body}>
                <div className='container-fluid'>
                    <div className='row'>
                        <div className="col-md-12">
                            <div className="mb-3">
                                <div className="checkmark">
                                    <RSwitch
                                        label="Enable static routing?"
                                        inputId="remote_access"
                                        inputName="remote_access"
                                        checked={1}
                                        onChange={handleInputChange}
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="col-md-12">
                            <div className={styles.form_table}>
                                <table className="table table-borderless">
                                    <thead>
                                        <tr>
                                            <th>No.</th>
                                            <th>Enable</th>
                                            <th>Destination</th>
                                            <th>Subnet Mask</th>
                                            <th>Gateway</th>
                                            <th>Port</th>
                                            <th>Metric</th>
                                            <th>Status</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>

                                        <tr>
                                            <td>1</td>
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
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>
                                                <ReactSelectDropdown
                                                    className="select_device_only"
                                                    inputId="select_device_only"
                                                    inputName="select_device_only"
                                                    name="select_device_only"
                                                    value={selectedProtocol}
                                                    onChange={handleDropdownChange}
                                                    optionList={protocol}
                                                />
                                            </td>
                                            <td>Disabled</td>
                                        </tr>


                                    </tbody>
                                </table>
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

                                    <RButton
                                        className="btn_skip margin-left15"
                                        text="Cancel"
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

export default StaticRoutes;
