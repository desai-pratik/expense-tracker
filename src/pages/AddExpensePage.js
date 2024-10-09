import React, { useEffect, useState } from "react";
import PageContainer from "../layout/PageContainer";
import { useNavigate } from "react-router-dom";

const AddExpensePage = () => {
  const [formData, setFormData] = useState({
    amount: "",
    description: "",
    date: "",
    category: "",
    paymentMethod: "cash",
  });
  const [errors, setErrors] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const navigation = useNavigate()

  useEffect(() => {
    const storedData = localStorage.getItem("expensesData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setFormData((prev) => ({
        ...prev,
        ...parsedData,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (name === "category" && value) {
      const storedCategories = JSON.parse(localStorage.getItem("usedCategories")) || [];
      const filteredSuggestions = storedCategories.filter((category) => category.toLowerCase().includes(value.toLowerCase()));
      setSuggestions(filteredSuggestions);
    }
  };

  const handleFocus = () => {
    const storedCategories = JSON.parse(localStorage.getItem("usedCategories")) || [];
    setSuggestions(storedCategories);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.amount) newErrors.amount = "Amount is required.";
    if (!formData.description) newErrors.description = "Description is required.";
    if (!formData.date) newErrors.date = "Date is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const existingData = JSON.parse(localStorage.getItem("expensesData")) || {};
      const usedCategories = JSON.parse(localStorage.getItem("usedCategories")) || [];

      const newExpense = {
        id: Date.now(),
        amount: formData.amount,
        description: formData.description,
        date: formData.date,
        category: formData.category,
        paymentMethod: formData.paymentMethod,
      };
      existingData[formData.category] = existingData[formData.category] || [];
      existingData[formData.category].push(newExpense);

      if (!usedCategories.includes(formData.category)) {
        usedCategories.push(formData.category);
        localStorage.setItem("usedCategories", JSON.stringify(usedCategories));
      }

      localStorage.setItem("expensesData", JSON.stringify(existingData));
      setFormData({
        amount: "",
        description: "",
        date: "",
        category: "",
        paymentMethod: "cash",
      });
      setErrors({});
      setSuggestions([]);
      navigation("/")
      console.log("Form Data Submitted:", existingData);
    }
  };

  const handleSuggestionClick = (category) => {
    setFormData((prev) => ({ ...prev, category }));
    setSuggestions([]);
  };

  return (
    <PageContainer>
      <h1 className="text-2xl font-bold mb-4">Add Expense</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="amount" className="block">
            Amount
          </label>
          <input
            type="number"
            name="amount"
            id="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          {errors.amount && <p className="text-red-500">{errors.amount}</p>}
        </div>

        <div>
          <label htmlFor="description" className="block">
            Description
          </label>
          <input
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={handleChange}
            className="border rounded p-2 w-full"
            required
          />
          {errors.description && <p className="text-red-500">{errors.description}</p>}
        </div>

        <div>
          <label htmlFor="date" className="block">
            Date
          </label>
          <input type="date" name="date" id="date" value={formData.date} onChange={handleChange} className="border rounded p-2 w-full" required />
          {errors.date && <p className="text-red-500">{errors.date}</p>}
        </div>

        <div className="relative w-full">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            name="category"
            id="category"
            value={formData.category}
            onChange={handleChange}
            onFocus={handleFocus} // Show suggestions on focus
            className="border rounded p-2 w-full"
            required
          />
          {errors.category && <p className="text-red-500">{errors.category}</p>}
          {suggestions.length > 0 && (
            <ul className="absolute bg-white border border-gray-300 rounded shadow mt-1 w-full z-10">
              {suggestions.map((suggestion, index) => (
                <li key={index} className="p-2 cursor-pointer hover:bg-gray-200" onClick={() => handleSuggestionClick(suggestion)}>
                  {suggestion}
                </li>
              ))}
            </ul>
          )}
        </div>

        <div>
          <label htmlFor="paymentMethod" className="block">
            Payment Method
          </label>
          <select
            name="paymentMethod"
            id="paymentMethod"
            value={formData.paymentMethod}
            onChange={handleChange}
            className="border rounded p-2 w-full"
          >
            <option value="cash">Cash</option>
            <option value="credit">Credit Card</option>
          </select>
        </div>

        <button type="submit" className="bg-blue-500 text-white rounded py-2 px-4 hover:bg-blue-600">
          Add Expense
        </button>
      </form>
    </PageContainer>
  );
};

export default AddExpensePage;
