import { PersonDTO } from './person.dto';

export class StudentDTO extends PersonDTO {

    private birthdate: Date;
    private schoolClass: string;
    private course: string;

    constructor() {
        super();
    }

    public getBirthdate(): Date {
        return this.birthdate;
    }

    public setBirthdate(birthdate: Date) {
        this.birthdate = birthdate;
    }

    public getSchoolClass(): string {
        return this.schoolClass;
    }

    public setSchoolClass(schoolClass: string) {
        this.schoolClass = schoolClass;
    }

    public getCourse(): string {
        return this.course;
    }

    public setCourse(course: string) {
        this.course = course;
    }
}
