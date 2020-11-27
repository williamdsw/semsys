
export class EmailDTO {

    private email: string;

    constructor() {}

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }
}
