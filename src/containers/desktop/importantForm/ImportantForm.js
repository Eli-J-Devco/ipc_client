import { Button } from "bootstrap";
import Modal from "../../../components/modal/Modal";
import { useBlocker, useBeforeUnload } from "react-router-dom";
import { useCallback, useEffect } from "react";
export default function ImportantForm(props) {
    let blocker = useBlocker(props.isBlocked);

    useEffect(() => {
        if (blocker.state === 'blocked' && !props.isBlocked) {
            blocker.reset();
        }
    }, [blocker, props.isBlocked]);

    useBeforeUnload(
        useCallback(
            (event) => {
                if (props.isBlocked && typeof props.message === 'string') {
                    event.preventDefault();
                    event.returnValue = props.message;
                }
            },
            [props.message, props.isBlocked]
        ),
        { capture: true }
    );
    return (
        <Modal
            isOpen={props.isOpen}
            close={props.close}
            title="Important Form"
            footer={
                <div>
                    <Button className="me-3" onClick={props.close}>
                        <Button.Text text={`${props.cancel}`} />
                    </Button>
                    <Button className="me-3" onClick={props.close}>
                        <Button.Text text={`${props.confirm}`} />
                    </Button>
                </div>
            }
        >
            <div>
                <p>Important Form</p>
            </div>
        </Modal>
    );
}