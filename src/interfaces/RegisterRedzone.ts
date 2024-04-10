interface Registro {
    id: number,
    occurrence: string,
    dateTime: string,
    room: number
}

export interface Register {
    registro: Registro[]
}