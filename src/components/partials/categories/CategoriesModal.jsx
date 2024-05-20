import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from "@chakra-ui/react";
  import CategoriesForm from "./CategoriesForm";
  
  function CategoriesModal({ onClose, isOpen, category }) {
    const add_url = `${import.meta.env.VITE_URL_BACKEND}/categories/managers/add-category`;
    const update_url = `${import.meta.env.VITE_URL_BACKEND}/categories/managers/update-category/${category?._id}`;
    return (
      <Modal
        closeOnOverlayClick={false}
        size={"sm"}
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{category ? "Update" : "Add"} Category</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <CategoriesForm url={category ? update_url : add_url} onClose={onClose} category={category} />
          </ModalBody>
        </ModalContent>
      </Modal>
    );
  }
  
  export default CategoriesModal;
  