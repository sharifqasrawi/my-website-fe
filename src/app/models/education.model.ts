import { Document } from './document.model';
export class Education {
    constructor(
        public id: number,
        public title_EN: string,
        public specialization_EN: string,
        public establishment_EN: string,
        public mention_EN: string,
        public country_EN: string,
        public city_EN: string,
        public yearsCount: number,
        public note: string,
        public startDate: Date,
        public graduateDate: Date,

        public city_FR?: string,
        public country_FR?: string,
        public mention_FR?: string,
        public establishment_FR?: string,
        public specialization_FR?: string,
        public title_FR?: string,
        public documents?: Document[]
    ) { }
}