// data/users.ts
export interface User {
  id: number;
  email: string;
  password: string; // In production should be hashed
  name: string;
  role: 'admin' | 'user';
  avatar?: string;
  createdAt: string;
  isActive: boolean;
}

// Simulated user database
export const users: User[] = [
  {
    id: 1,
    email: "admin@movies.com",
    password: "password", // In production: password hash
    name: "Movie Admin",
    role: "admin",
    avatar: "https://ui-avatars.com/api/?name=Movie+Admin&background=3b82f6&color=fff",
    createdAt: "2024-01-01T00:00:00Z",
    isActive: true
  },
  {
    id: 2,
    email: "user@movies.com",
    password: "123456",
    name: "Jefty Rivera",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=Jefty+Rivera&background=10b981&color=fff",
    createdAt: "2024-01-15T00:00:00Z",
    isActive: true
  },
  {
    id: 3,
    email: "demo@movies.com",
    password: "demo",
    name: "Demo User",
    role: "user",
    avatar: "https://ui-avatars.com/api/?name=Demo+User&background=8b5cf6&color=fff",
    createdAt: "2024-02-15T00:00:00Z",
    isActive: false
  }
];

// Functions to handle users
export const findUserByEmail = (email: string): User | undefined => {
  return users.find(user => user.email.toLowerCase() === email.toLowerCase());
};

export const findUserById = (id: number): User | undefined => {
  return users.find(user => user.id === id);
};

export const validateUser = (email: string, password: string): User | null => {
  const user = findUserByEmail(email);
  
  if (!user) {
    return null;
  }
  
  if (!user.isActive) {
    throw new Error("Account is deactivated");
  }
  
  if (user.password === password) {
    return user;
  }
  
  return null;
};

export const getAllUsers = (): User[] => {
  return users.filter(user => user.isActive);
};

export const getUsersCount = (): number => {
  return users.filter(user => user.isActive).length;
};
