import { fireEvent, render, screen } from "@testing-library/react";
import Form from "../form";

describe("Form tests", () => {
    test("matches snaphot", () => {
      const result = render(<Form sendMessage={() => {}} userUid="testUid" chatId="testChatId"/>);
  
      expect(result).toMatchSnapshot();
    });
  
    test("calls onSubmit when btn clicked", () => {
      const handleSubmit = jest.fn();
      render(<Form userUid="testUid" sendMessage={handleSubmit} chatId="testChatId"/>);
  
      const btn = screen.getByRole("button");

      fireEvent(
        btn,
        new MouseEvent("click", {
          bubbles: true,
          cancelable: true,
        })
      );
  
      expect(handleSubmit).toHaveBeenCalledTimes(1);
      expect(handleSubmit).toHaveBeenCalledWith("testUid", "", "", "testChatId");
    });

  });