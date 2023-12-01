"use client";

import { useCallback, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import useFetch from "@/hooks/useFetch";
import useSpotify from "@/hooks/useSpotify";
import { TimeRange } from "@/types";

import HorizontalSlider from "../HorizontalSlider";

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

  if (!topArtists) return null;

  return (
    <div className="flex flex-col gap-2">
      <div className="px-8 self-end">
        <Select defaultValue={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[120px] text-black">
            <SelectValue className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short_term">last month</SelectItem>
            <SelectItem value="medium_term">last 6 months</SelectItem>
            <SelectItem value="long_term">all time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <HorizontalSlider
        items={topArtists.items}
        type="artist"
        title="Top Artists"
      />
    </div>
  );
}

export default TopArtists;
