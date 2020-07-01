export class ContactInfo {
    constructor(
        public id: number,
        public emails: string,
        public phone: string,
        public country_EN: string,
        public city_EN: string,
        public street: string,
        public streetNumber: string,
        public zipCode: string,
        public country_FR?: string,
        public city_FR?: string,
        public linkedInUrl?: string,
        public gitHubUrl?: string,
        public facebookUrl?: string
    ) { }
}