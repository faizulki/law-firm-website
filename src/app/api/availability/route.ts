import { NextResponse } from "next/server";
import { getAvailabilityOverrides } from "@/lib/availability-store";

/** Public — whole days the owner has blocked off, so the Calendar can disable them. */
export async function GET() {
  const { blockedDates } = getAvailabilityOverrides();
  return NextResponse.json({ blockedDates });
}
