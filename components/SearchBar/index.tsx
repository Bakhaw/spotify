"use client";

import { FormEvent, useRef } from "react";
import Image from "next/image";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { IoSearchOutline } from "react-icons/io5";

import { SearchProvider } from "@/types/index";

import getSearchProviders from "@/lib/getSearchProviders";

import SpotifyIcon from "@/assets/spotify-icon.svg";
import YoutubeIcon from "@/assets/youtube-icon.svg";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchBar() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);
  const defaultValue = searchParams.get("query")?.toString();

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const params = new URLSearchParams(searchParams);

    const query = inputRef?.current?.value;

    if (query) {
      params.set("query", query);
    } else {
      params.delete("query");
    }

    inputRef?.current?.blur();

    replace(`${pathname}?${params.toString()}`);
  }

  function handleSelectChange(selectValue: SearchProvider) {
    const params = new URLSearchParams(searchParams);

    if (selectValue === "youtube") {
      params.set("provider", "youtube");
    } else {
      params.delete("provider");
    }

    replace(`${pathname}?${params.toString()}`);
  }

  const searchProviders = getSearchProviders();
  const providersIcons = {
    [SearchProvider.SPOTIFY]: SpotifyIcon,
    [SearchProvider.YOUTUBE]: YoutubeIcon,
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full sm:w-2/6 rounded-full flex items-center relative">
        <div className="flex items-center relative">
          <IoSearchOutline className="absolute ml-4 w-5 h-5" />
        </div>
        <input
          className="w-full py-4 pl-12 pr-16 rounded-full"
          placeholder="Search"
          defaultValue={defaultValue}
          ref={inputRef}
          type="text"
        />

        <div className="absolute right-0">
          <Select
            defaultValue={
              (searchParams.get("provider") as string) ?? SearchProvider.SPOTIFY
            }
            onValueChange={handleSelectChange}
          >
            <SelectTrigger className="px-2 rounded-full shadow-none">
              <SelectValue placeholder="Search with" />
            </SelectTrigger>
            <SelectContent className="min-w-0">
              {searchProviders.map((provider) => (
                <SelectItem
                  key={provider}
                  defaultValue={provider}
                  value={provider}
                >
                  <Image
                    alt={provider}
                    height={24}
                    width={24}
                    src={providersIcons[provider]}
                  />
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </form>
  );
}

export default SearchBar;
