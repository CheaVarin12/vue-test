import { reactive, computed } from "vue";
import { defineStore } from "pinia";
import axios from "axios";
interface CountryName {
  common: string;
  official: string;
  nativeName: Record<string, { official: string; common: string }>;
}

interface IDD {
  root: string;
  suffixes: string[];
}

interface Flags {
  png: string;
  svg: string;
}

interface Country {
  name: CountryName;
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: IDD;
  flags: Flags; // Add the flags property
}

export const useCountryStore = defineStore("country", () => {
  const state = reactive({
    country: [] as Country[],
    currentPage: 1,
    itemsPerPage: 25,
    loading: false, 
    sortOrder: 'asc',
  });

  const fetchData = async () => {
    state.loading = true; 
    try {
      const response = await axios.get("https://restcountries.com/v3.1/all");
      state.country = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      state.loading = false; 
    }
  };

  const searchCountry = async (searchTerm: string) => {
    state.loading = true; 
    try {
      const response = await axios.get(`https://restcountries.com/v3.1/name/${searchTerm}`);
      state.country = response.data;
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      state.loading = false; 
    }
  }

  const sortedCountry = computed(() => {
    return [...state.country].sort((a, b) => {
      if (state.sortOrder === 'asc') {
        return a.name.official.localeCompare(b.name.official);
      } else {
        return b.name.official.localeCompare(a.name.official);
      }
    });
  });


  const paginatedCountry = computed(() => {
    const start = (state.currentPage - 1) * state.itemsPerPage;
    const end = start + state.itemsPerPage;
    return sortedCountry.value.slice(start, end);
  });

  const totalPages = computed(() => {
    return Math.ceil(state.country.length / state.itemsPerPage);
  });

  const setPage = (page: number) => {
    if (page > 0 && page <= totalPages.value) {
      state.currentPage = page;
    }
  };

  const setSortOrder = (order: string) => {
    state.sortOrder = order;
  };

  return { state, fetchData, searchCountry, paginatedCountry, totalPages, setPage, setSortOrder };
});
