"use client";

import { useCallback, useState } from "react";
import { QueryFunction, QueryKey, useQuery } from "@tanstack/react-query";

import { TimeRange } from "@/types";
import useSpotify from "@/hooks/useSpotify";

import TrackList from "@/components/TrackList";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STORAGE_KEY = "topTracks__timeRange";

function TopTracks() {
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

  const labels = {
    short_term: "last month",
    medium_term: "last 6 months",
    long_term: "all time",
  };

  const getTopTracks = async () =>
    (await spotifyApi.getMyTopTracks({ time_range: timeRange })).body;

  const {
    isPending,
    error,
    data: topTracks,
  } = useQuery({
    queryKey: ["getTopTracks", { timeRange }],
    queryFn: getTopTracks,
  });

  if (error) return "Error....";

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Top tracks</h1>

        <div>
          <Select
            defaultValue={timeRange}
            onValueChange={onTimeRangeChange}
            disabled={!topTracks}
          >
            <SelectTrigger aria-label={labels[timeRange]}>
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
        <TrackList.Skeleton />
      ) : (
        <TrackList
          options={{
            showCoverWithPlayButton: true,
            showOrder: true,
            showVisualizer: true,
          }}
          tracks={topTracks.items}
        />
      )}
    </div>
  );
}

export default TopTracks;
