export class PersonalInfo {
    constructor(
        public id: number,
        public name: string,
        public title_EN: string,
        public about_EN: string,
        public imagePath: string,
        public maritalStatus: string,
        public title_FR?: string,
        public about_FR?: string,
        public driversLicense?: string,
        public dateOfBirth?: Date,
    ) { }
}