export interface Redzone {
    id: number,
    name: string,
    description: string,
    cameraSpot: string,
    personLimit: number
}

export interface NewRedzone {
      redzone: Redzone[];
}

