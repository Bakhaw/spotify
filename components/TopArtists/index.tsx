"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { TimeRange } from "@/types";


import HorizontalSlider from "@/components/HorizontalSlider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import useSpotify from "@/hooks/useSpotify";

const STORAGE_KEY = "topArtists__timeRange";

function TopArtists() {
  const spotifyApi = useSpotify();

  const storedTimeRange =
    typeof window !== "undefined"
      ? (localStorage.getItem(STORAGE_KEY) as TimeRange)
      : undefined;

  const defaultTimeRange: TimeRange = storedTimeRange ?? "short_term";
  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  function onTimeRangeChange(timeRange: TimeRange) {
    setTimeRange(timeRange);
    localStorage.setItem(STORAGE_KEY, timeRange);
  }

  const getTopArtists = async () =>
    (await spotifyApi.getMyTopArtists({ time_range: timeRange })).body;

  const {
    isPending,
    error,
    data: topArtists,
  } = useQuery({
    queryKey: ["getTopArtists", { timeRange }],
    queryFn: getTopArtists,
  });

  if (error) return "Error....";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center space-y-2">
        <h1 className="text-3xl font-bold">Top artists</h1>

        <div>
          <Select
            defaultValue={timeRange}
            onValueChange={onTimeRangeChange}
            disabled={!topArtists}
          >
            <SelectTrigger className="px-1">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="short_term">last month</SelectItem>
              <SelectItem value="medium_term">last 6 months</SelectItem>
              <SelectItem value="long_term">all time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isPending ? (
        <HorizontalSlider.Skeleton />
      ) : (
        <HorizontalSlider items={topArtists?.items} rankIcons type="artist" />
      )}
    </div>
  );
}
export default TopArtists;
