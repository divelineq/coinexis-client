import { useSuspenseQuery } from "@tanstack/react-query";
import axios from "axios";

const API = import.meta.env.VITE_API_KEY;

export function useGetAllAssetsName() {
	return useSuspenseQuery({
    queryKey: ['assets'],
    queryFn: async () => {
      const res = await axios.get('https://production-api.mobula.io/api/1/all', {
        headers: {
          'Authorization': `Bearer ${API}`
        }
      });
      return res.data.data.map((item: any) => item.name)
    }
  })
}