interface FetchOptions extends RequestInit {
  headers?: HeadersInit;
}

export const authFetch = async <T = any>(
  url: string,
  options: FetchOptions = {}
): Promise<T | false> => {
  const token = localStorage.getItem("token");
  const isFormData = options.body instanceof FormData;

  try {
    const res = await fetch(url, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${token}`,
        ...(isFormData ? {} : { "Content-Type": "application/json" }),
      },
    });
if (res.ok) {
      const text = await res.text();
      try {
        const json = text ? JSON.parse(text) : null;
        if (json === null) {
          return { employees: [] } as T;
        }
        return json;
      } catch (error: unknown) {
        console.error("Invalid JSON response:", text);
        if (error instanceof Error) {
          console.error("Parsing error:", error.message);
        } else {
          console.error("Unknown parsing error:", error);
        }
        return { employees: [] } as T;
      }
    } else if (res.status === 500) {
      return false;
    } else {
      localStorage.removeItem("token");
      return false;
    }
  } catch (err: unknown) {
    console.error("Fetch error:", err);
    localStorage.removeItem("token");
    localStorage.removeItem("rol");
    return false;
  }
};