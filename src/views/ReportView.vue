<script setup>
  import DataTable from 'primevue/datatable';
  import Column from 'primevue/column';
  import ColumnGroup from 'primevue/columngroup';   
  import Row from 'primevue/row';

  import { ref, onMounted } from 'vue';
  

  const products = ref([]);

  onMounted(() => {
      ProductService.getProductsMini().then((data) => (products.value = data));
  });

  const mockData = [
    {
      id: '1000',
      code: 'f230fh0g3',
      name: 'Bamboo Watch',
      description: 'Product Description',
      image: 'bamboo-watch.jpg',
      price: 65,
      category: 'Accessories',
      quantity: 24,
      inventoryStatus: 'INSTOCK',
      rating: 5
    },
    {
      id: '1001',
      code: 'f230fh0g4',
      name: 'Wooden Watch',
      description: 'Product Description',
      image: 'wooden-watch.jpg',
      price: 55,
      category: 'Accessories',
      quantity: 18,
      inventoryStatus: 'INSTOCK',
      rating: 4
    }

  ];

  if (!products.value.length) {
    products.value = mockData;
  }
</script>

<template>
  <main>
    <DataTable :value="products" tableStyle="min-width: 50rem">
      <Column field="code" header="Code"></Column>
      <Column field="name" header="Name"></Column>
      <Column field="category" header="Category"></Column>
      <Column field="quantity" header="Quantity"></Column>
    </DataTable>
  </main>
</template>
