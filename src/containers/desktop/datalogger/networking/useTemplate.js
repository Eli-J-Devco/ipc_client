/********************************************************
 * Copyright 2020-2021 NEXT WAVE ENERGY MONITORING INC.
 * All rights reserved.
 *
 *********************************************************/
import { useParams } from "react-router-dom";

function useTemplate() {
    const { name } = useParams();

    return {
        name
    };
}

export default useTemplate;