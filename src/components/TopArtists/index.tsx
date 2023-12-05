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

import TopArtistsSkeleton from "./TopArtistsSkeleton";

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

  return (
    <div className="flex flex-col gap-2">
      <div className="px-8 self-end">
        <Select
          defaultValue={timeRange}
          onValueChange={onTimeRangeChange}
          disabled={!topArtists}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short_term">last month</SelectItem>
            <SelectItem value="medium_term">last 6 months</SelectItem>
            <SelectItem value="long_term">all time</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {topArtists ? (
        <HorizontalSlider
          items={topArtists.items}
          type="artist"
          title="Top Artists"
        />
      ) : (
        <TopArtistsSkeleton />
      )}
    </div>
  );
}
export default TopArtists;
