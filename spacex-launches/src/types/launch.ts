export interface Launch {
  flight_number: number;
  mission_name: string;
  launch_year: string;
  launch_date_utc: string;
  details: string | null;
  rocket: {
    rocket_name: string;
  };
  links: {
    mission_patch: string | null;
    mission_patch_small: string | null;
  };
}

export interface LaunchesState {
  launches: Launch[];
  loading: boolean;
  error: string | null;
  selectedLaunch: Launch | null;
  modalOpen: boolean;
}

export type LaunchesAction =
  | { type: "FETCH_START" }
  | { type: "FETCH_SUCCESS"; payload: Launch[] }
  | { type: "FETCH_ERROR"; payload: string }
  | { type: "OPEN_MODAL"; payload: Launch }
  | { type: "CLOSE_MODAL" };
