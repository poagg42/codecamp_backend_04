export declare class BoardsService {
    findAll(): {
        number: number;
        writer: string;
        title: string;
        contents: string;
    }[];
    create({ createBoardInput }: {
        createBoardInput: any;
    }): string;
}
