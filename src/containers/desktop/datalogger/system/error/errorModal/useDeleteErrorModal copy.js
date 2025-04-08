import Constants from "../../../../../../utils/Constants.js";
import useAxiosPrivate from "../../../../../../hooks/useAxiosPrivate.js";
import LibToast from "../../../../../../utils/LibToast.js";
import { useTranslation } from "react-i18next";

function useDeleteErrorModal({ 
    close, 
    data, 
    dataList, 
    setDataList,
}) {
    const { t } = useTranslation();
    const axiosPrivate = useAxiosPrivate();

    const submitDelete = async () => {
        try {
            var output = document.getElementById("progress");
            output.innerHTML = "<div><img src='/loading.gif' /></div>";
            const response = await axiosPrivate.post(
                `${Constants.API_URL.ERROR.DELETE}?error_id=${data.id}`
            )
            if (response.data) {
                setDataList(dataList.filter(item => {
                    return item.id !== data.id
                }))
                LibToast.toast(t("toastMessage.info.delete"), "info");
            }
        } catch (e) {
            LibToast.toast(t("toastMessage.error.add"), "error");           
            console.error(e);
        } finally {
            close()
            output.innerHTML = ""
        }
    }
    
    return {
        submitDelete
    };
}

export default useDeleteErrorModal;
