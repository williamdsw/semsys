
export class MeetingScheduleNewDTO {

    private id: number;
    private datetime: Date;
    private employeeId: number;
    private studentId: number;

    constructor() {}

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getDatetime(): Date {
        return this.datetime;
    }

    public setDatetime(datetime: Date) {
        this.datetime = datetime;
    }

    public getEmployeeId(): number {
        return this.employeeId;
    }

    public setEmployeeId(employeeId: number) {
        this.employeeId = employeeId;
    }

    public getStudentId(): number {
        return this.studentId;
    }

    public setStudentId(studentId: number) {
        this.studentId = studentId;
    }
}
