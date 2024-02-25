import { useState } from 'react';
import * as bootstrap from 'bootstrap';
import { ModalType } from 'types';

interface UseModalProps {
  ref?: React.MutableRefObject<null>;
}

export const useModal = ({ ref }: UseModalProps) => {
  const [modalType, setModalType] = useState<ModalType>('View');

  const showModal = (type: ModalType) => {
    setModalType(type);
    const modalEle = ref?.current;
    if (!modalEle) return;
    const bsModal = new bootstrap.Modal(modalEle, {
      keyboard: false,
    });
    bsModal.show();
  };

  const hideModal = () => {
    const modalEle = ref?.current;
    if (!modalEle) return;
    const bsModal = bootstrap.Modal.getInstance(modalEle);
    bsModal?.hide();
  };

  return { modalType, showModal, hideModal };
};
