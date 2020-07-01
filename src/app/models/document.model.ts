export class Document {
    constructor(
        public id: number,
        public name_EN: string,
        public description_EN: string,
        public path: string,
        public type: string,
        public fileId: number,
        public isDisplayed: boolean,
        public description_FR?: string,
        public name_FR?: string,
        public experienceId?: number,
        public educationId?: number,
        public languageId?: number,
        public courseId?: number,
    ) { }
}