import React from "react";
import App from "./App";
import { render, fireEvent, cleanup, screen } from "@testing-library/react";

import "@testing-library/jest-dom";

var title,
  nameInput,
  statusInput,
  addButton,
  allButton,
  activeButton,
  completedButton,
  noteList;

afterEach(() => {
  cleanup();
});

beforeEach(() => {
  render(<App />);
  // let { getByTestId, queryByTestId } = container();
  nameInput = screen.getByTestId("input-note-name");
  statusInput = screen.getByTestId("input-note-status");
  addButton = screen.getByTestId("submit-button");
  allButton = screen.getByTestId("allButton");
  activeButton = screen.getByTestId("activeButton");
  completedButton = screen.getByTestId("completedButton");
  noteList = screen.getByTestId("noteList");
});

test("initial UI is rendered as expected and button works", () => {
  expect(nameInput).toHaveValue("");
  expect(statusInput).toHaveValue("");
  expect(addButton).toHaveTextContent("Add Note");
  expect(allButton).toHaveTextContent("All");
  expect(completedButton).toHaveTextContent("Completed");
  expect(activeButton).toHaveTextContent("Active");
  expect(noteList.children.length).toBe(0);
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.click(addButton);
  expect(noteList.children.length).toBe(1);
});

test("button adds notes", () => {
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Progress" },
  });
  fireEvent.click(addButton);
  expect(noteList.children.length).toBe(1);
  expect(noteList.children[0].children[0]).toHaveTextContent("Study");
  expect(noteList.children[0].children[1]).toHaveTextContent("Progress");
});

test("Multiple notes can be added", () => {
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Completed" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Progress" },
  });
  fireEvent.click(addButton);
  expect(noteList.children.length).toBe(3);
  expect(noteList.children[0].children[0]).toHaveTextContent("Movie");
  expect(noteList.children[0].children[1]).toHaveTextContent("Active");
  expect(noteList.children[1].children[0]).toHaveTextContent(
    "Stocks investing",
  );
  expect(noteList.children[1].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[2].children[0]).toHaveTextContent("Study");
  expect(noteList.children[2].children[1]).toHaveTextContent("Progress");
});

test("Switching between buttons work", () => {
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Fill form" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Completed" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Complete code" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Completed" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Study" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Progress" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Cooking" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Pending" },
  });
  fireEvent.click(addButton);

  expect(noteList.children.length).toBe(6);
  expect(noteList.children[0].children[0]).toHaveTextContent("Movie");
  expect(noteList.children[0].children[1]).toHaveTextContent("Active");
  expect(noteList.children[1].children[0]).toHaveTextContent("Fill form");
  expect(noteList.children[1].children[1]).toHaveTextContent("Active");
  expect(noteList.children[2].children[0]).toHaveTextContent(
    "Stocks investing",
  );
  expect(noteList.children[2].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[3].children[0]).toHaveTextContent("Complete code");
  expect(noteList.children[3].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[4].children[0]).toHaveTextContent("Study");
  expect(noteList.children[4].children[1]).toHaveTextContent("Progress");
  expect(noteList.children[5].children[0]).toHaveTextContent("Cooking");
  expect(noteList.children[5].children[1]).toHaveTextContent("Pending");

  fireEvent.click(activeButton);
  expect(noteList.children.length).toBe(2);
  expect(noteList.children[0].children[0]).toHaveTextContent("Movie");
  expect(noteList.children[0].children[1]).toHaveTextContent("Active");
  expect(noteList.children[1].children[0]).toHaveTextContent("Fill form");
  expect(noteList.children[1].children[1]).toHaveTextContent("Active");

  fireEvent.click(completedButton);
  expect(noteList.children.length).toBe(2);
  expect(noteList.children[0].children[0]).toHaveTextContent(
    "Stocks investing",
  );
  expect(noteList.children[0].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[1].children[0]).toHaveTextContent("Complete code");
  expect(noteList.children[1].children[1]).toHaveTextContent("Completed");

  fireEvent.click(allButton);
  expect(noteList.children.length).toBe(6);
  expect(noteList.children[0].children[0]).toHaveTextContent("Movie");
  expect(noteList.children[0].children[1]).toHaveTextContent("Active");
  expect(noteList.children[1].children[0]).toHaveTextContent("Fill form");
  expect(noteList.children[1].children[1]).toHaveTextContent("Active");
  expect(noteList.children[2].children[0]).toHaveTextContent(
    "Stocks investing",
  );
  expect(noteList.children[2].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[3].children[0]).toHaveTextContent("Complete code");
  expect(noteList.children[3].children[1]).toHaveTextContent("Completed");
  expect(noteList.children[4].children[0]).toHaveTextContent("Study");
  expect(noteList.children[4].children[1]).toHaveTextContent("Progress");
  expect(noteList.children[5].children[0]).toHaveTextContent("Cooking");
  expect(noteList.children[5].children[1]).toHaveTextContent("Pending");
});

test("In Active tab, dont show Completed notes", () => {
  fireEvent.input(nameInput, {
    target: { value: "Movie" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Active" },
  });
  fireEvent.click(addButton);
  fireEvent.input(nameInput, {
    target: { value: "Fill form" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Active" },
  });
  fireEvent.click(addButton);
  fireEvent.click(activeButton);
  fireEvent.input(nameInput, {
    target: { value: "Stocks investing" },
  });
  fireEvent.input(statusInput, {
    target: { value: "Completed" },
  });
  fireEvent.click(addButton);
  expect(noteList.children.length).toBe(2);
  expect(noteList.children[0].children[0]).toHaveTextContent("Movie");
  expect(noteList.children[0].children[1]).toHaveTextContent("Active");
  expect(noteList.children[1].children[0]).toHaveTextContent("Fill form");
  expect(noteList.children[1].children[1]).toHaveTextContent("Active");

  fireEvent.click(completedButton);
  expect(noteList.children.length).toBe(1);
  expect(noteList.children[0].children[0]).toHaveTextContent(
    "Stocks investing",
  );
  expect(noteList.children[0].children[1]).toHaveTextContent("Completed");
});
