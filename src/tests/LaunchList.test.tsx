import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LaunchList from "../components/LaunchList";
import { BrowserRouter } from "react-router-dom";
import '@testing-library/jest-dom';


// Mock getLaunches API
jest.mock("../services/spacexApi", () => ({
  getLaunches: jest.fn().mockResolvedValue([
    {
      id: "1",
      name: "Test Launch 1",
      date_utc: "2024-01-01T00:00:00Z",
      rocket: "Falcon 9",
      success: true,
    },
    {
      id: "2",
      name: "Test Launch 2",
      date_utc: "2024-02-01T00:00:00Z",
      rocket: "Falcon Heavy",
      success: false,
    },
  ]),
}));

describe("LaunchList Component", () => {
  it("renders loading state initially", () => {
    render(
      <BrowserRouter>
        <LaunchList />
      </BrowserRouter>
    );
    expect(screen.getByText(/loading/i)).toBeInTheDocument();
  });

  it("displays launches after data is fetched", async () => {
    render(
      <BrowserRouter>
        <LaunchList />
      </BrowserRouter>
    );

    // Wait for launches to appear
    const launch1 = await screen.findByText(/test launch 1/i);
    const launch2 = await screen.findByText(/test launch 2/i);

    expect(launch1).toBeInTheDocument();
    expect(launch2).toBeInTheDocument();
  });

  it("filters launches by search term", async () => {
    render(
      <BrowserRouter>
        <LaunchList />
      </BrowserRouter>
    );

    // Wait for launches to appear
    await screen.findByText(/test launch 1/i);

    const searchInput = screen.getByPlaceholderText(/search by mission name/i);

    fireEvent.change(searchInput, { target: { value: "Test Launch 2" } });

    expect(screen.queryByText(/test launch 1/i)).not.toBeInTheDocument();
    expect(screen.getByText(/test launch 2/i)).toBeInTheDocument();
  });

  it("sorts launches by rocket name", async () => {
    render(
      <BrowserRouter>
        <LaunchList />
      </BrowserRouter>
    );

    // Wait for launches to appear
    await screen.findByText(/test launch 1/i);

    const sortDropdown = screen.getByLabelText(/sort by:/i);
    fireEvent.change(sortDropdown, { target: { value: "rocket" } });

    const launches = screen.getAllByRole("heading", { level: 2 });
    expect(launches[0].textContent).toBe("Test Launch 2");
    expect(launches[1].textContent).toBe("Test Launch 1");
  });

  it("handles pagination", async () => {
    render(
      <BrowserRouter>
        <LaunchList />
      </BrowserRouter>
    );

    // Wait for launches to appear
    await screen.findByText(/test launch 1/i);

    const nextButton = screen.getByText(/next/i);
    fireEvent.click(nextButton);

    expect(screen.queryByText(/test launch 1/i)).not.toBeInTheDocument();
  });
});
