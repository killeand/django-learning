import { Modal, ModalDialog, DialogTitle, ModalClose, Divider } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function ModalPage({ color, title, icon, closenav, element, children, ...props }) {
    const nav = useNavigate();
    const Element = element;
    const Icon = icon;

    function CloseEvent() {
        nav(closenav);
    }

    return (
        <Modal open={true} onClose={CloseEvent}>
            <ModalDialog color={color || "primary"} variant="outlined" sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
            }}>
                <DialogTitle>
                    {(icon) && (<Icon />)}
                    {title || "New Modal"}
                    <ModalClose />
                </DialogTitle>
                <Divider />
                <Element color={color || "primary"} onClose={CloseEvent} {...props}>
                    {children}
                </Element>
            </ModalDialog>
        </Modal>
    );
}