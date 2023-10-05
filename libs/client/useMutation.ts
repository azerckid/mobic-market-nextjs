import { useState } from "react";

interface UseMutationState<T> {
  loading: boolean;
  data?: T;
  error?: object;
}
type UseMutationResult<T> = [(data: any) => void, UseMutationState<T>];

export default function useMutation<T = any>(
  url: string
): UseMutationResult<T> {
  const [state, setSate] = useState<UseMutationState<T>>({
    loading: false,
    data: undefined,
    error: undefined,
  });
  function mutation(data: any) {
    setSate((prev) => ({ ...prev, loading: true }));
    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setSate({ loading: false, data });
      })
      .catch((error) => {
        setSate({ loading: false, error });
      });
  }
  return [mutation, state];
}
