interface Registro {
    id: number,
    occurrence: string,
    dateTime: string,
    room: string,
    count: number
}

export interface Register {
    registro: Registro[]
}