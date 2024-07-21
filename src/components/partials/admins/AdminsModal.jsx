import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import AdminsForm from "../admins/AdminsForm";
  
  function AdminsModal({ onClose, isOpen, admin }) {
    const add_url = "http://localhost:4000/users/admins/add-manager";
    const update_url = `http://localhost:4000/users/managers/update-by-id-for-manager/${admin?._id}`;
    return (
      <Modal
        closeOnOverlayClick={false}
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{admin ? "Update" : "Add"} Admin</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <AdminsForm url={admin ? update_url : add_url} onClose={onClose} admin={admin} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default AdminsModal;
  