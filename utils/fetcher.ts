import axios, { isAxiosError } from "axios";

type FetcherParams = {
  url: string;
  method: "GET" | "POST" | "PATCH" | "DELETE";
  data?: unknown;
  token?: string;
  file?: boolean;
};

export async function fetcher({
  url,
  method,
  data,
  token,
  file,
}: FetcherParams) {
  const options = {
    url: `https://api.sinarbajakediri.my.id/api` + url,
    method,
  };

  if (data) {
    Object.assign(options, { data });
  }

  if (file) {
    Object.assign(options, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  if (token) {
    Object.assign(options, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  try {
    const response = await axios(options);
    return response.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error.response?.data;
    }
  }
}
