import { PersonNewDTO } from './person.new.dto';

export class StudentNewDTO extends PersonNewDTO {

    // FIELDS

    private birthdate: Date;
    private schoolClassId: number;

    // CONSTRUCTOR

    constructor() {
        super();
    }

    // GETTERS / SETTERS

    public getBirthdate(): Date {
        return this.birthdate;
    }

    public setBirthdate(birthdate: Date) {
        this.birthdate = birthdate;
    }

    public getSchoolClassId(): number {
        return this.schoolClassId;
    }

    public setSchoolClassId(schoolClassId: number) {
        this.schoolClassId = schoolClassId;
    }
}
