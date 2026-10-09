import { expect, test } from "vitest";
import { ContactData } from "@/lib/validation";

test("valid form", () => {
    const result = ContactData.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "Hello world!",
    });
    expect(result.success).toBe(true);
});

test("Empty name", () => {
    const result = ContactData.safeParse({
        name: "",
        email: "john@example.com",
        message: "Hello world!",
    });
    expect(result.success).toBe(false);
});

test("Invalid email", () => {
    const result = ContactData.safeParse({
        name: "John Doe",
        email: "john_example.com",
        message: "Hello world!",
    });
    expect(result.success).toBe(false);
});

test("Empty message", () => {
    const result = ContactData.safeParse({
        name: "John Doe",
        email: "john@example.com",
        message: "",
    });
    expect(result.success).toBe(false);
});
