import { Document } from './document.model';
export class TrainingCourse {
    constructor(
        public id: number,
        public name: string,
        public type: string,
        public duration: string,
        public establishment: string,
        public dateTime: Date,
        public courseUrl: string,
        public country_EN: string,
        public city_EN: string,
        public country_FR?: string,
        public city_FR?: string,
        public documents?: Document[]
    ) { }
}