<template>
    <div class="register-container">
      <div class="register-box">
        <h2>Registro</h2>
        <form @submit.prevent="register">
          <div class="input-group">
            <input v-model="name" type="text" placeholder="Nome" required />
          </div>
          <div class="input-group">
            <input v-model="email" type="email" placeholder="E-mail" required />
          </div>
          <div class="input-group">
            <input v-model="password" type="password" placeholder="Senha" required />
          </div>
          <div class="input-group">
            <input v-model="confirmPassword" type="password" placeholder="Confirme a Senha" required />
          </div>
          <button type="submit" class="btn-register">Registrar</button>
        </form>
        <p class="login-text">
          Já tem uma conta? <router-link to="/login" class="login-link">Faça login</router-link>
        </p>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return { name: '', email: '', password: '', confirmPassword: '' };
    },
    methods: {
      async register() {
        if (this.password !== this.confirmPassword) {
          alert("As senhas não coincidem!");
          return;
        }
  
        try {
          await axios.post('http://localhost:8000/api/register', {
            name: this.name,
            email: this.email,
            password: this.password
          });
  
          alert("Cadastro realizado com sucesso! Faça login.");
          this.$router.push('/login');
        } catch (error) {
          console.error("Erro no registro:", error);
          alert("Erro ao registrar. Verifique os dados e tente novamente.");
        }
      }
    }
  };
  </script>
  
  <style>
  .register-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .register-box {
    background: white;
    padding: 2rem;
    border-radius: 10px;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
    text-align: center;
    width: 370px;
  }
  
  .register-box h2 {
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
  
  .btn-register {
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
  
  .btn-register:hover {
    background: #ff4b7d;
  }
  
  .login-text {
    margin-top: 15px;
    font-size: 14px;
    color: #555;
  }
  
  .login-link {
    color: #ff758c;
    text-decoration: none;
    font-weight: bold;
  }
  
  .login-link:hover {
    text-decoration: underline;
  }
  </style>
  