import { EmployeeDTO } from './employee.dto';
import { StudentDTO } from './student.dto';

export class MeetingScheduleDTO {

    // FIELDS

    private id: number;
    private datetime: Date;
    private employee: EmployeeDTO;
    private student: StudentDTO;
    private meetingStatus: string;

    // CONSTRUCTOR

    constructor() {}

    // GETTERS / SETTERS

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

    public getEmployee(): EmployeeDTO {
        return this.employee;
    }

    public setEmployee(employee: EmployeeDTO) {
        this.employee = employee;
    }

    public getStudent(): StudentDTO {
        return this.student;
    }

    public setStudent(student: StudentDTO) {
        this.student = student;
    }

    public getMeetingStatus(): string {
        return this.meetingStatus;
    }

    public setMeetingStatus(meetingStatus: string) {
        this.meetingStatus = meetingStatus;
    }
}
