import BootStrapModal from 'react-bootstrap/Modal';
import CloseButton from 'react-bootstrap/CloseButton';
import styles from './Modal.module.scss';

function Modal({ children, isOpen, close, footer, title, variant, className, centered = false, fullscreen = false, size }) {
    return (
        <BootStrapModal
            show={isOpen}
            onHide={close}
            animation={false}
            scrollable={true}
            centered={centered}
            size={size}
            fullscreen={fullscreen}
            dialogClassName={styles.modal}
            contentClassName={`${variant ? styles[variant] : ""} ${className ? className : ""}`}
        >
            <BootStrapModal.Header className={styles.header}>
                {title}
                <CloseButton variant="white" onClick={close} />
            </BootStrapModal.Header>

            <BootStrapModal.Body className={styles.body}>{children}</BootStrapModal.Body>
            
            {footer && <BootStrapModal.Footer className={styles.footer}>{footer}</BootStrapModal.Footer>}
        </BootStrapModal>
    );
}

export default Modal;