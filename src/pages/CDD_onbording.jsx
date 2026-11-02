
import { useEffect, useState } from "react";
import {
  Plus,
  X,
  Trash2,
  Pencil,
  Check,
  Package,
} from "lucide-react";
import "./Cdd_onbording.css";

const CHANNELS = [
  "OTC Retail",
  "Wholesale B2B",
  "Online FX",
  "Partners & Resellers",
];

const emptyForm = {
  name: "",
  service: "",
  owner: "",
  channels: [],
};

function Onboarding() {
  const [products, setProducts] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("onboardingProducts")) || [];
    } catch {
      return [];
    }
  });

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState(emptyForm);
  const [error, setError] = useState("");


  useEffect(() => {
    localStorage.setItem("onboardingProducts", JSON.stringify(products));
  }, [products]);

  const handleAddProduct = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
    setShowModal(true);
  };

  
  const handleEditProduct = (product) => {
    setFormData({
      name: product.name,
      service: product.service,
      owner: product.owner || "",
      channels: Array.isArray(product.channels) ? [...product.channels] : [],
    });

    setEditingId(product.id);
    setError("");
    setShowModal(true);
  };

  
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      setError("Please enter a product name.");
      return;
    }

    if (!formData.service.trim()) {
      setError("Please enter the designated service.");
      return;
    }

    if (!formData.owner.trim()) {
      setError("Please enter a product owner.");
      return;
    }

    if (editingId) {
      setProducts((prev) =>
        prev.map((product) =>
          product.id === editingId
            ? {
                ...product,
                name: formData.name.trim(),
                service: formData.service.trim(),
                owner: formData.owner.trim(),
                channels: formData.channels,
              }
            : product
        )
      );
    } else {
      const newProduct = {
        id: `PRD-${Date.now().toString().slice(-6)}`,
        name: formData.name.trim(),
        service: formData.service.trim(),
        owner: formData.owner.trim(),
        channels: formData.channels,
        status: "DRAFT",
      };

      setProducts((prev) => [...prev, newProduct]);
    }

    setShowModal(false);
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
  };

  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (confirmDelete) {
      setProducts((prev) =>
        prev.filter((product) => product.id !== id)
      );
    }
  };

  
  const handleClose = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <div className="onboarding-page">

      
      <div className="onboarding-header">
        <div>
          <h1>Onboarding</h1>
          <p>
            Customer onboarding products: the checks and parameters
            applied when a customer is onboarded.
          </p>
        </div>

        <button
          className="new-product-btn"
          onClick={handleAddProduct}
        >
          <Plus size={17} />
          New onboarding product
        </button>
      </div>

      
      <section className="onboarding-card">

        <div className="onboarding-card-header">
          <h2>Product registry</h2>
          <p>
            Each product's AUSTRAC designated service, status and channels
          </p>
        </div>

        <div className="onboarding-table-wrapper">
          <table className="onboarding-table">
            <thead>
              <tr>
                <th>PRODUCT</th>
                <th>DESIGNATED SERVICE</th>
                <th>STATUS</th>
                <th>CHANNELS</th>
                <th className="actions-heading">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-table">
                    No products yet.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td>
                      <div className="product-name-cell">
                        <div className="product-icon">
                          <Package size={17} />
                        </div>

                        <div>
                          <strong>{product.name}</strong>
                          <span>{product.id}</span>
                        </div>
                      </div>
                    </td>

                    <td>{product.service}</td>

                    <td>
                      <span className="status-badge">
                        {product.status}
                      </span>
                    </td>

                    <td>
                      <div className="channel-tags">
                        {product.channels.map((channel) => (
                          <span key={channel} className="channel-tag">
                            {channel}
                          </span>
                        ))}
                      </div>
                    </td>

                    <td>
                      <div className="product-actions">
                        <button
                          title="Edit product"
                          onClick={() => handleEditProduct(product)}
                        >
                          <Pencil size={16} />
                        </button>

                        <button
                          className="delete-action"
                          title="Delete product"
                          onClick={() => handleDelete(product.id)}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      
      <section className="onboarding-card matrix-card">

        <div className="onboarding-card-header">
          <h2>Product × channel capability matrix</h2>
          <p>
            A product is only available in a channel where it's switched on
          </p>
        </div>

        <div className="onboarding-table-wrapper">
          <table className="onboarding-table matrix-table">
            <thead>
              <tr>
                <th>PRODUCT</th>

                {CHANNELS.map((channel) => (
                  <th key={channel}>{channel.toUpperCase()}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {products.length === 0 ? (
                <tr>
                  <td colSpan="5" className="empty-matrix">
                    <Package size={20} />
                    <span>No products available</span>
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id}>
                    <td className="matrix-product-name">
                      {product.name}
                    </td>

                    {CHANNELS.map((channel) => {
                      const enabled =
                        product.channels.includes(channel);

                      return (
                        <td key={channel}>
                          {enabled ? (
                            <span className="matrix-enabled">
                              <Check size={15} />
                            </span>
                          ) : (
                            <span className="matrix-disabled">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </section>

      
      {showModal && (
        <div
          className="onboarding-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              handleClose();
            }
          }}
        >
          <section
            className="onboarding-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="onboarding-modal-title"
          >
            <div className="onboarding-modal-header">
              <h2 id="onboarding-modal-title">
                {editingId ? "Edit onboarding product" : "New onboarding product"}
              </h2>

              <button
                className="modal-close-btn"
                onClick={handleClose}
                type="button"
              >
                <X size={19} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>

              <div className="onboarding-form-group">
                <label htmlFor="productName">Product name</label>

                <input
                  id="productName"
                  type="text"
                  name="name"
                  placeholder="e.g. Prepaid Travel Cards"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="onboarding-form-group">
                <label htmlFor="designatedService">Designated service (AML/CTF Act s6)</label>
                <input
                  id="designatedService"
                  type="text"
                  name="service"
                  placeholder="e.g. Table 1, item 50 — issuing a prepaid card"
                  value={formData.service}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="onboarding-form-group">
                <label htmlFor="productOwner">Product owner</label>
                <input
                  id="productOwner"
                  type="text"
                  name="owner"
                  placeholder="e.g. AML/CTF Compliance Officer"
                  value={formData.owner}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="draft-info">
                <div>
                  <strong>Initial status: DRAFT</strong>
                  <p>
                    New products start in DRAFT. All 10 Universal Parameter Template categories must have at least one parameter before this product can move to ACTIVE.
                  </p>
                </div>
              </div>

              {error && (
                <p className="onboarding-error">{error}</p>
              )}

              <div className="onboarding-modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={handleClose}
                >
                  Cancel
                </button>

                <button type="submit" className="save-product-btn">
                  <Check size={16} />
                  {editingId ? "Save changes" : "Create product"}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}

    </div>
  );
}

export default Onboarding;
