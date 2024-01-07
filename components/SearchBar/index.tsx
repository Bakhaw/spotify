"use client";

import { FormEvent, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

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

  return (
    <form onSubmit={onSubmit}>
      <div className="w-full sm:w-2/6 rounded-full flex items-center">
        <div className="flex items-center relative">
          <IoSearchOutline className="absolute ml-4 w-5 h-5" />
        </div>
        <input
          className="w-full p-4 pl-12 rounded-full"
          placeholder="Search"
          defaultValue={defaultValue}
          ref={inputRef}
          type="text"
        />
      </div>
    </form>
  );
}

export default SearchBar;
