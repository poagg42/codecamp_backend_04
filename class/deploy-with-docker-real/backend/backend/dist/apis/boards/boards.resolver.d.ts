import { BoardsService } from './boards.service';
import { CreateBoardInput } from './dto/createBoard.input';
export declare class BoardsResolver {
    private readonly boardsService;
    constructor(boardsService: BoardsService);
    fetchBoards(): {
        number: number;
        writer: string;
        title: string;
        contents: string;
    }[];
    createBoard(createBoardInput: CreateBoardInput): string;
}
