import { BoardModal, SaveButton } from "./styles";

type GenericModalProps = {
    isModalOpened: boolean
    handleModal: () => void
    setLabelOf: React.Dispatch<React.SetStateAction<string>>
    save: (key: string) => void
    storageKey: string
    setDescription?: React.Dispatch<React.SetStateAction<string>>
    idColumn?: string
}

export default function GenericModal(
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
    return <BoardModal
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
        }}
    >
        <input type={'text'} onChange={(e) => setLabelOf(e.target.value)} />
        {('cards' === storageKey && setDescription) && <textarea onChange={(e) => setDescription(e.target.value)} />}
        <SaveButton onClick={() => save(storageKey)}>Save</SaveButton>
    </BoardModal>
}