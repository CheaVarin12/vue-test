<script setup lang="ts">
import type { PropType } from 'vue';

interface CountryName {
  common: string;
  official: string;
  nativeName: Record<string, { official: string; common: string }>;
}

interface IDD {
  root: string;
  suffixes: string[];
}

interface Country {
  name: CountryName;
  cca2: string;
  cca3: string;
  altSpellings: string[];
  idd: IDD;
}

interface Props {
  isVisible: boolean;
   country: Country | null; // Allow null
}

const props = defineProps<Props>();
const emit = defineEmits(['close']);
</script>

<template>
  <div v-if="props.isVisible" class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div class="bg-white p-5 rounded shadow-lg max-w-lg w-full">
      <h2 v-if="props.country" class="text-xl font-bold mb-4">{{ props.country.name.official }}</h2>
      <p v-if="props.country"><strong>2 Character Country Code:</strong> {{ props.country.cca2 }}</p>
      <p v-if="props.country"><strong>3 Character Country Code:</strong> {{ props.country.cca3 }}</p>
      <p v-if="props.country"><strong>Native Country Name:</strong></p>
      <div v-if="props.country" v-for="(native, code) in props.country.name.nativeName" :key="code">
        <strong>{{ code }}:</strong> {{ native.official }} ({{ native.common }})
      </div>
      <p v-if="props.country"><strong>Alternative Country Names:</strong> {{ props.country.altSpellings.join(",") }}</p>
      <p v-if="props.country" class=" break-all"><strong>Country Calling Codes:</strong> 
        {{ props.country.idd?.root ?? '' }}{{ (props.country.idd?.suffixes ?? []).join(',') }}
      </p>
      <button @click="$emit('close')" class="mt-4 bg-blue-500 text-white py-2 px-4 rounded float-right">Close</button>
    </div>
  </div>
</template>

<style scoped>
.fixed {
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
}
.bg-white {
  padding: 1.25rem;
  border-radius: 0.375rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.mt-4 {
  margin-top: 1rem;
}
.bg-blue-500 {
  background-color: #3b82f6;
}
.text-white {
  color: #fff;
}
.py-2 {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
}
.px-4 {
  padding-left: 1rem;
  padding-right: 1rem;
}
.rounded {
  border-radius: 0.375rem;
}
</style>
