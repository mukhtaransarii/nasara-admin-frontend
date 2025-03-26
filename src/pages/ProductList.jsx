import { useProducts } from "../context/ProductContext.jsx";
import ProductTable from "../components/ProductTable.jsx";
import axios from "axios";
import { useAuth } from "../context/AuthContext.jsx";

export default function ProductList() {
  const { products, fetchProducts } = useProducts();
  const { user } = useAuth();

  console.log("Logged-in User:", user?.username);

  const filteredProducts = products.filter(product => {
    console.log(`Product Author: ${product.author}, User: ${user?.username}`);
    return product.author === user?.username;
  });

  const handleTogglePublish = async (id, status) => {
    try {
      await axios.patch(`${import.meta.env.VITE_BACKEND_URI}/api/${id}`, { published: status });
      fetchProducts();
    } catch (error) {
      console.error("Error updating publish status:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_BACKEND_URI}/api/${id}`);
      fetchProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  const handleEdit = (product) => {
    alert(`Edit Product: ${product.title}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <ProductTable
        products={filteredProducts}
        onTogglePublish={handleTogglePublish}
        onEdit={handleEdit}
        onDelete={handleDelete}
      />
    </div>
  );
}
