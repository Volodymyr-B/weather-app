import axios from "axios";
const LOCATION_KEY = import.meta.env.VITE_LOCATION_KEY;
import type { Location } from "@/types/location";

export const LocationAction = {
  async getLoc(): Promise<Location> {
    const res = await axios.get(
      `https://geolocation-db.com/json/${LOCATION_KEY}`
    );
    return res.data;
  },
};
