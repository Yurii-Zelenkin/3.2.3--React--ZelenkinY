import { useReducer, useEffect } from "react";
import type { Launch, LaunchesState, LaunchesAction } from "../types/launch";

const initialState: LaunchesState = {
  launches: [],
  loading: false,
  error: null,
  selectedLaunch: null,
  modalOpen: false,
};

function launchesReducer(
  state: LaunchesState,
  action: LaunchesAction
): LaunchesState {
  switch (action.type) {
    case "FETCH_START":
      return { ...state, loading: true, error: null };
    case "FETCH_SUCCESS":
      return { ...state, loading: false, launches: action.payload };
    case "FETCH_ERROR":
      return { ...state, loading: false, error: action.payload };
    case "OPEN_MODAL":
      return { ...state, modalOpen: true, selectedLaunch: action.payload };
    case "CLOSE_MODAL":
      return { ...state, modalOpen: false, selectedLaunch: null };
    default:
      return state;
  }
}

export function useSpaceXLaunches() {
  const [state, dispatch] = useReducer(launchesReducer, initialState);

  useEffect(() => {
    const fetchLaunches = async () => {
      dispatch({ type: "FETCH_START" });

      try {
        await new Promise((resolve) => setTimeout(resolve, 3000));
        const response = await fetch(
          "https://api.spacexdata.com/v3/launches?launch_year=2020"
        );

        if (!response.ok) {
          throw new Error("Failed to fetch launches");
        }

        const data: Launch[] = await response.json();
        console.log("Data received:", data.length, "launches");
        dispatch({ type: "FETCH_SUCCESS", payload: data });
      } catch (error) {
        console.error("Error:", error);
        dispatch({ type: "FETCH_ERROR", payload: (error as Error).message });
      }
    };

    fetchLaunches();
  }, []);

  const openModal = (launch: Launch) => {
    dispatch({ type: "OPEN_MODAL", payload: launch });
  };

  const closeModal = () => {
    dispatch({ type: "CLOSE_MODAL" });
  };

  return {
    ...state,
    openModal,
    closeModal,
  };
}
