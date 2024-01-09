import React, { useState } from 'react'

function useEditDeviceModal() {
  const [date, setDate] = useState(new Date());

    const handleOnDateChange = date => setDate(date);
  return {
    date,
    handleOnDateChange
  }
}

export default useEditDeviceModal