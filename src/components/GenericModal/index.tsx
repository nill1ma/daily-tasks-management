import { BoardModal, SaveButton } from "./styles";

type GenericModalProps = {
    isModalOpened: boolean
    handleModal: () => void
    setNameOf: React.Dispatch<React.SetStateAction<string>>
    save: (key: string) => void
    storageKey: string
    idColumn?:string
}

export default function GenericModal(
    {
        isModalOpened,
        handleModal,
        setNameOf,
        save,
        storageKey
    }
        : GenericModalProps) {
    return <BoardModal
        isOpen={isModalOpened}
        onRequestClose={handleModal}
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
        <input type={'text'} onChange={(e) => setNameOf(e.target.value)} />
        {'cards' === storageKey && <textarea name="" />}
        <SaveButton onClick={() => save(storageKey)}>Save</SaveButton>
    </BoardModal>
}