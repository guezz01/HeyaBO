export class Login {
    constructor(
        public email: string,
        public password: string
    ){}
    
  }

  export class ResetPassword {
    constructor(
        public password: string,
        public confirmPassword: string
    ){}
    
  }