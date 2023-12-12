import { useState } from "react";

function useOverview() {
  const [isSelectTime, setIsSelectTime] = useState(false);
  const [isSingleLineDatagram, setIsSingleLineDatagram] = useState(false);

  const openSelectTime = () => setIsSelectTime(true);

  const openSingleLineDatagram = () => setIsSingleLineDatagram(true);
  const closeSingleLineDatagram = () => setIsSingleLineDatagram(false);

    return {
      isSelectTime,
      openSelectTime,
      isSingleLineDatagram,
      openSingleLineDatagram,
      closeSingleLineDatagram
    };
}

export default useOverview;