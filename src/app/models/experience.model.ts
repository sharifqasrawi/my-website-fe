import { Document } from './document.model';

export class Experience {
    constructor(
        public id: number,
        public title_EN: string,
        public company: string,
        public country_EN: string,
        public city_EN: string,
        public accomplishments_EN: string,
        public responisbilites_EN: string,

        public startDate?: Date,
        public endDate?: Date,
        public isCurrentlyWorking?: boolean,
        public accomplishments_FR?: string,
        public responisbilites_FR?: string,
        public city_FR?: string,
        public country_FR?: string,
        public title_FR?: string,
        public documents?: Document[]
    ) { }
}