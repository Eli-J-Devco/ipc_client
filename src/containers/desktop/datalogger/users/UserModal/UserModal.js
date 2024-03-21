/********************************************************
* Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
* All rights reserved.
* 
*********************************************************/
import React, { useEffect, useState } from 'react'
import { Tooltip } from 'react-tooltip';
import { FormProvider, useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import useAxiosPrivate from '../../../../../hooks/useAxiosPrivate';
import { loginService } from '../../../../../services/loginService';

import Modal from '../../../../../components/modal/Modal';
import { RTextForm } from '../../../../../components/Controls'
import Button from '../../../../../components/button/Button';
import FormInput from '../../../../../components/formInput/FormInput';
import Constants from '../../../../../utils/Constants';
import LibToast from '../../../../../utils/LibToast';
import * as yup from 'yup';
import _ from 'lodash';
import useUserModal from '../useUserModal';

export default function UserModal(props) {
    const { isOpenModal, closeModal, setNeedRefresh } = props;
    const { actionOption } = useUserModal();

    const Modal = (props) => actionOption[isOpenModal?.action].modal(props);
    return (
        <Modal isOpenModal={isOpenModal} closeModal={closeModal} setNeedRefresh={setNeedRefresh} />
    )
}
