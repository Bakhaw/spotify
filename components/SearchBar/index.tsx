"use client";

import { FormEvent, useRef } from "react";
import { IoSearchOutline } from "react-icons/io5";

import useQueryParams from "@/hooks/useQueryParams";

type QueryParams = {
  search: string;
};

function SearchBar() {
  const { queryParams, setQueryParams } = useQueryParams<QueryParams>();
  const inputRef = useRef<HTMLInputElement>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const query = inputRef?.current?.value;

    if (!query) return;

    setQueryParams({ search: inputRef?.current?.value });
    inputRef.current.blur();
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
          defaultValue={queryParams.search}
          ref={inputRef}
          type="text"
        />
      </div>
    </form>
  );
}

export default SearchBar;
