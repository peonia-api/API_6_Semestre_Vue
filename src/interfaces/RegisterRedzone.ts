interface Registro {
    id: number,
    occurrence: string,
    dateTime: string,
    room: number
}

export interface RegistroRedzone {
    registro: Registro[]
}