import { renderHook, act, waitFor } from "@testing-library/react";
import { describe, it, expect, beforeEach } from "vitest";
import { CartProvider, useCart } from "./CartContext";

describe("Cart functionality", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("adds a product to the cart", () => {
    const wrapper = ({ children }) => (
      <CartProvider>{children}</CartProvider>
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addToCart({
        id: 1,
        title: "Test Headphones",
        price: 2500,
      });
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cartCount).toBe(1);
  });
  it("removes a product from the cart", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });
  });

  act(() => {
    result.current.removeFromCart(1);
  });

  expect(result.current.cart).toHaveLength(0);
  expect(result.current.cartCount).toBe(0);
});
it("updates product quantity", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });
  });

  act(() => {
    result.current.updateQuantity(1, 3);
  });

  expect(result.current.cart[0].quantity).toBe(3);
  expect(result.current.cartCount).toBe(3);
});
it("saves cart items in localStorage", async () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });
  });

  await waitFor(() => {
    const savedCart = JSON.parse(localStorage.getItem("luna-cart"));

    expect(savedCart).toHaveLength(1);
    expect(savedCart[0].title).toBe("Test Headphones");
  });
});
it("loads saved cart items from localStorage", () => {
  const savedCart = [
    {
      id: 1,
      title: "Test Headphones",
      price: 2500,
      quantity: 2,
    },
  ];

  localStorage.setItem("luna-cart", JSON.stringify(savedCart));

  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  expect(result.current.cart).toEqual(savedCart);
  expect(result.current.cartCount).toBe(2);
});
it("increases quantity when the same product is added twice", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });

    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });
  });

  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].quantity).toBe(2);
  expect(result.current.cartCount).toBe(2);
});
it("does not allow product quantity below 1", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Test Headphones",
      price: 2500,
    });
  });

  act(() => {
    result.current.updateQuantity(1, 0);
  });

  expect(result.current.cart[0].quantity).toBe(1);
});
it("clears all products from the cart", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Headphones",
      price: 2500,
    });

    result.current.addToCart({
      id: 2,
      title: "Keyboard",
      price: 3000,
    });
  });

  act(() => {
    result.current.clearCart();
  });

  expect(result.current.cart).toHaveLength(0);
  expect(result.current.cartCount).toBe(0);
});
it("calculates the correct total price of cart items", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Headphones",
      price: 2500,
    });

    result.current.addToCart({
      id: 2,
      title: "Keyboard",
      price: 3000,
    });
  });

  const total = result.current.cart.reduce(
    (sum, item) => sum + Number(item.price) * item.quantity,
    0
  );

  expect(total).toBe(5500);
});
it("does not affect the cart when removing an unknown product", () => {
  const wrapper = ({ children }) => (
    <CartProvider>{children}</CartProvider>
  );

  const { result } = renderHook(() => useCart(), { wrapper });

  act(() => {
    result.current.addToCart({
      id: 1,
      title: "Headphones",
      price: 2500,
    });
  });

  act(() => {
    result.current.removeFromCart(999);
  });

  expect(result.current.cart).toHaveLength(1);
  expect(result.current.cart[0].title).toBe("Headphones");
  expect(result.current.cartCount).toBe(1);
});
});