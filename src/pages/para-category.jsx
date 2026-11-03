
import { parameterCategory, ParameterCategoryList } from "../data/portalData";
import { useMemo, useState, useEffect } from "react";
import {
  Search,
  Plus,
  Pencil,
  Trash2,
  X,
  Check,
} from "lucide-react";

import "./para-category.css";

const emptyForm = {
  code: "",
  order: "",
  name: "",
  description: "",
  active: true,
  updated: "",
};

function ParameterCategory() {
  const [categories, setCategories] = useState(() => {
    try {
      return (
        JSON.parse(localStorage.getItem("parameterCategories")) ||
        ParameterCategoryList
      );
    } catch {
      return ParameterCategoryList;
    }
  });

  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);

  useEffect(() => {
    localStorage.setItem(
      "parameterCategories",
      JSON.stringify(categories)
    );
  }, [categories]);

  const filteredCategories = useMemo(() => {
    return categories.filter((item) => {
      const value = search.toLowerCase();

      return (
        item.code?.toLowerCase().includes(value) ||
        item.name?.toLowerCase().includes(value) ||
        item.description?.toLowerCase().includes(value)
      );
    });
  }, [categories, search]);

  const handleAdd = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      code: item.code,
      order: item.order,
      name: item.name,
      description: item.description,
      active: item.active,
      updated: item.updated,
    });

    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editingId !== null) {
      setCategories((prev) =>
        prev.map((item) =>
          item.id === editingId
            ? {
                ...item,
                ...formData,
                updated: new Date().toLocaleDateString(),
              }
            : item
        )
      );
    } else {
      const newCategory = {
        id: Date.now(),
        ...formData,
        order: categories.length + 1,
        updated: new Date().toLocaleDateString(),
      };

      setCategories((prev) => [...prev, newCategory]);
    }

    setShowModal(false);
    setFormData(emptyForm);
    setEditingId(null);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      setCategories((prev) =>
        prev.filter((item) => item.id !== id)
      );
    }
  };

  const closeModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
  };

  return (
    <div className="parameterCategory-page">
      {/* Page Heading */}

      <section className="parameterCategory-welcome">
        <div>
          <h1>{parameterCategory.heading}</h1>
          <p>{parameterCategory.description}</p>
        </div>

        <button
          className="parameterCategory-add-btn"
          onClick={handleAdd}
        >
          <Plus size={16} />
          New category
        </button>
      </section>


      <section className="parameterCategory-card">
        <div className="parameterCategory-toolbar">
          <div className="parameterCategory-search">
            <Search size={15} />

            <input
              type="text"
              placeholder="Search code or name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="parameterCategory-table-wrapper">
          <table className="parameterCategory-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>CATEGORY</th>
                <th>DESCRIPTION</th>
                <th>PARAMETERS</th>
                <th>STATUS</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCategories.map((item, index) => (
                <tr key={item.id}>
                  <td className="category-order">
                    {item.order || index + 1}
                  </td>

                  <td>
                    <div className="category-name">
                      <span className="category-code">
                        {item.code}
                      </span>

                      <span>{item.name}</span>
                    </div>
                  </td>

                  <td className="category-description">
                    {item.description}
                  </td>

                  <td className="category-parameters">
                    {item.parameters ?? 0}
                  </td>

                  <td>
                    <span
                      className={`category-status ${
                        item.active
                          ? "category-active"
                          : "category-inactive"
                      }`}
                    >
                      <span className="category-status-dot" />

                      {item.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td>
                    <div className="category-actions">
                      <button
                        className="category-edit"
                        onClick={() => handleEdit(item)}
                        title="Edit"
                      >
                        <Pencil size={14} />
                      </button>

                      <button
                        className="category-delete"
                        onClick={() => handleDelete(item.id)}
                        title="Delete"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCategories.length === 0 && (
                <tr>
                  <td colSpan="6" className="category-empty">
                    No categories found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="parameterCategory-footer">
          Showing {filteredCategories.length} of {categories.length} categories
        </div>
      </section>


      {showModal && (
        <div
          className="parameterCategory-modal-overlay"
          onMouseDown={closeModal}
        >
          <section
            className="parameterCategory-modal"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <div className="parameterCategory-modal-header">
              <div>
                <h2>
                  {editingId !== null
                    ? "Edit Category"
                    : "New Category"}
                </h2>

                <p>Configure master parameter category details.</p>
              </div>

              <button onClick={closeModal}>
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="parameterCategory-form">
                <div className="parameterCategory-form-group">
                  <label>Category Code</label>

                  <input
                    type="text"
                    name="code"
                    placeholder="e.g. OTC"
                    value={formData.code}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="parameterCategory-form-group">
                  <label>Category Name</label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter category name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="parameterCategory-form-group">
                  <label>Description</label>

                  <textarea
                    name="description"
                    placeholder="Enter category description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="3"
                  />
                </div>

                <div className="parameterCategory-form-group">
                  <label>Order</label>

                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                  />
                </div>

                <div className="parameterCategory-checkbox">
                  <input
                    type="checkbox"
                    name="active"
                    checked={formData.active}
                    onChange={handleChange}
                  />

                  <label>Active category</label>
                </div>
              </div>

              <div className="parameterCategory-modal-footer">
                <button
                  type="button"
                  className="category-cancel-btn"
                  onClick={closeModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="category-save-btn"
                >
                  <Check size={15} />

                  {editingId !== null
                    ? "Save changes"
                    : "Create category"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </div>
  );
}

export default ParameterCategory;
