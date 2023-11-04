import BootStrapModal from 'react-bootstrap/Modal';
import styles from './Modal.module.scss';

function Modal({ children, isOpen, close, footer, title, variant, centered = false, fullscreen = false }) {
    return (
        <BootStrapModal
            show={isOpen}
            onHide={close}
            animation={false}
            scrollable={true}
            centered={centered}
            fullscreen={fullscreen}
            dialogClassName={styles.modal}
            contentClassName={variant ? styles[variant] : ""}
        >
            <BootStrapModal.Header closeButton className={styles.header}>{title}</BootStrapModal.Header>

            <BootStrapModal.Body className={styles.body}>{children}</BootStrapModal.Body>
            
            {footer && <BootStrapModal.Footer>{footer}</BootStrapModal.Footer>}
        </BootStrapModal>
    );
}

export default Modal;