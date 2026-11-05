
import { useEffect, useMemo, useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Trash2,
  Power,
  X,
  ChevronDown,
  Check,
} from "lucide-react";

import "./currencies.css";

const initialCurrencies = [
  { code: "AED", title: "United Arab Emirates Dirham", active: true, updated: "26 Oct, 00:09" },
  { code: "AFN", title: "Afghan Afghani", active: true, updated: "26 Oct, 00:09" },
  { code: "ALL", title: "Albanian Lek", active: true, updated: "26 Oct, 00:09" },
  { code: "AMD", title: "Armenian Dram", active: true, updated: "26 Oct, 00:09" },
  { code: "ANG", title: "Netherlands Antillean Guilder", active: true, updated: "29 Sept, 19:29" },
  { code: "AOA", title: "Angolan Kwanza", active: true, updated: "26 Oct, 00:09" },
  { code: "ARS", title: "Argentine Peso", active: true, updated: "26 Oct, 00:09" },
  { code: "AUD", title: "Australian Dollar", active: true, updated: "10 Oct, 00:35" },
  { code: "AWG", title: "Aruban Florin", active: true, updated: "26 Oct, 00:09" },
  { code: "AZN", title: "Azerbaijani Manat", active: true, updated: "26 Oct, 00:09" },
  { code: "BAM", title: "Bosnia-Herzegovina Convertible Mark", active: true, updated: "26 Oct, 00:09" },
  { code: "BBD", title: "Barbadian Dollar", active: true, updated: "26 Oct, 00:09" },
  { code: "BDT", title: "Bangladeshi Taka", active: true, updated: "26 Oct, 00:09" },
  { code: "BGN", title: "Bulgarian Lev", active: true, updated: "26 Oct, 00:09" },
  { code: "BHD", title: "Bahraini Dinar", active: true, updated: "26 Oct, 00:09" },
  { code: "BRL", title: "Brazilian Real", active: true, updated: "26 Oct, 00:09" },
  { code: "CAD", title: "Canadian Dollar", active: true, updated: "26 Oct, 00:09" },
  { code: "CHF", title: "Swiss Franc", active: true, updated: "26 Oct, 00:09" },
  { code: "CNY", title: "Chinese Yuan", active: true, updated: "26 Oct, 00:09" },
  { code: "EUR", title: "Euro", active: true, updated: "26 Oct, 00:09" },
  { code: "GBP", title: "British Pound Sterling", active: true, updated: "26 Oct, 00:09" },
  { code: "INR", title: "Indian Rupee", active: true, updated: "26 Oct, 00:09" },
  { code: "JPY", title: "Japanese Yen", active: true, updated: "26 Oct, 00:09" },
  { code: "USD", title: "United States Dollar", active: true, updated: "26 Oct, 00:09" },
];

const emptyForm = {
  code: "",
  title: "",
  active: true,
};

function getInitialCurrencies() {
  try {
    const savedCurrencies = localStorage.getItem("currencies");

    if (savedCurrencies) {
      return JSON.parse(savedCurrencies);
    }

    return initialCurrencies;
  } catch {
    return initialCurrencies;
  }
}

function Currencies() {
  const [currencies, setCurrencies] = useState(getInitialCurrencies);

  const [activeTab, setActiveTab] = useState("All");
  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [error, setError] = useState("");

  // Save currencies in localStorage
  useEffect(() => {
    localStorage.setItem("currencies", JSON.stringify(currencies));
  }, [currencies]);

  // Count active and inactive currencies
  const activeCount = currencies.filter(
    (currency) => currency.active
  ).length;

  const inactiveCount = currencies.filter(
    (currency) => !currency.active
  ).length;

  // Search and filter currencies
  const filteredCurrencies = useMemo(() => {
    return currencies.filter((currency) => {
      const matchesTab =
        activeTab === "All" ||
        (activeTab === "Active" && currency.active) ||
        (activeTab === "Inactive" && !currency.active);

      const matchesSearch =
        currency.code.toLowerCase().includes(search.toLowerCase()) ||
        currency.title.toLowerCase().includes(search.toLowerCase());

      return matchesTab && matchesSearch;
    });
  }, [currencies, activeTab, search]);

  // Open Add Currency Modal
  const handleAddCurrency = () => {
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
    setShowModal(true);
  };

  // Open Edit Currency Modal
  const handleEditCurrency = (currency) => {
    setEditingId(currency.id);

    setFormData({
      code: currency.code,
      title: currency.title,
      active: currency.active,
    });

    setError("");
    setShowModal(true);
  };

  // Handle input changes
  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value.toUpperCase().trim(),
    }));
  };

  // Save new currency or update existing currency
  const handleSubmit = (event) => {
    event.preventDefault();

    const code = formData.code.trim().toUpperCase();
    const title = formData.title.trim();

    if (!code || !title) {
      setError("Please enter currency code and title.");
      return;
    }

    if (!/^[A-Z]{3}$/.test(code)) {
      setError("Currency code must contain exactly 3 letters.");
      return;
    }

    const duplicate = currencies.some(
      (currency) =>
        currency.code.toUpperCase() === code &&
        currency.id !== editingId
    );

    if (duplicate) {
      setError("This currency code already exists.");
      return;
    }

    const currentDate = new Date().toLocaleString("en-GB", {
      day: "2-digit",
      month: "short",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    });

    if (editingId) {
      // Update existing currency
      setCurrencies((prev) =>
        prev.map((currency) =>
          currency.id === editingId
            ? {
                ...currency,
                code,
                title,
                active: formData.active,
                updated: currentDate,
              }
            : currency
        )
      );
    } else {
      // Add new currency
      const newCurrency = {
        id: Date.now(),
        code,
        title,
        active: formData.active,
        updated: currentDate,
      };

      setCurrencies((prev) => [...prev, newCurrency]);
    }

    setShowModal(false);
    setFormData(emptyForm);
    setEditingId(null);
    setError("");
  };

  // Delete currency
  const handleDelete = (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this currency?"
    );

    if (confirmDelete) {
      setCurrencies((prev) =>
        prev.filter((currency) => currency.id !== id)
      );
    }
  };

  // Activate or deactivate currency
  const handleToggleStatus = (id) => {
    setCurrencies((prev) =>
      prev.map((currency) =>
        currency.id === id
          ? {
              ...currency,
              active: !currency.active,
              updated: new Date().toLocaleString("en-GB", {
                day: "2-digit",
                month: "short",
                hour: "2-digit",
                minute: "2-digit",
                hour12: false,
              }),
            }
          : currency
      )
    );
  };

  // Close modal
  const handleCloseModal = () => {
    setShowModal(false);
    setEditingId(null);
    setFormData(emptyForm);
    setError("");
  };

  return (
    <div className="currencies-page">
      {/* Page Header */}
      <div className="currencies-heading">
        <div>
          <h1>Currencies</h1>

          <p>
            The global currency list shared by every tenant. Only the
            System portal can add, edit or delete currencies.
          </p>
        </div>

        <button
          className="new-currency-btn"
          onClick={handleAddCurrency}
        >
          <Plus size={17} />
          New currency
        </button>
      </div>

      {/* Currency Table */}
      <div className="currency-table-card">
        {/* Table Toolbar */}
        <div className="currency-toolbar">
          <div className="currency-tabs">
            <button
              className={`currency-tab ${
                activeTab === "All" ? "selected" : ""
              }`}
              onClick={() => setActiveTab("All")}
            >
              All
              <span>{currencies.length}</span>
            </button>

            <button
              className={`currency-tab ${
                activeTab === "Active" ? "selected" : ""
              }`}
              onClick={() => setActiveTab("Active")}
            >
              <span className="tab-dot active-dot"></span>
              Active
              <span>{activeCount}</span>
            </button>

            <button
              className={`currency-tab ${
                activeTab === "Inactive" ? "selected" : ""
              }`}
              onClick={() => setActiveTab("Inactive")}
            >
              <span className="tab-dot inactive-dot"></span>
              Inactive
              <span>{inactiveCount}</span>
            </button>
          </div>

          {/* Search */}
          <div className="currency-search">
            <Search size={16} />

            <input
              type="text"
              placeholder="Search code or title..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />

            {search && (
              <button
                className="clear-search"
                onClick={() => setSearch("")}
              >
                <X size={14} />
              </button>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="currency-table-wrapper">
          <table className="currency-table">
            <thead>
              <tr>
                <th>CODE</th>
                <th>TITLE</th>
                <th>STATUS</th>
                <th>UPDATED</th>
                <th className="actions-heading">ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCurrencies.map((currency) => (
                <tr key={currency.id || currency.code}>
                  <td>
                    <span className="currency-code">
                      {currency.code}
                    </span>
                  </td>

                  <td className="currency-title">
                    {currency.title}
                  </td>

                  <td>
                    <span
                      className={`currency-status ${
                        currency.active
                          ? "status-active"
                          : "status-inactive"
                      }`}
                    >
                      <span className="status-dot"></span>

                      {currency.active ? "Active" : "Inactive"}
                    </span>
                  </td>

                  <td className="currency-updated">
                    {currency.updated}
                  </td>

                  <td>
                    <div className="currency-actions">
                      <button
                        title="Edit currency"
                        onClick={() =>
                          handleEditCurrency(currency)
                        }
                      >
                        <Pencil size={15} />
                      </button>

                      <button
                        title={
                          currency.active
                            ? "Deactivate currency"
                            : "Activate currency"
                        }
                        onClick={() =>
                          handleToggleStatus(currency.id)
                        }
                      >
                        <Power size={15} />
                      </button>

                      <button
                        title="Delete currency"
                        onClick={() =>
                          handleDelete(currency.id)
                        }
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCurrencies.length === 0 && (
                <tr>
                  <td colSpan="5">
                    <div className="currency-empty">
                      <Search size={28} />

                      <h3>No currencies found</h3>

                      <p>
                        Try searching with another currency code or
                        title.
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Table Footer */}
        <div className="currency-footer">
          Showing{" "}
          <strong>{filteredCurrencies.length}</strong>{" "}
          of <strong>{currencies.length}</strong> currencies
        </div>
      </div>

      {/* Add / Edit Modal */}
      {showModal && (
        <div
          className="currency-modal-overlay"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              handleCloseModal();
            }
          }}
        >
          <div
            className="currency-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="currency-modal-title"
          >
            <div className="currency-modal-header">
              <div>
                <span className="modal-eyebrow">
                  CURRENCY CONFIGURATION
                </span>

                <h2 id="currency-modal-title">
                  {editingId
                    ? "Edit Currency"
                    : "New Currency"}
                </h2>

                <p>
                  Add or update a global currency for all tenants.
                </p>
              </div>

              <button
                className="modal-close-btn"
                onClick={handleCloseModal}
              >
                <X size={19} />
              </button>
            </div>

            <form
              className="currency-form"
              onSubmit={handleSubmit}
            >
              <div className="currency-form-group">
                <label htmlFor="currency-code">
                  Currency Code <span>*</span>
                </label>

                <input
                  id="currency-code"
                  type="text"
                  name="code"
                  placeholder="e.g. INR"
                  maxLength={3}
                  value={formData.code}
                  onChange={handleChange}
                  required
                />

                <small>
                  Enter the 3-letter ISO currency code.
                </small>
              </div>

              <div className="currency-form-group">
                <label htmlFor="currency-title">
                  Currency Title <span>*</span>
                </label>

                <input
                  id="currency-title"
                  type="text"
                  name="title"
                  placeholder="e.g. Indian Rupee"
                  value={formData.title}
                  onChange={(event) =>
                    setFormData((prev) => ({
                      ...prev,
                      title: event.target.value,
                    }))
                  }
                  required
                />
              </div>

              <div className="currency-form-group">
                <label htmlFor="currency-status">
                  Status
                </label>

                <div className="currency-select-wrapper">
                  <select
                    id="currency-status"
                    value={formData.active ? "Active" : "Inactive"}
                    onChange={(event) =>
                      setFormData((prev) => ({
                        ...prev,
                        active: event.target.value === "Active",
                      }))
                    }
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>

                  <ChevronDown size={16} />
                </div>
              </div>

              {error && (
                <div className="currency-form-error">
                  {error}
                </div>
              )}

              <div className="currency-modal-footer">
                <button
                  type="button"
                  className="cancel-currency-btn"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="save-currency-btn"
                >
                  <Check size={16} />

                  {editingId
                    ? "Update currency"
                    : "Create currency"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default Currencies;




    
   
