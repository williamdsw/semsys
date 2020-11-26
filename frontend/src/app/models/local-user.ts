
export class LocalUser {

    // FIELDS

    private _socialSecurityNumber: string;
    private _token: string;
    private _id: number;
    private _type: string;
    private _profiles: string[] = [];

    // CONSTRUCTOR

    constructor() {}

    // GETTERS / SETTERS

    public getSocialSecurityNumber(): string {
        return this._socialSecurityNumber;
    }

    public setSocialSecurityNumber(ssn: string) {
        this._socialSecurityNumber = ssn;
    }

    public getToken(): string {
        return this._token;
    }

    public setToken(token: string) {
        this._token = token;
    }

    public getId(): number {
        return this._id;
    }

    public setId(id: number) {
        this._id = id;
    }

    public getType(): string {
        return this._type;
    }

    public setType(type: string) {
        this._type = type;
    }

    public getProfiles(): string[] {
        return this._profiles;
    }

    public setProfiles(_profiles: string[]) {
        this._profiles = _profiles;
    }
}