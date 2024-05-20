import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
  } from '@chakra-ui/react';
  import FormProduct from '../forms/FormProduct';

// function ModalProduct({ isOpen , onClose, id, values }) {

//   return (
//     <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
//         <ModalOverlay />
//         <ModalContent>
//           <ModalHeader textAlign={'center'}>Edit Product</ModalHeader>
//           <ModalCloseButton />
//           <ModalBody pb={6}>
//             <FormProduct url={`http://localhost:4000/products/managers/update/${id}`} method="PUT" onClose={onClose} values={values}/>
//           </ModalBody>
//         </ModalContent>
//       </Modal>
//   )
// }

function ModalProduct({ isOpen, onClose, id }) {
  const url = id
    ? `${import.meta.env.VITE_URL_BACKEND}/products/managers/update/${id}`
    : `${import.meta.env.VITE_URL_BACKEND}/products/managers/add`;
  const method = id ? "PUT" : 'POST';

  return (
    <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader textAlign={"center"}>{id ? 'Edit Product' : 'Add Product'}</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <FormProduct url={url} method={method} onClose={onClose} />
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}

export default ModalProduct