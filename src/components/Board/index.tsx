import { useCallback } from "react";
import { faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { IBoard } from "../../schemas/board";
import { Board, BoardHeader, Icon } from "./styles";

type ProjectsProps = {
    chooseBoard: (currentId: string) => void
    project: IBoard
    removeBoard: (board: IBoard) => void
}

export default function Projects({ chooseBoard, project: { id, name }, removeBoard }: ProjectsProps) {
    return <Board key={id}>
        <BoardHeader>
            <Icon onClick={useCallback(() => removeBoard({ id, name }), [id, removeBoard])} icon={faTrashAlt} />
        </BoardHeader>
        <span data-testid='chooseBoard' onClick={() => chooseBoard(id)}>
            {name}
        </span>
    </Board>
}
