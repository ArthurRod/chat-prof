import * as Dialog from "@radix-ui/react-dialog";
import { Plus, X } from "phosphor-react";

import "../../styles/modal.scss";

interface ModalProps {
  title: string;
  children: JSX.Element;
}

export function Modal({ title, children }: ModalProps) {
  return (
    <Dialog.Root>
      <Dialog.Trigger type="button" className="add-button">
        <Plus className="add-button-icon" size={32} color="#fff" />
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className="overlay" />

        <Dialog.Content className="modal">
          <div className="modal-content">
            <header className="header">
              <Dialog.Title className="title">{title}</Dialog.Title>
              <Dialog.Close className="close-button">
                <X size={24} aria-label="Fechar" color="#fff" />
              </Dialog.Close>
            </header>

            {children}
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
