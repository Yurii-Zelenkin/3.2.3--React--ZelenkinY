import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { MantineProvider } from "@mantine/core";
import { LaunchModal } from "./LaunchModal";

const mockLaunch = {
  flight_number: 1,
  mission_name: "Test Mission",
  launch_year: "2020",
  launch_date_utc: "2020-01-01T00:00:00.000Z",
  details: "Test details",
  rocket: { rocket_name: "Falcon 9" },
  links: { mission_patch: "test.jpg" },
};

describe("LaunchModal", () => {
  it("does not render when closed", () => {
    render(
      <MantineProvider>
        <LaunchModal launch={mockLaunch} isOpen={false} onClose={vi.fn()} />
      </MantineProvider>
    );
    expect(screen.queryByText("Test Mission")).not.toBeInTheDocument();
  });

  it("renders content when open", () => {
    render(
      <MantineProvider>
        <LaunchModal launch={mockLaunch} isOpen={true} onClose={vi.fn()} />
      </MantineProvider>
    );
    expect(screen.getByText("Test Mission")).toBeInTheDocument();
    expect(screen.getByText("Falcon 9")).toBeInTheDocument();
    expect(screen.getByText("2020")).toBeInTheDocument();
  });

  it("calls onClose when Close button clicked", () => {
    const mockOnClose = vi.fn();
    render(
      <MantineProvider>
        <LaunchModal launch={mockLaunch} isOpen={true} onClose={mockOnClose} />
      </MantineProvider>
    );

    fireEvent.click(screen.getByText("Close"));
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });
});
