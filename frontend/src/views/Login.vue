<template>
    <div class="login-container">
      <div class="login-box">
        <h2>Login</h2>
        <form @submit.prevent="login">
          <div class="input-group">
            <input v-model="email" type="email" placeholder="E-mail" required />
          </div>
          <div class="input-group">
            <input v-model="password" type="password" placeholder="Senha" required />
          </div>
          <button type="submit" class="btn-login">Entrar</button>
        </form>
        <p class="register-text">
          Ainda não tem uma conta? <router-link to="/register" class="register-link">Registre-se</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { email: '', password: '' };
    },
    methods: {
      async login() {
        try {
          const response = await axios.post('http://localhost:8000/api/login', {
            email: this.email,
            password: this.password
          });
  
          localStorage.setItem('token', response.data.token);
          this.$router.push('/products');
        } catch (error) {
          console.error("Erro no login:", error);
          alert("Credenciais inválidas! Verifique e tente novamente.");
        }
      }
    }
  };
  </script>
  
  <style>

  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  

  .login-box {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 370px;
  }

  .login-box h2 {
    margin-bottom: 15px;
    color: #333;
  }
  

  .input-group {
    margin-bottom: 15px;
  }
  
  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 5px;
    font-size: 16px;
    outline: none;
    transition: border 0.3s ease-in-out;
  }
  
  input:focus {
    border: 1px solid #ff758c; 
  }

  .btn-login {
    width: 100%;
    padding: 10px;
    background: #ff758c;
    border: none;
    color: white;
    font-size: 16px;
    border-radius: 5px;
    cursor: pointer;
    transition: background 0.3s ease-in-out;
  }
  
  .btn-login:hover {
    background: #ff4b7d;
  }
  
  
  .register-text {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }
  
  .register-link {
    color: #ff758c;
    text-decoration: none;
    font-weight: bold;
  }
  
  .register-link:hover {
    text-decoration: underline;
  }
  </style>
  