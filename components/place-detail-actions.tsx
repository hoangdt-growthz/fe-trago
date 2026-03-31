"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { isPlaceSaved, recordViewedPlace, toggleSavedPlace } from "@/lib/user-state";

export default function PlaceDetailActions({ placeId }: { placeId: string }) {
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    recordViewedPlace(placeId);
    setSaved(isPlaceSaved(placeId));
  }, [placeId]);

  return (
    <Button
      variant="outline"
      className="flex-1"
      onClick={() => {
        const next = toggleSavedPlace(placeId);
        setSaved(next.includes(placeId));
      }}
    >
      {saved ? "Da luu" : "Luu"}
    </Button>
  );
}
