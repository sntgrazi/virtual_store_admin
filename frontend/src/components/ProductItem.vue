<template>
    <li>
      {{ product.name }} - {{ product.price }} ({{ product.stock }} unidades)
      <button @click="deleteProduct">Excluir</button>
    </li>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    props: ['product'],
    methods: {
      async deleteProduct() {
        await axios.delete(`http://localhost:8000/api/products/${this.product.id}`);
        this.$emit('deleted');
      }
    }
  };
  </script>
  