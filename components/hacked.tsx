"use client";

import { fetchFromAPI } from "@/app/extras/action";

export default function HackedComponent({}: any) {
  fetchFromAPI();
  return <div>hacked</div>;
}
