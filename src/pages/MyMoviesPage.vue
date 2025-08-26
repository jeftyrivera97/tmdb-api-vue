<script setup lang="ts">
import MyMoviesComponent from '../components/MyMoviesComponent.vue';
import NewMovieForm from '../components/NewMovieForm.vue'

</script>

<template>
    <div class="container mx-auto px-4 py-2">
        <h1 class="text-3xl font-bold mb-8 text-center">My Movies</h1>

        <!-- Two Column Layout -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-2">
            <!-- Left Column - Form -->
            <div class="space-y-6">
                <NewMovieForm />
            </div>

            <!-- Right Column - Empty for now -->
            <div class="space-y-6">
                <MyMoviesComponent />
            </div>

        </div>
    </div>
</template>


<style scoped>
/* Your styles here */
</style>
<!-- Your component content here -->
