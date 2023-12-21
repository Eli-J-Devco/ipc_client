import { useState } from "react";

function useOverview() {
  const [isSingleLineDatagram, setIsSingleLineDatagram] = useState(false);
  const [ deviceTable, setDeviceTable] = useState({total: 270, table: 240, expandMore: false});


  const openSingleLineDatagram = () => setIsSingleLineDatagram(true);
  const closeSingleLineDatagram = () => setIsSingleLineDatagram(false);
  const expandMore = () => setDeviceTable({total: 480, table: 410 , expandMore: true});
  const expandLess = () => setDeviceTable({total: 270, table: 240, expandMore: false});

    return {
      isSingleLineDatagram,
      openSingleLineDatagram,
      closeSingleLineDatagram,
      deviceTable,
      expandMore,
      expandLess
    };
}

export default useOverview;