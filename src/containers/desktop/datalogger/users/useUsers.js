import { useState } from "react";
import Constants from "../../../../utils/Constants";
import { ReactComponent as NoAlarmIcon } from "../../../../assets/images/greencheck.svg";

function useUsers() {
    const [total, setTotal] = useState(100);
    const [limit, setLimit] = useState(Constants.DEFAULT_PAGE_SIZE);
    const [offset, setOffset] = useState(0);
    const [columns, ] = useState([
        {
            id: 1,
            slug: "id",
            name: "Id",
        }, {
            id: 2,
            slug: "full_name",
            name: "Full Name"
        }, {
            id: 3,
            slug: "email",
            name: "Email"
        }, {
            id: 4,
            slug: "phone",
            name: "Phone"
        }, {
            id: 5,
            slug: "roles",
            name: "Roles"
        }, {
            id: 6,
            slug: "status",
            name: "Status"
        }, {
            id: 7,
            slug: "actions",
            name: <div className="text-center">Actions</div>
        }
    ]);
    
    return {
        columns,
        total,
        setLimit,
        setOffset,
    };
}

export default useUsers;