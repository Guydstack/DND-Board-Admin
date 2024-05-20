import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";
import OrderDetails from "./OrderDetails";

function ModalOrder({isOpen , onClose , order , mutate }) {
return (
  <Modal closeOnOverlayClick={false} size={'full'} isOpen={isOpen} onClose={onClose}>
  <ModalOverlay />
  <ModalContent>
    <ModalHeader textAlign={"center"}>Order: {order?.order_number}</ModalHeader>
    <ModalCloseButton />
    <ModalBody pb={6}>
     <OrderDetails order={order} onClose={onClose} mutate={mutate} />
    </ModalBody>
  </ModalContent>
</Modal>
)
}

export default ModalOrder



