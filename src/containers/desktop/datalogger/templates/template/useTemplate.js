import { useParams } from "react-router-dom";

function useTemplate() {
    const { name } = useParams();

    return {
        name
    };
}

export default useTemplate;