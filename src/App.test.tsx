import { getByTestId, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import App from "./App";
import PresentationPage from "./PresentationPageComponent/PresentationPage";

// test("renders learn react link", () => {
//   render(<App />);
//   const linkElement1 = screen.getByText(/Travel/i);
//   const linkElement2 = screen.getByText(/Organizer/i);
//   const linkElement3 = screen.getByText(/By Snt/i);

//   expect(linkElement1).toBeInTheDocument();
//   expect(linkElement2).toBeInTheDocument();
//   expect(linkElement3).toBeInTheDocument();
// });

// describe("App component", () => {
//   it("renders Apps", () => {
//     const { container } = render(<App />);
//     expect(container).toMatchSnapshot();
//   });
// });

// test("on render, check if we have 5 travel buttons", () => {
//   render(<App />)
//   const input = screen.getAllByTestId("travelButton")
//   expect(input).toHaveLength(5)
// })
