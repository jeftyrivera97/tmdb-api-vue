<script setup lang="ts">
import { useCreateMovie } from '../helpers/CreateNewMovie'
import AlertComponent from './AlertComponent.vue';


// Use the helper
const {
    movieForm,
    isLoading,
    error,
    success,
    handleSubmit,
} = useCreateMovie()
</script>

<template>


    <form @submit="handleSubmit" class="space-y-6">
        <div class="card w-96 bg-base-100 card-md shadow-sm">
            <div class="card-body">
                <h2 class="card-title">New Movie Form</h2>
                <!-- Success Message -->
                <AlertComponent v-if="success" :message="success" type="success" />

                <!-- Error Message -->
                <AlertComponent v-if="error" :message="error" type="error" />

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Title</legend>
                    <input v-model="movieForm.title" type="text" class="input" id="title" name="title"
                        placeholder="Enter movie title" required />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Director</legend>
                    <input v-model="movieForm.director" type="text" class="input" id="director" name="director"
                        placeholder="Enter director name" required />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Release Year</legend>
                    <input v-model.number="movieForm.year" type="number" min="1900" class="input" id="year" name="year"
                        placeholder="Enter release year" required />
                </fieldset>

                <fieldset class="fieldset">
                    <legend class="fieldset-legend">Rating (0-10)</legend>
                    <input v-model.number="movieForm.rating" type="number" min="0" max="10" step="0.1" class="input"
                        id="rating" name="rating" placeholder="Enter rating (0-10)" />
                </fieldset>


                <div class="justify-end card-actions">
                    <button type="submit" class="btn btn-primary w-full" :disabled="isLoading">
                        <span v-if="isLoading" class="loading loading-spinner loading-sm"></span>
                        {{ isLoading ? 'Saving...' : 'Save Movie' }}
                    </button>
                </div>
            </div>
        </div>
    </form>







</template>

<style scoped></style>
