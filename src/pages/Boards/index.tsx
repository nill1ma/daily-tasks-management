import { faFolderPlus } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import Actions from "../../components/Actions";
import Board from "../../components/Board";
import { GenericModal } from "../../components/GenericModal";
import {
	addItemInLocalStorage,
	getLocalStorage,
	removeItemFromLocalStorage,
} from "../../helpers/storage";
import { hasElementInArray } from "../../helpers/validations";
import { TActions } from "../../schemas/actions";
import { IBoard } from "../../schemas/board";
import { BoardsState } from "../../schemas/stores/boards-state";
import { CardsState } from "../../schemas/stores/cards-state";
import { addBoard, deleteBoard } from "../../store/actions";
import { RootState } from "../../store/reducers";
import { BoardsArea, BoardsContainer, Header } from "./styles";

export default function Boards() {
	// const { setBoards } = useBoards();
	const boards = useSelector(
		({ boards: { data } }: RootState) => data
	);
	const dispatch = useDispatch();
	const [isModalOpened, setIsModalOpened] = useState(false);
	const [boardName, setBoardName] = useState("");
	const navigate = useNavigate();

	const chooseBoard = (currentId: string) => {
		const index = boards.findIndex((board: IBoard) => board.id === currentId);
		const { id, name } = boards[index];
		addItemInLocalStorage("currentBoard", { id, name });
		navigate(`/project/${currentId}`);
	};

	useEffect(() => {
		console.log(`Here are the boards, ${boards}`);
	}, [boards]);

	const handleModal = () => setIsModalOpened((prev) => (prev ? false : true));

	const actionsProps: TActions[] = [
		{
			labelOption: "Add Board",
			handleModal: handleModal,
			icon: faFolderPlus,
		},
	];

	const save = (key: string) => {
		const value: IBoard = { id: uuidv4(), name: boardName, active: false };
		// const storage = addItemInLocalStorage<IBoard>(key, value);
		dispatch(addBoard(value));
		// setBoards([...storage]);
		setIsModalOpened((prev) => !prev);
	};

	function filterByBoards(filter: string) {
		const storage = getLocalStorage("boards");
		const filteredBoards = storage.filter((board: IBoard) =>
			board.name.includes(filter)
		);
		// setBoards(hasElementInArray(filteredBoards) ? filteredBoards : storage);
	}
	const removeBoard = (board: IBoard) => {
		// const updatedeBoards = removeItemFromLocalStorage("boards", boardId);
		dispatch(deleteBoard(board))
		// setBoards([...updatedeBoards]);
	};

	return (
		<BoardsContainer>
			<GenericModal
				label={`Add a new Board`}
				isModalOpened={isModalOpened}
				handleModal={handleModal}
				setLabelOf={setBoardName}
				save={save}
				storageKey={"boards"}
			/>
			<Header>
				<Actions
					actions={actionsProps}
					filterAction={filterByBoards}
					findBy="Board"
				/>
				<div className="projetName">
					{hasElementInArray(boards) && <h3>Here are all of your boards</h3>}
				</div>
			</Header>
			<BoardsArea>
				{hasElementInArray<IBoard>(boards) ? (
					boards.map((board: IBoard) => (
						<Board
							key={board.id}
							project={board}
							chooseBoard={chooseBoard}
							removeBoard={removeBoard}
						/>
					))
				) : (
					<span>There is still not boards!</span>
				)}
			</BoardsArea>
		</BoardsContainer>
	);
}
