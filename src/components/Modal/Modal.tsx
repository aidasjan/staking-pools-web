import React from 'react'
import {
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay
} from '@chakra-ui/react'

interface Props {
  isOpen: boolean
  onClose: () => void
  children: any
}

const Modal = ({ isOpen, onClose, children }: Props) => {
  return (
    <ChakraModal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody py={6}>{children}</ModalBody>
      </ModalContent>
    </ChakraModal>
  )
}

export default Modal
