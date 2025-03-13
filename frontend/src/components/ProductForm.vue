<template>
    <div>
      <h2>{{ editing ? "Editar Produto" : "Adicionar Produto" }}</h2>
      <form @submit.prevent="saveProduct">
        <input v-model="product.name" placeholder="Nome" required />
        <textarea v-model="product.description" placeholder="Descrição"></textarea>
        <input type="number" v-model="product.price" placeholder="Preço" required />
        <input type="number" v-model="product.stock" placeholder="Estoque" required />
        <button type="submit">{{ editing ? "Atualizar" : "Adicionar" }}</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        product: { name: '', description: '', price: '', stock: '' },
        editing: false
      };
    },
    props: ['existingProduct'],
    watch: {
      existingProduct: {
        immediate: true,
        handler(newVal) {
          if (newVal) {
            this.product = { ...newVal };
            this.editing = true;
          }
        }
      }
    },
    methods: {
      async saveProduct() {
        if (this.editing) {
          await axios.put(`http://localhost:8000/api/products/${this.product.id}`, this.product);
        } else {
          await axios.post('http://localhost:8000/api/products', this.product);
        }
        this.$emit('product-added');
      }
    }
  };
  </script>
  