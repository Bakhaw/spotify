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

function TopTracks() {
  const [timeRange, setTimeRange] = useState<TimeRange>("long_term");

  const spotifyApi = useSpotify();

  const getTopTracks = useCallback(
    () => spotifyApi.getMyTopTracks({ time_range: timeRange }),
    [spotifyApi, timeRange]
  );

  const topTracks = useFetch(getTopTracks);

  function onTimeRangeChange(timeRange: TimeRange) {
    setTimeRange(timeRange);
  }

  const labels = {
    short_term: "last month",
    medium_term: "last 6 months",
    long_term: "all time",
  };

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="self-end">
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

      <TrackList showCover title="top tracks" tracks={topTracks?.items} />
    </div>
  );
}

export default TopTracks;
