import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";

const ProductTable = ({ products, onTogglePublish, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="w-full border border-gray-300">
        <thead className="bg-gray-200">
          <tr className="text-left text-sm text-center">
            <th className="p-2 border">Image</th>
            <th className="p-2 border w-full">Title</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Quantity</th>
            <th className="p-2 border">Unit</th>
            <th className="p-2 border text-center">Publish</th>
            <th className="p-2 border text-center">Edit</th>
            <th className="p-2 border text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map((product) => (
              <tr key={product._id} className="text-sm border-t text-center">
                <td className="p-2 border">
                  <img
                    src={product.images?.[0] || "/placeholder.jpg"}
                    alt={product.title}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="p-2 border">{product.title}</td>
                <td className="p-2 border text-right">₹{product.price}</td>
                <td className="p-2 border text-right">{product.quantity}</td>
                <td className="p-2 border">{product.unit}</td>
                 <td className="p-2 border text-center">
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={product.published}
                      onChange={() => onTogglePublish(product._id, !product.published)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-300 rounded-full peer-checked:bg-blue-500 peer-checked:after:translate-x-5 after:absolute after:top-1/2 after:-translate-y-1/2 after:left-1 after:bg-white after:border after:rounded-full after:h-4 after:w-4 after:transition-all"></div>
                  </label>
                </td>
                 <td>
                  {/* Edit Button */}
                  <button onClick={() => onEdit(product)}>
                    <PencilSquareIcon className="w-5 h-5 text-blue-500 hover:text-blue-700" />
                  </button>
                 </td>
                  <td>
                  {/* Delete Button */}
                  <button onClick={() => confirmDelete(product._id, onDelete)}>
                    <TrashIcon className="w-5 h-5 text-gray-500 hover:text-red-500" />
                  </button>
                 </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="p-4 text-center text-gray-500">
                No products available
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

// Confirm Delete Function
const confirmDelete = (id, onDelete) => {
  if (window.confirm("Are you sure you want to delete this product?")) {
    onDelete(id);
  }
};

export default ProductTable;
