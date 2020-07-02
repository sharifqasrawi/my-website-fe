export class Skill {
    constructor(
        public id: number,
        public name_EN: string,
        public level: number,
        public name_FR?: string,
        public categoryId?: number
    ) { }
}