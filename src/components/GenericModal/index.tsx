import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback } from "react";
import { StyledModal, CloseButton, SaveButton } from "./styles";

type GenericModalProps = {
    isModalOpened: boolean
    handleModal: () => void
    setLabelOf: React.Dispatch<React.SetStateAction<string>>
    save: (key: string) => void
    storageKey: string
    setDescription?: React.Dispatch<React.SetStateAction<string>>
    idColumn?: string
}

function GModal(
    {
        isModalOpened,
        handleModal,
        setLabelOf,
        save,
        storageKey,
        setDescription,
        idColumn
    }
        : GenericModalProps) {
    return <StyledModal
        isOpen={isModalOpened}
        onRequestClose={handleModal}
        ariaHideApp={false}
        style={{
            overlay: {
                border: '5px solid #fff',
                width: '30vw',
                margin: 'auto',
                opacity: '100%',
                height: '50vh',
                borderRadius: '10px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
            },
            content: {
                background: '#161b22',
                overflow: "auto",
                WebkitOverflowScrolling: "touch",
                borderRadius: "4px",
                outline: "none",
                border: 'none',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                color: '#fff',
                height: '50vh',
            }
        }}>
        <div className="header">
            <CloseButton onClick={useCallback(() => handleModal(), [handleModal])} size={'2x'} icon={faWindowClose} />
        </div>
        <div className="field">
            <input type={'text'} onChange={(e) => setLabelOf(e.target.value)} />
            {('cards' === storageKey && setDescription) && <textarea onChange={(e) => setDescription(e.target.value)} />}
            <SaveButton onClick={() => save(storageKey)}>Save</SaveButton>
        </div>
    </StyledModal>
}

export const GenericModal = memo(GModal)