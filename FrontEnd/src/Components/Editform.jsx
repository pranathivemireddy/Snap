import React, { useState, useEffect } from "react";

const EditForm = ({ item, onSubmit, onCancel }) =>{
  const [formData, setFormData] = useState({
    cuisineName: "",
    cuisineDescription: "",
    spicyLevel: "",
    veganFriendly: false,
    cuisinePrice: "",
    servesFor: "",
    cuisineImg: "",
    cuisineId: ""
  });
  

  useEffect(() => {
    if (item) {
      setFormData({
        cuisineName: item.cuisineName || "",
        cuisineDescription: item.cuisineDescription || "",
        spicyLevel: item.spicyLevel || "",
        veganFriendly: item.veganFriendly || false,
        cuisinePrice: item.cuisinePrice || "",
        servesFor: item.servesFor || "",
        cuisineImg: item.cuisineImg || "",
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData); // Pass updated data back to parent
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="p-6 bg-white rounded-lg shadow-md max-w-lg mx-auto mt-6"
    >
      <h2 className="text-lg font-semibold mb-4">Edit Item</h2>

      <input
        name="cuisineName"
        value={formData.cuisineName}
        onChange={handleChange}
        placeholder="Cuisine Name"
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <textarea
        name="cuisineDescription"
        value={formData.cuisineDescription}
        onChange={handleChange}
        placeholder="Cuisine Description"
        className="block w-full mb-3 p-2 border rounded"
        rows={3}
        required
      />

      <input
        name="spicyLevel"
        value={formData.spicyLevel}
        onChange={handleChange}
        placeholder="Spicy Level (e.g. Mild, Medium, Spicy)"
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <div className="flex items-center mb-3">
        <input
          type="checkbox"
          name="veganFriendly"
          checked={formData.veganFriendly}
          onChange={handleChange}
          className="mr-2"
        />
        <label htmlFor="veganFriendly">Vegan Friendly</label>
      </div>

      <input
        type="number"
        name="cuisinePrice"
        value={formData.cuisinePrice}
        onChange={handleChange}
        placeholder="Price (₹)"
        className="block w-full mb-3 p-2 border rounded"
        required
      />

      <input
        type="number"
        name="servesFor"
        value={formData.servesFor}
        onChange={handleChange}
        placeholder="Serves For (number of people)"
        className="block w-full mb-4 p-2 border rounded"
        required
      />
      <input name="cuisineImg" value={formData.cuisineImg} onChange={handleChange} placeholder="Image URL" className="block border w-full mb-2 p-2" required/>


      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Save Changes
        </button>
        <button
          type="button"
          className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          onClick={onCancel}
        >
          Cancel
        </button>
       
      </div>
    </form>
  );
};

export default EditForm;
