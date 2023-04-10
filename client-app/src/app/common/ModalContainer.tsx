import { observer } from "mobx-react-lite";
import { useDispatch, useSelector } from "react-redux";
import { Modal } from "semantic-ui-react";
import { RootState } from "../stores/store";
import { closeModal } from "../stores/modalStores";

export default function ModalContainer() {
    const modalOpen = useSelector((state: RootState) => state.modal.open)
    const modalBody = useSelector((state: RootState) => state.modal.body)
    const dispatch = useDispatch()

    return (
        <Modal open={modalOpen} onClose={() =>dispatch(closeModal())} size='mini'>
            <Modal.Content>
                {modalBody}
            </Modal.Content>
        </Modal>
    )
}