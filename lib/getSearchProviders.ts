import { SearchProvider } from "@/types";

function getSearchProviders(): SearchProvider[] {
  const searchProviders = Object.values(SearchProvider).map((val) => val);
  return searchProviders;
}

export default getSearchProviders;
