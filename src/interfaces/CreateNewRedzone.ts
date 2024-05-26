import type { Area, User } from "./Area";

export interface Redzone {
    id: string,
    name: string,
    description: string,
    cameraSpot: string,
    personLimit: number,
    responsibleGuard: string,
    area: Area;
    user: User
}

export interface CreateNewRedzone {
      redzone: Redzone[];
}

