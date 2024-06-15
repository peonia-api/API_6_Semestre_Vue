interface Registro {
    id: number,
    occurrence: string,
    dateTime: string,
    room: number,
    count: number
}

export interface Register {
    registro: Registro[]
}