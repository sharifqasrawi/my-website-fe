export class CVFile {
    constructor(
        public id: number,
        public fileName: string,
        public language: string,
        public filePath: string,
        public lastUpdateDate?: Date
    ) { }
}