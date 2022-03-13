import { render, screen } from "@testing-library/react";
import Message from "../message";

describe("Message tests", () => {
    test("render author & text", () => {
      render(<Message messageText="testMessage" userUid="test" author="author" name="name"/>);
  
      const text = screen.getByText("testMessage");
      expect(text).toBeDefined();
    });
  });
  