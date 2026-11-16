"use client";

import { useSyncExternalStore } from "react";
import { isOrder, orderQuery, type Order } from "@/data/gowns";

// The collection's chosen order, kept in the URL (?sort=) so it survives
// opening a gown and coming back. Read on the client so pages stay static:
// the server renders "Our picks" and the browser applies the URL's order.
const changed = "mm-order-change";

function read(): Order {
  const sort = new URLSearchParams(location.search).get("sort");
  return isOrder(sort) ? sort : "featured";
}

function subscribe(onChange: () => void) {
  addEventListener(changed, onChange);
  addEventListener("popstate", onChange);
  return () => {
    removeEventListener(changed, onChange);
    removeEventListener("popstate", onChange);
  };
}

export function useOrder() {
  const order = useSyncExternalStore(subscribe, read, () => "featured" as const);
  const setOrder = (next: Order) => {
    history.replaceState(history.state, "", location.pathname + orderQuery(next) + location.hash);
    dispatchEvent(new Event(changed));
  };
  return [order, setOrder] as const;
}
