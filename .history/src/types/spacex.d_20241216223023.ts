export interface Launch {
    id: string;
    name: string;
    date_utc: string;
    rocket: string;
    success: boolean | null;
    details?: string;
    links: {
      webcast: string | null;
      patch: {
        small: string | null;
        large: string | null;
      };
    };
  }
  
  export interface Rocket {
    id: string;
    name: string;
    type: string;
  }
  