import { useParams } from "react-router-dom";

function Device() {
    const { id } = useParams();

    return (
        <div className="container text-center">
            <div>RS485-{id} Baud Rate(s)</div>
        </div>
    );
}

export default Device;