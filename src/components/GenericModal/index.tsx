import { faWindowClose } from "@fortawesome/free-solid-svg-icons";
import { memo, useCallback } from "react";
import { PriorityReferences } from "../../schemas/card";
import { StyledModal, CloseButton, SaveButton } from "./styles";

type GenericModalProps = {
    isModalOpened: boolean
    handleModal: () => void
    setLabelOf: React.Dispatch<React.SetStateAction<string>>
    seDescription?: React.Dispatch<React.SetStateAction<string>>
    save: (key: string) => void
    storageKey: string
    handleCardAPriority?: (reference: string) => void
    idColumn?: string
}

function GModal(
    {
        isModalOpened,
        handleModal,
        setLabelOf,
        seDescription,
        save,
        storageKey,
        handleCardAPriority,
        idColumn
    }
        : GenericModalProps) {

    return <StyledModal
        isOpen={isModalOpened}
        onRequestClose={handleModal}
        ariaHideApp={false}
        style={{
            overlay: {
                border: '3px solid #fff',
                width: '50vw',
                margin: 'auto',
                opacity: '100%',
                height: '60vh',
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
                height: '60vh',
            }
        }}>
        <div className="header">
            <CloseButton onClick={useCallback(() => handleModal(), [handleModal])} size={'2x'} icon={faWindowClose} />
        </div>
        <div className="field">
            <input type={'text'} onChange={(e) => setLabelOf(e.target.value)} />
            {('cards' === storageKey && handleCardAPriority) && (
                <>
                    <div className="priority">
                        <select name="priority" id="priority"
                            onChange={(e: any) => handleCardAPriority(e)}>
                            {Object.values(PriorityReferences).map(priority => {
                                return <option value={priority}>{priority.split('_')[0]}</option>
                            })}
                        </select>

                    </div>
                    {seDescription ?
                        <textarea name="description" onChange={(e: any) => seDescription(e.target.value)} />
                        :
                        <></>}
                </>
            )}
            <SaveButton onClick={() => save(storageKey)}>Save</SaveButton>
        </div>
    </StyledModal>
}

export const GenericModal = memo(GModal)