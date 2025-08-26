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
          This is a comprehensive movie management application built with Vue 3, TypeScript, and Tailwind CSS.
          It combines The Movie Database (TMDb) API for discovering popular movies with a custom Ruby on Rails backend 
          for managing your personal movie collection. Features include user authentication, CRUD operations, 
          and a modern responsive interface.
        </p>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Frontend Technologies
        </h2>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li><strong>Vue 3</strong> - Progressive JavaScript framework with Composition API</li>
          <li><strong>TypeScript</strong> - Type-safe JavaScript for better development experience</li>
          <li><strong>Tailwind CSS</strong> - Utility-first CSS framework for styling</li>
          <li><strong>DaisyUI</strong> - Component library built on top of Tailwind CSS</li>
          <li><strong>Vue Router 4</strong> - Official routing library with navigation guards</li>
          <li><strong>Pinia</strong> - Modern state management for Vue.js applications</li>
          <li><strong>Vite</strong> - Next-generation build tool and development server</li>
          <li><strong>Heroicons</strong> - Beautiful hand-crafted SVG icons</li>
        </ul>
      </div>

      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Backend & APIs
        </h2>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li><strong>Ruby on Rails API</strong> - RESTful backend for personal movie management</li>
          <li><strong>TMDb API</strong> - The Movie Database API for popular movies data</li>
          <li><strong>LocalStorage</strong> - Client-side session management</li>
          <li><strong>File-based User System</strong> - Simulated user authentication</li>
        </ul>
      </div>


      <div>
        <h2 class="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
          Architecture Patterns
        </h2>
        <ul class="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
          <li><strong>Composition API</strong> - Modern Vue 3 reactive composition</li>
          <li><strong>Store Pattern</strong> - Centralized state management with Pinia</li>
          <li><strong>Helper Pattern</strong> - Reusable composables for API operations</li>
          <li><strong>Component Composition</strong> - Modular and reusable Vue components</li>
          <li><strong>TypeScript Interfaces</strong> - Strong typing for data models</li>
          <li><strong>Separation of Concerns</strong> - Clean architecture with distinct layers</li>
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
