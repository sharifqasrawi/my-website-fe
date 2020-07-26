export class ProjectImage {
    constructor(
        public id: number,
        public caption_EN: string,
        public path: string,
        public isDisplayed: boolean,
        public caption_FR?: string,
        public projectId?: number,
    ) { }
}