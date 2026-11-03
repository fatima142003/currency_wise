import { currencyList, Currencies as currenciesPage } from "../data/portalData.js";
import { useMemo, useState, useEffect } from "react";
import {
  Plus,
  Trash2,
  Pencil,
  PowerIcon,
} from "lucide-react";
import"./currencies.css";

const emptyForm = {
    code:"",
    title:"",
    active:true,
    updated:"",
}


function Currencies(){
     const [currencies, setCurrencies] = useState(() => {
    try {
      const savedData = localStorage.getItem("currencies");

      if (savedData) {
        return JSON.parse(savedData);
      }

      return currencyList;
    } catch {
      return currencyList;
    }
  });


  const [activeTab, setActiveTab] = useState("All");

  const [search, setSearch] = useState("");

  const [showModal, setShowModal] = useState(false);

  const [editingId, setEditingId] = useState(null);

  const [formData, setFormData] = useState(emptyForm);

  const [error, setError] = useState("");

  

  useEffect(() => {
    localStorage.setItem("currencies", JSON.stringify(currencies));
  }, [currencies]);

  const handleEditCurrency = (currency) => {
    setFormData({ code: currency.code, title: currency.title, active: currency.active });
    setEditingId(currency.code);
    setShowModal(true);
    setError("");
  };

  const activeCount = currencies.filter(
    (currency) => currency.active
  ).length;

  const inactiveCount = currencies.filter(
    (currency) => !currency.active
  ).length;


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

  const handleAddCurrency = () => {
    setFormData(emptyForm);
    setEditingId(null);
    setShowModal(true);
  }

  const handleSaveCurrency = (event) => {
    event.preventDefault();
    const code = formData.code.trim().toUpperCase();
    const title = formData.title.trim();
    if (!code || !title) {
      setError("Enter a currency code and title.");
      return;
    }
    if (editingId === null && currencies.some((currency) => currency.code === code)) {
      setError("That currency code already exists.");
      return;
    }
    setCurrencies((current) => editingId === null
      ? [...current, { ...formData, code, title, updated: new Date().toLocaleDateString() }]
      : current.map((currency) => currency.code === editingId
        ? { ...currency, ...formData, code, title, updated: new Date().toLocaleDateString() }
        : currency));
    setShowModal(false);
  };

  const handleToggleActive = (code) => {
    setCurrencies((current) => current.map((currency) => currency.code === code
      ? { ...currency, active: !currency.active }
      : currency));
  };

  const handleDeleteCurrency = (code) => {
    setCurrencies((current) => current.filter((currency) => currency.code !== code));
  };

   

  

    








  return (

    <div className="currencies-page">
        <div className="currencies-header">
            <h3>{currenciesPage.heading}</h3>
            <p>{currenciesPage.description}</p>
            </div>
            <button
          className="new-currency-btn"
          onClick={handleAddCurrency}
        >
          <Plus size={17} />
          New currency
        </button>
        <div className="currencies-tabs-card">
            <div className="currencies-Toolbar">
                <div className="currencies-tabs">
                    <button
                        className={activeTab === "All" ? "active" : ""}
                        onClick={() => setActiveTab("All")}
                    >
                        All ({currencies.length})
                    </button>
                    <button
                        className={activeTab === "Active" ? "active" : ""}
                        onClick={() => setActiveTab("Active")}
                    >
                        Active ({activeCount})
                    </button>
                    <button
                        className={activeTab === "Inactive" ? "active" : ""}
                        onClick={() => setActiveTab("Inactive")}
                    >
                        Inactive ({inactiveCount})
                    </button>
                </div>
                <div className="currencies-search">
                    <input
                        type="text"
                        placeholder="Search currencies..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                    </div>
                </div>
            </div>
            <section className="currencies-table-card">
             <table className="currencies-table">
                
                <thead>
                    <tr>
                        <th>CODE</th>
                        <th>TITLE</th>
                        <th>ACTIVE</th>
                        <th>UPDATED</th> 
                         <th className="actions-heading">
                  ACTIONS
                </th>

                    </tr>
                </thead>
                <tbody>
                    {filteredCurrencies.map((currency) => (
                        <tr key={currency.code}>
                            <td>
                               <span className="currency-code">{currency.code}</span>
                            </td>
                            <td>
                                <span className="currency-title">{currency.title}</span>
                            </td>
                            <td>
                                <span className={`currency-active ${currency.active ? "active" : "inactive"}`}>
                                    {currency.active ? "Active" : "Inactive"}
                                </span>
                            </td>
                            <td>
                                <span className="currency-updated">{currency.updated}</span>    

                            </td>
                            <td className="actions">
                                <button className="edit-btn" onClick={() => handleEditCurrency(currency)}>
                                    <Pencil size={16} />
                                </button>
                                <button className="deactivate-btn" onClick={() => handleToggleActive(currency.code)}>
                                
                                    <PowerIcon size={16} />
                                </button>
                                <button className="delete-btn" onClick={() => handleDeleteCurrency(currency.code)}>
                                    <Trash2 size={16} />
                                </button>
                            </td>
                        </tr>
                    ))}
                    {filteredCurrencies.length === 0 && (
                        <tr>
                            <td colSpan="5" className="no-currencies">
                                No currencies found.
                            </td>
                        </tr>
                    )}
                    

                </tbody>
                </table>
                </section>
               <div className="currency-footer">
          Showing{" "}
          <strong>{filteredCurrencies.length}</strong>{" "}
          of <strong>{currencies.length}</strong> currencies
        </div>


       
      {showModal && (
        <div className="currency-modal-backdrop" role="presentation" onMouseDown={(event) => {
          if (event.target === event.currentTarget) setShowModal(false);
        }}>
          <form className="currency-modal" onSubmit={handleSaveCurrency}>
            <h2>{editingId === null ? "New currency" : "Edit currency"}</h2>
            <label>Code
              <input value={formData.code} maxLength={3} onChange={(event) => setFormData({ ...formData, code: event.target.value })} />
            </label>
            <label>Title
              <input value={formData.title} onChange={(event) => setFormData({ ...formData, title: event.target.value })} />
            </label>
            {error && <p role="alert">{error}</p>}
            <div className="currency-modal-actions">
              <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              <button type="submit">Save currency</button>
            </div>
          </form>
        </div>
      )}

      </div>




        
  );
  

    
    }

export default Currencies;



    
   
