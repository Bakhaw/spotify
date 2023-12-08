"use client";

import { useEffect, useState } from "react";
import { ClientSafeProvider, getProviders } from "next-auth/react";

function useProviders() {
  const [providers, setProviders] = useState<ClientSafeProvider[]>([]);

  useEffect(() => {
    const initProviders = async () => await getProviders();

    initProviders().then((provider) =>
      setProviders((oldProviders) => {
        return {
          ...oldProviders,
          ...provider,
        };
      })
    );
  }, []);

  return providers;
}

export default useProviders;
