interface Area {
    id: number,
    name: string,
    description: string
    responsibleManager
}

export interface AreaResponse {
    Area: Area[]
}