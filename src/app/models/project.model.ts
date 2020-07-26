import { ProjectImage } from './projectImage.model';
import { Tag } from './tag.model';

export class Project {
    constructor(
        public id: number,
        public name_EN: string,
        public slug_EN:string,
        public description_EN: string,
        public type: string,
        public size: string,
        public gitHubUrl: string,
        public isDisplayed: boolean,
        public liveDemoUrl: string,
        public videoDemoUrl: string,
        public videoDemoUrlExt: string,
        public imagePath: string,
        public description_FR?: string,
        public name_FR?: string,
        public slug_FR?: string,
        public tags?: Tag[],
        public projectImages?: ProjectImage[]
    ) { }
}