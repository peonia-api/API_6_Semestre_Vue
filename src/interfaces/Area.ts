export interface User {
    id: string;
    name: string;
    surname: string;
    email: string;
    function: string;
    permissionType: string;
  }
  
export interface RedZone {
    id: string;
    name: string;
    description: string;
    cameraSpot: string;
    personLimit: number;
    responsibleGuard: string;
  }
  
export interface Area {
    id: string;
    name: string;
    description: string;
    responsibleManager: string;
    user: User;
    redZones: RedZone[];
  }
  
 export interface TransformedRedZone extends RedZone {
    area: Omit<Area, 'redZones'>;
}