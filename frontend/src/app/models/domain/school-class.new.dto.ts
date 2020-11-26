
export class SchoolClassNewDTO {

    // FIELDS

    private id: number;
    private name: string;
    private start: Date;
    private end: Date;
    private courseId: number;

    // CONSTRUCTOR

    constructor() {}

    // GETTERS / SETTERS

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

    public getStart(): Date {
        return this.start;
    }

    public setStart(start: Date) {
        this.start = start;
    }

    public getEnd(): Date {
        return this.end;
    }

    public setEnd(end: Date) {
        this.end = end;
    }

    public getCourseId(): number {
        return this.courseId;
    }

    public setCourseId(courseId: number) {
        this.courseId = courseId;
    }
}
