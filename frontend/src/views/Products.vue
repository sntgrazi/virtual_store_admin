<template>
    <div>
      <Navbar />
      <div class="products-container">
        <h1>Gerenciar Produtos</h1>
  
        <button @click="openModal(null)" class="btn-action">
          <i class="fas fa-plus-circle"></i> Adicionar Produto
        </button>
  
        <div class="table-container">
          <table class="product-table">
            <thead>
              <tr>
                <th>Nome</th>
                <th>Descrição</th>
                <th>Preço</th>
                <th>Estoque</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="product in products" :key="product.id" class="product-row">
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>R$ {{ product.price }}</td>
                <td>{{ product.stock_quantity }}</td>
                <td class="actions-column">
                  <button class="btn-edit" @click="openModal(product)" title="Editar">
                    <i class="fas fa-edit"></i>
                  </button>
                  <button class="btn-delete" @click="deleteProduct(product.id)" title="Excluir">
                    <i class="fas fa-trash-alt"></i>
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
  
      <transition name="fade">
        <div v-if="showModal" class="modal" @click.self="closeModal">
          <div class="modal-content">
            <h2>{{ editingProduct ? 'Editar Produto' : 'Adicionar Produto' }}</h2>
            <form @submit.prevent="saveProduct">
              <div class="form-group">
                <label for="name">Nome</label>
                <input 
                  id="name"
                  v-model="productData.name" 
                  type="text" 
                  placeholder="Nome do produto" 
                  required 
                />
              </div>
  
              <div class="form-group">
                <label for="description">Descrição</label>
                <textarea 
                  id="description"
                  v-model="productData.description" 
                  placeholder="Descrição do produto" 
                  required
                ></textarea>
              </div>
  
              <div class="form-row">
                <div class="form-group half">
                  <label for="price">Preço (R$)</label>
                  <input 
                    id="price"
                    v-model.number="productData.price" 
                    type="number" 
                    step="0.01" 
                    placeholder="0,00" 
                    required 
                  />
                </div>
  
                <div class="form-group half">
                  <label for="stock_quantity">Estoque</label>
                  <input 
                    id="stock_quantity"
                    v-model.number="productData.stock_quantity" 
                    type="number" 
                    placeholder="Quantidade" 
                    required 
                  />
                </div>
              </div>
  
              <div class="modal-buttons">
                <button type="submit" class="btn-action">
                  {{ editingProduct ? 'Salvar Alterações' : 'Cadastrar' }}
                </button>
                <button type="button" class="btn-cancel" @click="closeModal">
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </transition>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import Navbar from '../components/Navbar.vue';
  
  export default {
    components: { Navbar },
    data() {
      return {
        products: [],
        showModal: false,
        editingProduct: null,
        productData: {
          name: '',
          description: '',
          price: '',
          stock_quantity: ''
        }
      };
    },
    methods: {
      async fetchProducts() {
        try {
          const response = await axios.get('http://localhost:8000/api/products');
          this.products = response.data;
        } catch (error) {
          console.error("Erro ao buscar produtos:", error);
          this.$toast.error('Não foi possível carregar os produtos', { 
            position: 'top-right', 
            duration: 3000 
          });
        }
      },
      openModal(product) {
        if (product) {
          this.editingProduct = product;
          this.productData = { ...product };
        } else {
          this.editingProduct = null;
          this.productData = { name: '', description: '', price: '', stock_quantity: '' };
        }
        this.showModal = true;
      },
      closeModal() {
        this.showModal = false;
      },
      async saveProduct() {
        try {
          let response;
          
          if (this.editingProduct) {
            response = await axios.put(`http://localhost:8000/api/products/${this.editingProduct.id}`, this.productData);
            const index = this.products.findIndex(p => p.id === this.editingProduct.id);
            if (index !== -1) {
              this.products.splice(index, 1, response.data || { ...this.editingProduct, ...this.productData });
            }
            
            
          } else {
            response = await axios.post('http://localhost:8000/api/products', this.productData);
            
            if (response.data) {
              this.products.push(response.data);
            }
            z
          }
          
          this.closeModal();
        } catch (error) {
          console.error("Erro ao salvar produto:", error);
         
        }
      },
      async deleteProduct(id) {
        if (confirm("Tem certeza que deseja excluir este produto?")) {
          try {
            await axios.delete(`http://localhost:8000/api/products/${id}`);
            this.products = this.products.filter(product => product.id !== id);
            
            
          } catch (error) {
            console.error("Erro ao excluir produto:", error);
            
          }
        }
      }
    },
    mounted() {
      this.fetchProducts();
    }
  };
  </script>
  
  <style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap');
  @import url('https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css');
  
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  
  :root {
    --primary: #FF4B7D;
    --primary-light: #FF758C;
    --primary-dark: #E03560;
    --secondary: #6c757d;
    --danger: #dc3545;
    --danger-dark: #c82333;
    --light: #f8f9fa;
    --dark: #343a40;
    --gray-100: #f8f9fa;
    --gray-200: #e9ecef;
    --gray-300: #dee2e6;
    --gray-500: #adb5bd;
    --white: #ffffff;
    --bg-gradient-start: #ff9a9e;
    --bg-gradient-end: #fad0c4;
    --shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
    --shadow-soft: 0 8px 20px rgba(255, 154, 158, 0.15);
    --border-radius: 10px;
    --transition: all 0.3s ease-in-out;
  }
  
  body {
    font-family: 'Poppins', sans-serif;
    color: var(--dark);
    line-height: 1.6;
  }
  
  #app {
    height: 100vh;
    width: 100%;
    background: linear-gradient(to right, #ff9a9e, #fad0c4);
  }
  
  .products-container {
    max-width: 1200px;
    margin: 80px auto 40px;
    padding: 30px;
    background: rgba(255, 255, 255, 0.95);
    border-radius: 8px;
    box-shadow: var(--shadow-soft);
    backdrop-filter: blur(5px);
    border: 1px solid rgba(255, 255, 255, 0.8);
    position: relative;
    z-index: 1;
  }
  
  h1 {
    color: var(--primary);
    font-size: 28px;
    font-weight: 600;
    margin-bottom: 24px;
    text-align: center;
    position: relative;
  }
  
  h1:after {
    content: '';
    display: block;
    width: 60px;
    height: 3px;
    background: var(--primary-light);
    margin: 8px auto 0;
    border-radius: 3px;
  }
  
  .btn-action {
    color: var(--white);
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    display: inline-flex;
    align-items: center;
    justify-content: center;
    background: #c24459;
    color: white;
  }
  
  .btn-action i {
    margin-right: 8px;
  }
  
  .btn-action:hover {
    background: #e46177;
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(255, 75, 125, 0.4);
  }
  
  .btn-action:active {
    transform: translateY(0);
  }
  
  .table-container {
    overflow-x: auto;
    margin-top: 24px;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow-soft);
    background-color: rgba(255, 255, 255, 0.7);
  }
  
  .product-table {
    width: 100%;
    border-collapse: collapse;
    border-radius: var(--border-radius);
    overflow: hidden;
  }
  
  .product-table th, .product-table td {
    padding: 14px 16px;
    text-align: left;
  }
  
  .product-table th {
    background: var(--primary);
    color: var(--white);
    font-weight: 500;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    font-size: 14px;
  }
  
  .product-table th:first-child {
    padding-left: 24px;
  }
  
  .product-table td {
    border-bottom: 1px solid var(--gray-200);
    font-size: 15px;
  }
  
  .product-row {
    transition: var(--transition);
  }
  
  .product-row:hover {
    background-color: var(--gray-100);
  }
  
  .product-row td:first-child {
    padding-left: 24px;
    font-weight: 500;
  }
  
  .actions-column {
    white-space: nowrap;
    text-align: center;
  }
  
  .btn-edit, .btn-delete {
    width: 36px;
    height: 36px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    border: none;
    cursor: pointer;
    transition: var(--transition);
    margin: 0 4px;
  }
  
  .btn-edit {
    background: var(--primary-light);
    color: var(--white);
  }
  
  .btn-edit:hover {
    background: var(--primary);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(255, 75, 125, 0.3);
  }
  
  .btn-delete {
    background: var(--danger);
    color: var(--white);
  }
  
  .btn-delete:hover {
    background: var(--danger-dark);
    transform: translateY(-2px);
    box-shadow: 0 2px 8px rgba(220, 53, 69, 0.3);
  }
  
  .modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw; 
    height: 100vh; 
    background: rgba(0, 0, 0, 0.6);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 9999; 
    backdrop-filter: blur(3px);
  }
  
  .modal-content {
    background: #ff9a9e;
    padding: 30px;
    border-radius: var(--border-radius);
    width: 450px;
    max-width: 90%;
    box-shadow: 0 10px 30px rgba(255, 154, 158, 0.25);
    position: relative;
    z-index: 10000;
    border-radius: 10px;
  }
  
  .modal-content h2 {
    color: var(--primary);
    font-size: 22px;
    margin-bottom: 24px;
    text-align: center;
  }
  
  .form-group {
    margin-bottom: 18px;
    text-align: left;
  }
  
  .form-row {
    display: flex;
    gap: 15px;
    margin-bottom: 18px;
  }
  
  .form-group.half {
    flex: 1;
  }
  
  label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    font-weight: 500;
    color: var(--dark);
  }
  
  input, textarea {
    width: 100%;
    padding: 12px 14px;
    border: 1px solid var(--gray-300);
    border-radius: 6px;
    font-family: 'Poppins', sans-serif;
    font-size: 15px;
    transition: var(--transition);
  }
  
  textarea {
    min-height: 100px;
    resize: vertical;
  }
  
  input:focus, textarea:focus {
    border-color: var(--primary-light);
    outline: none;
    box-shadow: 0 0 0 3px rgba(255, 75, 125, 0.1);
  }
  
  .modal-buttons {
    display: flex;
    justify-content: space-between;
    margin-top: 24px;
  }
  
  .btn-cancel {
    background: var(--secondary);
    color: var(--white);
    padding: 12px 20px;
    border: none;
    border-radius: 6px;
    font-size: 16px;
    font-weight: 500;
    cursor: pointer;
    transition: var(--transition);
    flex: 1;
    margin-left: 10px;
  }
  
  .btn-cancel:hover {
    background: #5a6268;
  }
  
  .modal-buttons .btn-action {
    flex: 1.5;
  }
  
  .fade-enter-active,
  .fade-leave-active {
    transition: opacity 0.3s ease;
  }
  
  .fade-enter-from,
  .fade-leave-to {
    opacity: 0;
  }
  
  @media (max-width: 768px) {
    .products-container {
      padding: 20px;
      margin: 60px 15px 30px;
    }
    
    h1 {
      font-size: 24px;
    }
    
    .product-table th, .product-table td {
      padding: 12px 10px;
      font-size: 14px;
    }
    
    .form-row {
      flex-direction: column;
      gap: 0;
    }
    
    .modal-content {
      padding: 20px;
    }
  }
  </style>