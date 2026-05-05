import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    try {
      const parsed = JSON.parse(localStorage.getItem("desi_cart") || "[]");
      return parsed.map((item) => ({
        ...item,
        priceAED:
          item.priceAED !== undefined ? item.priceAED : item.priceEUR * 4 || 0,
      }));
    } catch {
      return [];
    }
  });

  const [coupon, setCoupon] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("desi_coupon") || "null");
    } catch {
      return null;
    }
  });

  useEffect(() => {
    localStorage.setItem("desi_cart", JSON.stringify(items));
  }, [items]);
  useEffect(() => {
    localStorage.setItem("desi_coupon", JSON.stringify(coupon));
  }, [coupon]);

  const add = (product) => {
    setItems((prev) => {
      const existing = prev.find((i) => i.slug === product.slug);
      if (existing)
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + 1 } : i,
        );
      return [
        ...prev,
        {
          slug: product.slug,
          qty: 1,
          priceAED: product.priceAED,
          image: product.image,
          name: product.name,
        },
      ];
    });
  };
  const remove = (slug) => setItems((p) => p.filter((i) => i.slug !== slug));
  const updateQty = (slug, qty) =>
    setItems((p) =>
      p.map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i)),
    );
  const clear = () => {
    setItems([]);
    setCoupon(null);
  };

  const applyCoupon = (appliedCoupon) => setCoupon(appliedCoupon);
  const removeCoupon = () => setCoupon(null);

  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotalAED = items.reduce((s, i) => s + i.priceAED * i.qty, 0);

  let discountAED = 0;
  if (coupon) {
    if (coupon.discountType === "percent") {
      discountAED = subtotalAED * (coupon.discountValue / 100);
    } else {
      discountAED = parseFloat(coupon.discountValue);
    }
  }

  // ensure discount doesn't exceed subtotal
  discountAED = Math.min(discountAED, subtotalAED);
  const totalAED = Math.max(0, subtotalAED - discountAED);

  return (
    <CartContext.Provider
      value={{
        items,
        add,
        remove,
        updateQty,
        clear,
        count,
        subtotalAED,
        totalAED,
        discountAED,
        coupon,
        applyCoupon,
        removeCoupon,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
