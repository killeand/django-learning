import { Modal, ModalDialog, DialogTitle, ModalClose, Divider } from "@mui/joy";
import { useNavigate } from "react-router-dom";

export default function ModalPage({ color, title, icon, path, children, ...props }) {
    const nav = useNavigate();
    const Icon = icon;
    let elements = (Array.isArray(children)) ? children : [children];

    function CloseEvent() {
        nav(path);
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
                {elements.map((child, index) => {
                    const Child = child;

                    return <Child key={`modalchild-${index}-${child.type}`} color={color || primary} onClose={CloseEvent} {...props} />
                })}
            </ModalDialog>
        </Modal>
    );
}