"use client";

import { useCallback, useState } from "react";

import { TimeRange } from "@/types";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";

import HorizontalSlider from "@/components/HorizontalSlider";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function TopArtists() {
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");

  const spotifyApi = useSpotify();
  const getTopArtists = useCallback(
    () => spotifyApi.getMyTopArtists({ time_range: timeRange }),
    [spotifyApi, timeRange]
  );

  const topArtists =
    useFetch<SpotifyApi.UsersTopArtistsResponse>(getTopArtists);

  function onTimeRangeChange(timeRange: TimeRange) {
    setTimeRange(timeRange);
  }

  const labels = {
    short_term: "last month",
    medium_term: "last 6 months",
    long_term: "all time",
  };

  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center">
        <h1 className="pl-4 text-3xl font-bold lowercase">top artists</h1>

        <div>
          <Select
            defaultValue={timeRange}
            onValueChange={onTimeRangeChange}
            disabled={!topArtists}
          >
            <SelectTrigger aria-label={labels[timeRange]} className="px-1">
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

      <HorizontalSlider items={topArtists?.items} type="artist" />
    </div>
  );
}
export default TopArtists;
