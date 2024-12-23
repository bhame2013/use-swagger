import { useQuery, useQueryProps } from "./hook";

export function useMutation<T>(props: useQueryProps<T>) {
  return useQuery({ ...props, isMutation: true, enabled: false });
}


