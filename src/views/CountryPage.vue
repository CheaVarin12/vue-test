<script setup lang="ts">
import { useCountryStore } from "@/stores/country";
import Modal from "@/components/Modal.vue";
import { ref, onMounted } from "vue";

const countryStore = useCountryStore();
const selectedCountry = ref(null);
const isModalVisible = ref(false);
const sortOrder = ref('asc');
const search = ref('');

onMounted(async () => {
  await countryStore.fetchData();
});
const prevPage = () => {
  countryStore.setPage(countryStore.state.currentPage - 1);
};

const nextPage = () => {
  countryStore.setPage(countryStore.state.currentPage + 1);
};

const handleShowModal = (country:any) => {
  selectedCountry.value = country;
  isModalVisible.value = true;
};

const handleHideModal = () => {
  isModalVisible.value = false;
  selectedCountry.value = null;
};

const handleSearch = () => {
  countryStore.searchCountry(search.value);
};
const changeSortOrder = () => {
  countryStore.setSortOrder(sortOrder.value);
};
</script>

<template>
  <div class="flex justify-center">
    <div class="max-w-[90vw] flex flex-col gap-5">
      <div class="sticky top-0 z-50">
        <div
          class="bg-white border-gray-200 px-4 lg:px-6 py-2.5 dark:bg-gray-800"
        >
          <div class="flex flex-wrap justify-between items-center">
            <span
              class="self-center text-xl font-semibold whitespace-nowrap dark:text-white"
            >
              Countries Catalog Implementation
            </span>
            <div class="flex items-center lg:order-2 mr-4">
              <select
                class="mr-2 p-2 border rounded"
                v-model="sortOrder"
                @change="changeSortOrder"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>
              <div class="relative">
                <div
                  class="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
                >
                  <svg
                    class="w-4 h-4 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 20 20"
                  >
                    <path
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                    />
                  </svg>
                </div>
                <input
                  type="search"
                  id="default-search"
                  v-model="search"
                  @input="handleSearch()"
                  class="block w-full p-[8px] pl-10 text-sm text-gray-900 border border-gray-300 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search..."
                />
              </div>
            </div>
            <div
              class="hidden justify-between items-center w-full lg:flex lg:w-auto lg:order-1"
              id="mobile-menu-2"
            ></div>
          </div>
        </div>
      </div>
      <div>
        <div class="shadow-md h-[75vh] overflow-y-scroll bg-white">
          <div
            v-if="countryStore.state.loading"
            class="flex justify-center items-center h-full"
          >
            <div
              role="status"
              class="absolute inset-0 flex justify-center items-center"
            >
              <svg
                aria-hidden="true"
                class="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span class="ml-2 text-blue-600">Loading...</span>
            </div>
          </div>
          <table
            class="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400"
          >
            <thead
              class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 sticky top-0"
            >
              <tr>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  Flags
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  Country Name
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  2 character Country Code
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  3 character Country Code
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  Native Country Name
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  Alternative Country Name
                </th>
                <th scope="col" class="px-6 py-3 bg-gray-50 dark:bg-gray-700">
                  Country Calling Codes
                </th>
              </tr>
            </thead>
            <tbody>
              <template
                v-for="item in countryStore.paginatedCountry"
                :key="item.id"
              >
                <tr
                  class="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <td scope="col" class="px-6 break-word py-3 w-[10%]">
                    <img :src="item.flags.png" alt="" />
                  </td>
                  <td
                    scope="col"
                    class="px-6 break-word py-3 w-[15%] cursor-pointer hover:text-sky-500"
                    @click="handleShowModal(item)"
                  >
                    {{ item?.name?.official }}
                  </td>
                  <td scope="col" class="px-6 break-word py-3 w-[15%]">
                    {{ item.cca2 }}
                  </td>
                  <td scope="col" class="px-6 break-word py-3 w-[15%]">
                    {{ item.cca3 }}
                  </td>
                  <td scope="col" class="px-6 break-word py-3 w-[15%]">
                    <div
                      v-for="(native, code) in item.name.nativeName"
                      :key="code"
                    >
                      <strong>{{ code }}:</strong> {{ native.official }} ({{
                        native.common
                      }})
                    </div>
                  </td>
                  <td scope="col" class="px-6 break-word py-3 w-[15%]">
                    {{ item.altSpellings.join(",") }}
                  </td>
                  <td scope="col" class="px-6 break-all py-3 w-[15%]">
                    <div
                      v-for="(value, index) in item.idd.suffixes"
                      :key="index"
                    >
                      {{ item.idd.root + value }}
                    </div>
                  </td>
                </tr>
              </template>
            </tbody>
          </table>
        </div>
        <div class="mt-2">
          <div class="bg-white">
            <div class="flex justify-between h-[56px]">
              <div class="mt-4 mx-3">
                Page {{ countryStore.state.currentPage }} of
                {{ countryStore.totalPages }}
              </div>
              <div class="flex mt-2 mx-4">
                <button
                  @click="prevPage"
                  :disabled="countryStore.state.currentPage === 1"
                  class="flex items-center justify-center px-6 h-10 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Previous
                </button>
                <button
                  @click="nextPage"
                  :disabled="
                    countryStore.state.currentPage === countryStore.totalPages
                  "
                  class="flex items-center justify-center px-9 h-10 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <Modal
    :isVisible="isModalVisible"
    :country="selectedCountry"
    @close="handleHideModal"
  />
</template>

<style scoped>
.table-container {
  position: relative;
  overflow-y: auto;
  height: 70vh;
}
thead {
  position: sticky;
  top: 0;
  background: inherit;
}
</style>
