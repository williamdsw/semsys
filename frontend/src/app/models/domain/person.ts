
export interface Person {

    // FIELDS

    id: number,
    name: string,
    email: string,
    socialSecurityNumber: string,
    birthdate?: Date;

    phoneNumbers: string[],

    address: {
        id: number,
        street: string,
        number: string,
        complement?: string,
        zipCode: string,
        city: {
            name: string,
            state: {
                name: string
            }
        },
    },

    imageUrl?: string
}