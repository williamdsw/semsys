import { MeetingScheduleDTO } from './meeting-schedule.dto';

export class ReportDTO {

    private id: number;
    private title: string;
    private content: string;
    private emission: Date;
    private schedule: MeetingScheduleDTO;

    constructor() {}

    public getId(): number {
        return this.id;
    }

    public setId(id: number) {
        this.id = id;
    }

    public getTitle(): string {
        return this.title;
    }

    public setTitle(title: string) {
        this.title = title;
    }

    public getContent(): string {
        return this.content;
    }

    public setContent(content: string) {
        this.content = content;
    }

    public getEmission(): Date {
        return this.emission;
    }

    public setEmission(emission: Date) {
        this.emission = emission;
    }

    public getSchedule(): MeetingScheduleDTO {
        return this.schedule;
    }

    public setSchedule(schedule: MeetingScheduleDTO) {
        this.schedule = schedule;
    }
}
