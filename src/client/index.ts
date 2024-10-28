import { useQuery, useQueryProps } from "@/use-query";

export function createClient<Swagger>({
  fetcher,
  defaultHeaders = {},
}: {
  defaultHeaders?: Record<string, string>;
  fetcher: (params: { url?: string; method?: string; body?: any; headers?: Record<string, string> }) => Promise<any>;
}) {
  function replaceUrlParams<Url extends string>(url: Url, params?: Record<string, any>): string {
    if (!params) return url.slice(1);

    const usedParams = new Set<string>();
    const replacedUrl = url.replace(/\{(\w+)\}/g, (_, key) => {
      if (params[key] !== undefined) {
        usedParams.add(key);
        return encodeURIComponent(params[key]);
      }
      return `{${key}}`;
    }).slice(1);

    const unusedParams = Object.keys(params)
      .filter((key) => !usedParams.has(key))
      .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
      .join('&');

    return unusedParams ? `${replacedUrl}?${unusedParams}` : replacedUrl;
  }

  async function client<Url extends keyof Swagger, Method extends keyof Swagger[Url]>({
    url,
    method,
    body,
    headers = {},
  }: {
    url: Url;
    method: Method;
    headers?: Record<string, string>;
    body?: Partial<Omit<Swagger[Url][Method], 'result'>>;
  }) {
    const finalUrl = replaceUrlParams(url as string, (body as any)?.params);
    
    const res = await fetcher({
      url: finalUrl,
      method: method as any,
      body: (body as any)?.requestBody,
      headers: { ...defaultHeaders, ...headers },
    });

    return res as Swagger[Url][Method] extends { result: infer R } ? R : never;
  }

  function useSwagger<Url extends keyof Swagger, Method extends keyof Swagger[Url]>({
    url,
    method,
    body,
    ...rest
  }: {
    url: Url
    method: Method
    body?: Partial<Omit<Swagger[Url][Method], 'result'>>
  } & Partial<Omit<useQueryProps<any>, 'queryFn'>>) {
    return useQuery({
      queryKey: [url, method],
      ...rest,
      queryFn: async () => {
        const res = await client({ url, method, body })
        return res as Swagger[Url][Method] extends { result: infer R } ? R : never
      },
    })
  }

  return { client, useSwagger };
}