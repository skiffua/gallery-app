import { ReactNode } from 'react';

export interface ModalInterface {
    children: ReactNode;
    closeModal: () => void;
}
