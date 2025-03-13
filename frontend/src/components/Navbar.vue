<template>
    <nav class="navbar">
      <div class="nav-logo">
        <h3>TechStore</h3>
      </div>
      <ul class="nav-links">
        <li v-if="isAuthenticated">
          <button @click="logout" class="btn-logout">Logout</button>
        </li>
      </ul>
    </nav>
  </template>
  
  <script>
  export default {
    computed: {
      isAuthenticated() {
        return localStorage.getItem('token') !== null;
      }
    },
    methods: {
      logout() {
        localStorage.removeItem('token');
        this.$router.push('/login');
      }
    }
  };
  </script>
  
  <style scoped>
  /* Navbar Container */
  .navbar {
    background: #c24459;
    color: white;
    padding: 15px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  }
  
  /* Logo */
  .nav-logo a {
    color: white;
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
  }
  
  /* Navbar Links */
  .nav-links {
    list-style: none;
    display: flex;
    gap: 15px;
    align-items: center;
  }
  
  .nav-links li a {
    color: white;
    text-decoration: none;
    padding: 8px 12px;
    border-radius: 5px;
    transition: background 0.3s ease-in-out;
  }
  
  .nav-links li a:hover {
    background: #495057;
  }
  
  /* Botão de Logout */
  .btn-logout {
    background: #dc3545;
    color: white;
    border: none;
    padding: 8px 12px;
    border-radius: 5px;
    font-size: 14px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  
  .btn-logout:hover {
    background: #c82333;
  }
  </style>
  