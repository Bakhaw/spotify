"use client";

import { useCallback, useState } from "react";

import { TimeRange } from "@/types";
import useFetch from "@/hooks/useFetch";
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
  const storedTimeRange = localStorage.getItem(STORAGE_KEY) as TimeRange;
  const defaultTimeRange: TimeRange = storedTimeRange ?? "short_term";

  const [timeRange, setTimeRange] = useState<TimeRange>(defaultTimeRange);

  const spotifyApi = useSpotify();

  const getTopTracks = useCallback(
    () => spotifyApi.getMyTopTracks({ time_range: timeRange }),
    [spotifyApi, timeRange]
  );

  const topTracks = useFetch(getTopTracks);

  function onTimeRangeChange(timeRange: TimeRange) {
    setTimeRange(timeRange);
    localStorage.setItem(STORAGE_KEY, timeRange);
  }

  const labels = {
    short_term: "last month",
    medium_term: "last 6 months",
    long_term: "all time",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold lowercase">top tracks</h1>

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

      <TrackList showCover showVisualizer tracks={topTracks?.items} />
    </div>
  );
}

export default TopTracks;
