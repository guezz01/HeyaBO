export class User {
    constructor(
        public id: number,
        public createdAt: string,
        public updatedAt: string,
        public username: string,
        public firstname: string,
        public lastname: string,
        public email: string,
        public phoneNumber: string,
        public role: number
    ){}
    
  }