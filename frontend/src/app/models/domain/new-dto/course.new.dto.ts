
export class CourseNewDTO {

    private id: number;
    private name: string;
    private period: string;
    private type: string;

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

    public getPeriod(): string {
        return this.period;
    }

    public setPeriod(period: string) {
        this.period = period;
    }

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }
}
