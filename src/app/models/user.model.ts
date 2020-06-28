export class User {
    constructor(
        public firstName: string,
        public lastName: string,
        public email: string,
        public isAdmin: boolean,
        public id: string,
        private _token?: string,
        private _tokenExpirationDate?: Date,
        public isActive?: boolean,
        public emailConfirmed?: boolean,
    )
    {}

    get token() {
        if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
          return null;
        }
        return this._token;
      }
}