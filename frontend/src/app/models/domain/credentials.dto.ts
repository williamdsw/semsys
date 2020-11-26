
export class CredentialsDTO {

    // FIELDS

    private socialSecurityNumber: string;
    private password: string;

    // CONSTRUCTOR

    constructor() {}

    // GETTERS / SETTERS

    public getSocialSecurityNumber(): string {
        return this.socialSecurityNumber;
    }

    public setSocialSecurityNumber(ssn: string) {
        this.socialSecurityNumber = ssn;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }
}
