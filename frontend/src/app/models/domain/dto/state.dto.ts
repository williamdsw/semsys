
export class StateDTO {

    private id: number;
    private name: string;
    private abbreviation: string;

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

    public getAbbreviation(): string {
        return this.abbreviation;
    }

    public setAbbreviation(abbreviation: string) {
        this.abbreviation = abbreviation;
    }
}
