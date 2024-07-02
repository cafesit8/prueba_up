import { useQuery } from "@tanstack/vue-query";
import axios from "axios";

export async function getFlags () {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY_URL_FLAGS}/all`);
    if (response.status !== 200) {
      throw new Error(response.data)
    }
    // La respuesta devuelve un array de más de 100 paises, por lo que solo tomo los primeros 30
    return response.data.splice(0, 30)
  } catch (error) {
    return error
  }
}

export async function searchCountry (country) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY_URL_FLAGS}/name/${country}`);
    if (response.status !== 200) {
      throw new Error(response.data)
    }
    return response.data
  } catch (error) {
    return error
  }
}

export async function getCountriesByContinent (continent) {
  try {
    const response = await axios.get(`${import.meta.env.VITE_API_KEY_URL_FLAGS}/region/${continent}`);
    if (response.status !== 200) {
      throw new Error(response.data)
    }
    return response.data
  } catch (error) {
    return error
  }
}

export function getFlagsData () {
  const { isError, data, error, isFetching, refetch } = useQuery({
    queryKey: ['flags'],
    queryFn: getFlags,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
  })
  return {
    isError,
    data,
    error,
    isFetching,
    refetch
  }
}
