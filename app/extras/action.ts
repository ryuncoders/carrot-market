"use server";

import "server-only";

// client에서 fetch하면 안되는 경우
export function fetchFromAPI() {
  fetch(".....");
}
