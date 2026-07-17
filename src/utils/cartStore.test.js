import test from "node:test";
import assert from "node:assert/strict";
import { addCartItemToList, removeCartItemFromList } from "./cartStore.js";

test("adds different bookings while replacing an identical tour departure", () => {
  const first = { id: "first", tourId: "cycling-8-day", departureId: "2026-09-08", guests: 2 };
  const replacement = { id: "replacement", tourId: "cycling-8-day", departureId: "2026-09-08", guests: 3 };
  const secondDate = { id: "second", tourId: "cycling-8-day", departureId: "2026-09-19", guests: 2 };

  const items = addCartItemToList(addCartItemToList([first], secondDate), replacement);

  assert.deepEqual(items, [replacement, secondDate]);
});

test("removes only the selected cart item", () => {
  const items = [{ id: "first" }, { id: "second" }];

  assert.deepEqual(removeCartItemFromList(items, "first"), [{ id: "second" }]);
});
