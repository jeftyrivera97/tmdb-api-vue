<script setup lang="ts">
// About page component
</script>

<template>
  <div class="max-w-4xl mx-auto p-8">
    <h1 class="text-4xl font-bold text-gray-800 dark:text-white mb-8 text-center">
      About Movie App
    </h1>

    <div class="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 space-y-6">
      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          What is this app?
        </h2>
        <p class="text-gray-600 dark:text-gray-300 leading-relaxed">
          This is a movie discovery application built with Vue 3, TypeScript, and Tailwind CSS.
          It uses The Movie Database (TMDb) API to fetch and display popular movies.
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Technologies Used
        </h2>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Vue 3 with Composition API</li>

          <li>TypeScript for type safety</li>
          <li>Daisy UI for UI components</li>
          <li>Vue Router for navigation</li>
          <li>Tailwind CSS for styling</li>
          <li>Vite for build tooling</li>
          <li>TMDb API for movie data</li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Features
        </h2>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li>Browse popular movies</li>
          <li>Responsive grid layout</li>
          <li>Dark mode support</li>
          <li>Loading states and error handling</li>
          <li>Modern UI with Tailwind CSS</li>
        </ul>
      </div>

      <div class="pt-6 border-t border-gray-200 dark:border-gray-700">
        <RouterLink to="/popular"
          class="inline-flex items-center px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors">
          ← Back to Movies
        </RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Styles are handled by Tailwind CSS */
</style>
