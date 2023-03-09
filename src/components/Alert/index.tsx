import * as AlertDialog from "@radix-ui/react-alert-dialog";
import { useState } from "react";

import "../../styles/alert.scss";

interface AlertProps {
  title: string;
  trigger: JSX.Element;
  triggerName?: string;
  action?: () => void;
}

export function Alert({ title, trigger, triggerName, action }: AlertProps) {
  return (
    <AlertDialog.Root>
      <AlertDialog.Trigger
        type="button"
        className={triggerName ? triggerName : "trigger"}
      >
        {trigger}
      </AlertDialog.Trigger>

      <AlertDialog.Portal>
        <AlertDialog.Overlay className="overlay" />

        <AlertDialog.Content className="alert">
          <div className="alert-content">
            <header className="header">
              <AlertDialog.Title className="title">{title}</AlertDialog.Title>
            </header>
            <AlertDialog.Description className="alert-description">
              Desja remover a observação?
            </AlertDialog.Description>

            {action && (
              <div className="alert-controls">
                <AlertDialog.Cancel asChild>
                  <button className="alert-cancel">Cancelar</button>
                </AlertDialog.Cancel>
                <AlertDialog.Action asChild>
                  <button onClick={action} className="alert-success">
                    Sim
                  </button>
                </AlertDialog.Action>
              </div>
            )}
          </div>
        </AlertDialog.Content>
      </AlertDialog.Portal>
    </AlertDialog.Root>
  );
}
