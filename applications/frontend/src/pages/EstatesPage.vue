<script setup lang="ts">
import { ref } from 'vue'
import { getEstates } from '@/api/estates'
import type { Estate } from '@/types/estate'

const estates = ref<Estate[] | null>(null)
const filterApplied = ref<string | null>(null)
const searchQuery = ref<string | null>(null)

async function fetchEstates() {
  try {
    estates.value = await getEstates(filterApplied.value, searchQuery.value)
  } catch (error) {
    console.error(error)
  }
}

async function onSearchInput() {
  filterApplied.value = null
  fetchEstates()
}

function applyFilter(city: string) {
  filterApplied.value = city
  searchQuery.value = null
  fetchEstates()
}

function clear() {
  searchQuery.value = null
  filterApplied.value = null
  fetchEstates()
}

function highlightText(text: string): string {
  if (!searchQuery.value) return text
  return text.replace(new RegExp(searchQuery.value, 'gi'), '<mark>$&</mark>')
}

if (!estates.value) {
  fetchEstates()
}
</script>

<template>
  <div class="wrapper">
    <div class="table-wrapper">
      <h1>Таблица недвижимости</h1>

      <div class="filters-wrapper">
        <input
          v-model="searchQuery"
          type="text"
          placeholder="Поиск по адресу"
          class="search-input"
          @input="onSearchInput"
        />

        <button
          type="button"
          class="clear-btn"
          :class="{ hidden: !filterApplied && !searchQuery }"
          @click="clear"
        >
          Очистить
        </button>
      </div>

      <table v-if="estates?.length">
        <thead>
          <tr>
            <th>Адрес</th>
            <th>Город</th>
            <th>Тип</th>
            <th>Цена</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="estate in estates" :key="estate.id">
            <td v-html="highlightText(estate.address)"></td>
            <td class="city-table-cell">
              <span>{{ estate.city }}</span>
              <button
                v-if="!filterApplied"
                type="button"
                class="city-filter-btn"
                @click="applyFilter(estate.city)"
              >
                ⚙️
              </button>
            </td>
            <td>{{ estate.type }}</td>
            <td>{{ estate.price }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<style scoped>
.wrapper {
  display: flex;
  justify-content: center;
  padding: 20px 0px;
}

.filters-wrapper {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.search-input {
  padding: 4px 8px;
}

.clear-btn {
  padding: 4px 8px;
  cursor: pointer;
}

.hidden {
  opacity: 0;
  pointer-events: none;
}

.table-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

th,
td {
  padding: 10px 20px;
  border: solid #bebebe 1px;
}

.city-table-cell {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 8px;
}

.city-filter-btn {
  display: grid;
  place-items: center;
  height: 28px;
  width: 28px;
  line-height: 0;
  background: none;
  border: none;
  border-radius: 999px;
  cursor: pointer;
}

.city-filter-btn:hover {
  background: #e8e8e8;
}
</style>
