import React, { useState } from 'react'
import Constants from '../../../../../utils/Constants';

function useExportLimitationControl() {
  const [ manualMode, setManualMode] = useState(1);
  const [ autoMode, setAutoMode] = useState(0);
  const [total, setTotal] = useState(100);
  const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
  const [offset, setOffset] = useState(0);
  const [device, setDevice] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);
  const handleConfigDevice = item => {
    setIsModalOpen(true);
    setDevice(item);
  }

  const handleAutoMode = () => {
    setAutoMode(autoMode === 0 ? 1 : 0)
  }

  return {
    total,
    setLimit,
    setOffset,
    handleConfigDevice,
    device,
    isModalOpen,
    closeModal,
    manualMode,
    handleAutoMode,
    autoMode
  };
}

export default useExportLimitationControl