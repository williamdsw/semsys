
export class PersonDTO {

    // FIELDS

    private id: number;
    private name: string;
    private email: string;
    private type: string;
    private profiles: string[] = [];
    private imageUrl?: string;
    
    // CONSTRUCTOR

    constructor() {}

    // GETTERS SETTERS

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

    public getType(): string {
        return this.type;
    }

    public setType(type: string) {
        this.type = type;
    }

    public getProfiles(): string[] {
        return this.profiles;
    }

    public setProfiles(profiles: string[]) {
        this.profiles = profiles;
    }

    public getImageUrl(): string {
        return this.imageUrl;
    }

    public setImageUrl(imageUrl: string) {
        this.imageUrl = imageUrl;
    }
}
