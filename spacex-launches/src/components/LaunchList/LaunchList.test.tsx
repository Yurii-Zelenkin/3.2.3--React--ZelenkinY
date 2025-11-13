import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { LaunchList } from "./LaunchList";

vi.mock("../../hooks/useSpaceXLaunches", () => ({
  useSpaceXLaunches: () => ({
    launches: [
      {
        flight_number: 1,
        mission_name: "Test Mission",
        rocket: { rocket_name: "Falcon 9" },
        links: { mission_patch_small: "test.jpg" },
      },
    ],
    loading: false,
    error: null,
    selectedLaunch: null,
    modalOpen: false,
    openModal: vi.fn(),
    closeModal: vi.fn(),
  }),
}));

describe("LaunchList", () => {
  it("renders page title", () => {
    render(
      <MantineProvider>
        <LaunchList />
      </MantineProvider>
    );
    expect(screen.getByText("SpaceX Launches 2020")).toBeInTheDocument();
  });

  it("renders mission names", () => {
    render(
      <MantineProvider>
        <LaunchList />
      </MantineProvider>
    );
    expect(screen.getByText("Test Mission")).toBeInTheDocument();
  });

  it("renders rocket names", () => {
    render(
      <MantineProvider>
        <LaunchList />
      </MantineProvider>
    );
    expect(screen.getByText("Falcon 9")).toBeInTheDocument();
  });
});
