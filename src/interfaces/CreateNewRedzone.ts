export interface Redzone {
    id: number,
    name: string,
    description: string,
    cameraSpot: string,
    personLimit: number,
    responsibleGuard: string,
}

export interface CreateNewRedzone {
      redzone: Redzone[];
}

