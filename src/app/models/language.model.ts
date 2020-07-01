import { Document } from './document.model';
export class Language {
    constructor(
        public id: number,
        public name_EN: string,
        public levelRead: number,
        public levelSpeak: number,
        public levelWrite: number,
        public name_FR?: string,
        public documents?: Document[]
    ) { }
}