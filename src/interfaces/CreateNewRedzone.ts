import type { Area } from "./Area";

export interface Redzone {
    id: string,
    name: string,
    description: string,
    cameraSpot: string,
    personLimit: number,
    responsibleGuard: string,
    area: Area;
}

export interface CreateNewRedzone {
      redzone: Redzone[];
}

