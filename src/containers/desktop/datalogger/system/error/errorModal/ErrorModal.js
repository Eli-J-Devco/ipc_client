/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import React from "react";
import AddEditErrorModal from "./AddEditErrorModal";
import DeleteErrorModal from "./DeleteErrorModal";

export default function ErrorModal({ action, ...props }) {
    const {
        isOpen, 
        close, 
        data, setData,
        dataList, setDataList,
        deviceGroups,
        templates,
        points,
        errorLevels,
        errorTypes,
        errorComparisons,
        formSubmit, setFormSubmit
    } = props
    switch (action) {
        case "ADD":
        case "EDIT":
            return <AddEditErrorModal
                    isOpen={isOpen}
                    close={close}
                    data={data}
                    setData={setData}
                    dataList={dataList}
                    setDataList={setDataList}
                    deviceGroups={deviceGroups}
                    templates={templates}
                    points={points}
                    errorLevels={errorLevels}
                    errorTypes={errorTypes}
                    errorComparisons={errorComparisons}
                    formSubmit={formSubmit}
                    setFormSubmit={setFormSubmit}
                />
        case "DELETE":
            return <DeleteErrorModal 
                    isOpen={isOpen}
                    close={close}
                    data={data}
                    dataList={dataList}
                    setDataList={setDataList}
                />
    }
}
