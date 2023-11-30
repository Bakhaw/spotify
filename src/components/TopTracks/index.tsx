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

import TrackList from "../TrackList";

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

  if (!topTracks) return null;

  return (
    <div className="flex flex-col gap-2 p-8">
      <div className="self-end">
        <Select defaultValue={timeRange} onValueChange={onTimeRangeChange}>
          <SelectTrigger className="w-[120px] text-black">
            <SelectValue className="text-black" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="short_term">1 month</SelectItem>
            <SelectItem value="medium_term">6 months</SelectItem>
            <SelectItem value="long_term">All</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <TrackList showCover title="top tracks" tracks={topTracks.items} />
    </div>
  );
}

export default TopTracks;
