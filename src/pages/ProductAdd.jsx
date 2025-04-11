import { useState, useEffect } from "react";
import axios from 'axios'
import InputField from '../components/InputField.jsx'
import TextareaField from '../components/TextareaField.jsx'
import SelectField from '../components/SelectField.jsx'
import ProductTable from '../components/ProductTable.jsx'
import { useAuth } from '../context/AuthContext.jsx'
import { useProducts } from "../context/ProductContext.jsx";

const backendUri = import.meta.env.VITE_BACKEND_URI;
 
export default function Product() {
  const { user } = useAuth();
  const { fetchProducts } = useProducts();
  const [buttonText, setButtonText] = useState("Continue");
  const [images, setImages] = useState([])
  const [isDisabled, setIsDisabled] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    price: "",
    category: "",
    quantity: "",
    unit: "",
    description: "",
    author: user.username,
    originalPrice: "",
    images: [],
  });


  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    console.log("files Image: ", files)
    setFormData((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Store File objects instead of blob URLs
    }));
  };

  const handleRemoveImage = (index) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index), // Remove image by index
    }))
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  

  const units = ["kg", "g", "mg", "ton", "lb", "oz", "cm", "mm", "meter", "inch", "feet", "yard", "mile", "litre", "ml", "gallon", "cup", "piece", "dozen"];
  const categories = ["Arts & Crafts", "Automotive", "Beauty", "Books", "Electronics", "Fashion", "Fitness", "Furniture", "Groceries", "Jewelry", "Kids", "Kitchen", "Makeup", "Men's Clothing", "Mobiles", "Office", "Outdoor", "Pet Supplies", "School", "Skincare", "Smart Home", "Snacks", "Toys", "Women's Clothing"];
  
  useEffect(() => {
    const isFormIncomplete = Object.values(formData).some((val) => val === "" || (Array.isArray(val) && val.length === 0));
    setIsDisabled(isFormIncomplete);
  }, [formData]);

  const handleContinue = async () => {
    setIsDisabled(true);
    setButtonText("Creating...")
    
    const data = new FormData();
    // Append other form fields
    Object.keys(formData).forEach((key) => {
      if (key !== "images") {
        data.append(key, formData[key]);
      }
    });
  
    // Append images (Actual File Objects)
    formData.images.forEach((file) => {
      data.append("images", file); // This will send actual files
    });
    
    
    try {
      const response = await axios.post(`${backendUri}/api/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      setFormData({title: "",price: "",category: "",quantity: "",unit: "",description: "",author: "", originalPrice:"",images: []})
      fetchProducts()
      alert("Product Created Successfully")
      setButtonText("Continue"); 
    } catch (error) {
      console.error("Error adding product:", error.response?.data || error.message);
      setButtonText("Continue"); 
    }
    setIsDisabled(false)
  };
  
  return (
    <div className="p-4 flex flex-col gap-4">
      <h1 className="text-2xl font-bold">Add New Product</h1>
      
      <div className="space-y-2">
        <div>
          <InputField onChange={handleImageChange} name="images" label="Images" id="ImageInput" type="file" multiple accept="image/*" className="hidden" />
          <div className="p-2 h-24 w-full bg-gray-100 rounded flex gap-2 overflow-x-auto scrollbar-hide">
            {formData.images.map((image, index) => (
              <div key={index} className="relative h-full w-20 shrink-0">
                <img src={URL.createObjectURL(image)} className="w-full h-full object-cover rounded" />
                <button onClick={() => handleRemoveImage(index)} className="absolute top-0 right-0 text-white bg-black  h-4 w-4 flex justify-center items-center text-sm rounded-full">×</button>
              </div>
            ))}
            <label htmlFor="ImageInput" className="text-gray-500 text-2xl h-20 w-20 shrink-0 rounded bg-gray-300 flex justify-center items-center">+</label>
          </div>
        </div>
        
        <InputField name="title" value={formData.title} onChange={handleChange} label="Title" type="text" placeholder="Enter title" />
        <InputField name="price" value={formData.price} onChange={handleChange} label="Price" type="number" placeholder="Enter price" />
        <InputField name="originalPrice" value={formData.originalPrice} onChange={handleChange} label="originalPrice" type="number" placeholder="Enter originalPrice" />
  
        <div className="flex gap-1">
          <SelectField name="category" value={formData.category} onChange={handleChange} label="Category" options={categories} />
          <InputField name="quantity" value={formData.quantity} onChange={handleChange} label="Quantity" type="number" placeholder="Ex: 500 g" />
          <SelectField name="unit" value={formData.unit} onChange={handleChange} label="Unit" options={units} />
        </div>
  
        <TextareaField name="description" value={formData.description} onChange={handleChange} label="Description" placeholder="Enter Product Description..." />
        <button
          onClick={handleContinue}
          disabled={isDisabled}
          className={`py-3 px-8 rounded text-white text-sm ${isDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-black"}`}
        >
            {buttonText}
        </button>

      </div>
    </div>
  );
}






