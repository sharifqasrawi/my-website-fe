import { Skill } from "./skill.model";

export class Category {
    constructor(
        public id: number,
        public name_EN: string,
        public name_FR?: string,
        public skills?: Skill[]
    ) { }
}