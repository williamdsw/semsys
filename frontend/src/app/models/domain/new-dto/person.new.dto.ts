
export abstract class PersonNewDTO {

    protected id: number;
    protected name: string;
    protected email: string;
    protected socialSecurityNumber: string;
    protected password: string;
    protected phoneNumbers: string[] = [];

    protected street: string;
    protected number: string;
    protected complement: string;
    protected zipCode: string;

    protected cityId: number;

    constructor() {}

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string) {
        this.name = name;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string) {
        this.email = email;
    }

    public getSocialSecurityNumber(): string {
        return this.socialSecurityNumber;
    }

    public setSocialSecurityNumber(socialSecurityNumber: string) {
        this.socialSecurityNumber = socialSecurityNumber;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string) {
        this.password = password;
    }

    public getPhoneNumbers(): string[] {
        return this.phoneNumbers;
    }

    public setPhoneNumbers(phoneNumbers: string[]) {
        this.phoneNumbers = phoneNumbers;
    }

    public getStreet(): string {
        return this.street;
    }

    public setStreet(street: string) {
        this.street = street;
    }

    public getNumber(): string {
        return this.number;
    }

    public setNumber(value: string) {
        this.number = value;
    }

    public getComplement(): string {
        return this.complement;
    }

    public setComplement(complement: string) {
        this.complement = complement;
    }

    public getZipCode(): string {
        return this.zipCode;
    }

    public setZipCode(zipCode: string) {
        this.zipCode = zipCode;
    }

    public getCityId(): number {
        return this.cityId;
    }

    public setCityId(cityId: number) {
        this.cityId = cityId;
    }
}
