
import { useMemo, useState } from "react";
import "./Parameters.css";
import { parameters, parameterProducts } from "../data/portalData.js";

const initialParameters = parameters;
const products = parameterProducts;

const emptyForm = {
  key: "",
  label: "",
  type: "DECIMAL",
  product: "Global",
  category: "",
  description: "",

};

export default function Parameters() {
  const [parameters, setParameters] = useState(initialParameters);
  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");
  const [isAdding, setIsAdding] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState(emptyForm);

  const filteredParameters = useMemo(() => {
    return parameters.filter((item) => {
      const matchesTab =
        activeTab === "All" || item.product === activeTab;

      const searchableText = [
        item.key,
        item.label,
        item.description,
        item.category,
        item.product,
      ]
        .join(" ")
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.trim().toLowerCase()
      );

      return matchesTab && matchesSearch;
    });
  }, [parameters, activeTab, search]);

  const countFor = (tab) => {
    if (tab === "All") return parameters.length;

    return parameters.filter(
      (item) => item.product === tab
    ).length;
  };

  const updateForm = (field, value) => {
    setForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  const openAddRow = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setIsAdding(true);
  };

  const openEditRow = (item) => {
    setIsAdding(false);
    setEditingId(item.id);
    setForm({
      key: item.key,
      label: item.label || "",
      type: item.type,
      product: item.product,
      category: item.category || "",
      description: item.description || "",
    });
  };

  const cancelRow = () => {
    setIsAdding(false);
    setEditingId(null);
    setForm({ ...emptyForm });
  };

  const saveParameter = (event) => {
    event.preventDefault();

    if (!form.key.trim()) {
      alert("Please enter a parameter key.");
      return;
    }

    const duplicate = parameters.some(
      (item) =>
        item.key.toLowerCase() === form.key.trim().toLowerCase() &&
        item.id !== editingId
    );

    if (duplicate) {
      alert("This parameter key already exists.");
      return;
    }

    const savedParameter = {
      ...form,
      key: form.key.trim(),
      label: form.label.trim(),
      category: form.category || "General",
      description: form.description.trim(),
    };

    if (editingId !== null) {
      setParameters((current) =>
        current.map((item) =>
          item.id === editingId
            ? { ...savedParameter, id: editingId }
            : item
        )
      );
    } else {
      setParameters((current) => [
        ...current,
        {
          ...savedParameter,
          id: Date.now(),
        },
      ]);
    }

    cancelRow();
  };

  const deleteParameter = (id) => {
    if (window.confirm("Delete this parameter?")) {
      setParameters((current) =>
        current.filter((item) => item.id !== id)
      );
    }
  };

  return (
    <div className="parameters-page">
      <div className="parameters-heading">
        <div className="parameters-title">
          <h1>Parameters</h1>
          <p>
            Data points the rule engine can evaluate — global engine
            fields or product-specific values. The product tabs show
            the working tenant's products; switch tenant in the header.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={openAddRow}
          disabled={isAdding}
        >
          <span className="plus-symbol">＋</span>
          New parameter
        </button>
      </div>

    
      <section className="parameters-card">
      
        <div className="parameters-toolbar">
          <div className="parameter-tabs">
            {["All", ...products].map((tab) => (
              <button
                type="button"
                key={tab}
                className={`parameter-tab ${
                  activeTab === tab ? "selected" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
                <span className="tab-count">
                  {countFor(tab)}
                </span>
              </button>
            ))}
          </div>

          <label className="parameter-search">
            <span className="search-symbol">⌕</span>

            <input
              type="text"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search key or label..."
            />

            {search && (
              <button
                type="button"
                className="clear-search"
                onClick={() => setSearch("")}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </label>
        </div>

        {/* Table */}
        <form onSubmit={saveParameter}>
          <div className="parameters-table-wrapper">
            <table className="parameters-table">
              <colgroup>
                <col className="col-parameter" />
                <col className="col-type" />
                <col className="col-product" />
                <col className="col-category" />
                <col className="col-description" />
                <col className="col-actions" />
              </colgroup>

              <thead>
                <tr>
                  <th>PARAMETER</th>
                  <th>TYPE</th>
                  <th>PRODUCT</th>
                  <th>CATEGORY</th>
                  <th>DESCRIPTION</th>
                  <th>ACTIONS</th>
                </tr>
              </thead>

              <tbody>
                {/* Inline add row */}
                {isAdding && (
                  <tr className="parameter-edit-row">
                    <td>
                      <input
                        className="table-input"
                        placeholder="PARAMETER_KEY"
                        aria-label="Parameter key"
                        value={form.key}
                        onChange={(event) =>
                          updateForm("key", event.target.value)
                        }
                        autoFocus
                        required
                      />

                      <input
                        className="table-input label-input"
                        placeholder="Display label"
                        aria-label="Display label"
                        value={form.label}
                        onChange={(event) =>
                          updateForm("label", event.target.value)
                        }
                      />
                    </td>

                    <td>
                      <select
                        className="table-input"
                        value={form.type}
                        onChange={(event) =>
                          updateForm("type", event.target.value)
                        }
                        aria-label="Type"
                      >
                        <option value="DECIMAL">DECIMAL</option>
                        <option value="STRING">STRING</option>
                        <option value="INTEGER">INTEGER</option>
                        <option value="BOOLEAN">BOOLEAN</option>
                        <option value="LIST">LIST</option>
                        <option value="DATE">DATE</option>
                      </select>
                    </td>

                    <td>
                      <select
                        className="table-input"
                        value={form.product}
                        onChange={(event) =>
                          updateForm("product", event.target.value)
                        }
                        aria-label="Product"
                      >
                        {products.map((product) => (
                          <option key={product} value={product}>
                            {product === "Global"
                              ? "Global (engine)"
                              : product}
                          </option>
                        ))}
                      </select>
                    </td>

                    <td>
                      <select
                        className="table-input category-select"
                        value={form.category}
                        onChange={(event) =>
                          updateForm("category", event.target.value)
                        }
                        aria-label="Category"
                      >
                        <option value="">—</option>
                        <option value="Customer">Customer</option>
                        <option value="Transaction">Transaction</option>
                        <option value="Risk">Risk</option>
                        <option value="Compliance">Compliance</option>
                        <option value="General">General</option>
                      </select>
                    </td>

                    <td>
                      <input
                        className="table-input"
                        placeholder="What this parameter represents"
                        aria-label="Description"
                        value={form.description}
                        onChange={(event) =>
                          updateForm(
                            "description",
                            event.target.value
                          )
                        }
                      />
                    </td>

                    <td>
                      <div className="inline-actions">
                        <button
                          type="submit"
                          className="save-inline"
                          title="Save parameter"
                          aria-label="Save parameter"
                        >
                          ✓
                        </button>

                        <button
                          type="button"
                          className="cancel-inline"
                          title="Cancel"
                          aria-label="Cancel"
                          onClick={cancelRow}
                        >
                          ×
                        </button>
                      </div>
                    </td>
                  </tr>
                )}

                {/* Inline edit row */}
                {filteredParameters.map((item) =>
                  editingId === item.id ? (
                    <tr className="parameter-edit-row" key={item.id}>
                      <td>
                        <input
                          className="table-input"
                          placeholder="PARAMETER_KEY"
                          aria-label="Parameter key"
                          value={form.key}
                          onChange={(event) =>
                            updateForm("key", event.target.value)
                          }
                          required
                        />

                        <input
                          className="table-input label-input"
                          placeholder="Display label"
                          aria-label="Display label"
                          value={form.label}
                          onChange={(event) =>
                            updateForm("label", event.target.value)
                          }
                        />
                      </td>

                      <td>
                        <select
                          className="table-input"
                          value={form.type}
                          onChange={(event) =>
                            updateForm("type", event.target.value)
                          }
                        >
                          <option value="DECIMAL">DECIMAL</option>
                          <option value="STRING">STRING</option>
                          <option value="INTEGER">INTEGER</option>
                          <option value="BOOLEAN">BOOLEAN</option>
                          <option value="List">LIST</option>
                          <option value="DATE">DATE</option>
                        </select>
                      </td>

                      <td>
                        <select
                          className="table-input"
                          value={form.product}
                          onChange={(event) =>
                            updateForm("product", event.target.value)
                          }
                        >
                          {products.map((product) => (
                            <option key={product} value={product}>
                              {product === "Global"
                                ? "Global (engine)"
                                : product}
                            </option>
                          ))}
                        </select>
                      </td>

                      <td>
                        <select
                          className="table-input category-select"
                          value={form.category}
                          onChange={(event) =>
                            updateForm("category", event.target.value)
                          }
                        >
                          <option value="">—</option>
                          <option value="Customer">Customer</option>
                          <option value="Transaction">Transaction</option>
                          <option value="Risk">Risk</option>
                          <option value="Compliance">Compliance</option>
                          <option value="General">General</option>
                        </select>
                      </td>

                      <td>
                        <input
                          className="table-input"
                          placeholder="What this parameter represents"
                          value={form.description}
                          onChange={(event) =>
                            updateForm(
                              "description",
                              event.target.value
                            )
                          }
                        />
                      </td>

                      <td>
                        <div className="inline-actions">
                          <button
                            type="submit"
                            className="save-inline"
                            title="Save changes"
                            aria-label="Save changes"
                          >
                            ✓
                          </button>

                          <button
                            type="button"
                            className="cancel-inline"
                            title="Cancel"
                            aria-label="Cancel"
                            onClick={cancelRow}
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  ) : (
                    <tr key={item.id}>
                      <td>
                        <div className="parameter-key">
                          {item.key}
                        </div>
                        {item.label && (
                          <div className="parameter-label">
                            {item.label}
                          </div>
                        )}
                      </td>

                      <td>
                        <span className="type-badge">
                          {item.type}
                        </span>
                      </td>

                      <td>
                        {item.product === "Global"
                          ? "Global (engine)"
                          : item.product}
                      </td>

                      <td>{item.category || "—"}</td>

                      <td>{item.description || "—"}</td>

                      <td>
                        <div className="row-actions">
                          <button
                            type="button"
                            onClick={() => openEditRow(item)}
                            aria-label="Edit parameter"
                            title="Edit"
                          >
                            ✎
                          </button>

                          <button
                            type="button"
                            onClick={() => deleteParameter(item.id)}
                            aria-label="Delete parameter"
                            title="Delete"
                          >
                            ×
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                )}

                {/* Empty state */}
                {!isAdding &&
                  filteredParameters.length === 0 && (
                    <tr>
                      <td colSpan="6" className="empty-state">
                        {search
                          ? "No parameters match your search."
                          : "No parameters yet. Add one with “New parameter”, or run the seeder Lambda."}
                      </td>
                    </tr>
                  )}
              </tbody>
            </table>
          </div>
        </form>
      </section>
    </div>
  );
}
