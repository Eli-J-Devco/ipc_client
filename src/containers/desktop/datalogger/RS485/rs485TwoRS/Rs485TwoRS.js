/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useEffect } from "react";
import Rs485Template from "../Rs485Template";
import useRS485 from "../useRS485";
import Libs from "../../../../../utils/Libs";

function Rs485TwoRS() {
  const {
    fetchRS485,
    handleSave,
    selectedDropdown,
    selectedOption,
    options,
    namekey,
    back,
    save,
  } = useRS485();

  useEffect(() => {
    Libs.progress(true);
    setTimeout(async () => {
      await fetchRS485(2);
      Libs.progress(false);
    }, 100);
  }, []);

  return (
    <Rs485Template
      id={2}
      save={save}
      selectedDropdown={selectedDropdown}
      selectedOption={selectedOption}
      options={options}
      namekey={namekey}
      back={back}
      handleSave={handleSave}
    />
  );
}

export default Rs485TwoRS;
