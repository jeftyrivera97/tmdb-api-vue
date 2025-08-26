// store/auth.ts
import { defineStore } from "pinia";
import { ref, computed } from "vue";
import { validateUser, findUserById, type User } from "../data/users";

export const useAuthStore = defineStore("auth", () => {
  const token = ref<string | null>(localStorage.getItem("token"));
  const user = ref<User | null>(null);
  const loading = ref(false);
  const error = ref<string | null>(null);

  // Getters
  const isAuthenticated = computed(() => !!token.value && !!user.value);
  const isLoading = computed(() => loading.value);
  const isAdmin = computed(() => user.value?.role === 'admin');

  const login = async (email: string, password: string) => {
    loading.value = true;
    error.value = null;
    
    try {
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Validate user with data file
      const validatedUser = validateUser(email, password);
      
      if (validatedUser) {
        const mockToken = "jwt-token-" + validatedUser.id + "-" + Date.now();
        
        token.value = mockToken;
        user.value = validatedUser;
        localStorage.setItem("token", mockToken);
        localStorage.setItem("userId", validatedUser.id.toString());
        
        return { success: true, user: validatedUser };
      } else {
        throw new Error("Invalid email or password");
      }
    } catch (err) {
      error.value = err instanceof Error ? err.message : "Login failed";
      return { success: false, error: error.value };
    } finally {
      loading.value = false;
    }
  };

  const logout = () => {
    token.value = null;
    user.value = null;
    error.value = null;
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
  };

  const initializeAuth = () => {
    const savedToken = localStorage.getItem("token");
    const savedUserId = localStorage.getItem("userId");
    
    if (savedToken && savedUserId) {
      const foundUser = findUserById(parseInt(savedUserId));
      if (foundUser && foundUser.isActive) {
        token.value = savedToken;
        user.value = foundUser;
      } else {
        // User not found or inactive, clear session
        logout();
      }
    }
  };

  const clearError = () => {
    error.value = null;
  };

  return { 
    token, 
    user, 
    loading, 
    error, 
    isAuthenticated, 
    isLoading,
    isAdmin,
    login, 
    logout, 
    initializeAuth,
    clearError
  };
});
