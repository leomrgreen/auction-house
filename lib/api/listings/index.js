import { API_LISTINGS } from "@/lib/constants";
import { headers } from "@/lib/headers";

export default class ListingAPI {
  apiListing = `${API_LISTINGS}`;

  handleResponse = async (res) => {
    if (res.status === 401) {
      window.location.href = "/";
      throw new Error("Unauthorized - Redirecting to home page.");
    }
    if (!res.ok) {
      const errorText = await res.text();
      throw new Error(`Error: ${res.status} ${errorText}`);
    }
    return res.json();
  };

  fetchData = async (endpoint, method = "GET", body = null) => {
    try {
      const res = await fetch(endpoint, {
        method,
        headers: headers(),
        body: body ? JSON.stringify(body) : undefined,
      });
      return await this.handleResponse(res);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  listings = {
    readAll: async (page = 1, limit = 12, active = true) => {
      const endpoint = `${this.apiListing}?limit=${limit}&page=${page}&_seller=true&_bids=true&_active=${active}`;
      return await this.fetchData(endpoint);
    },
  };
}
