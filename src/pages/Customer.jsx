
import { useState } from "react";
import { Customer, Customerinital } from "../data/portalData";
import {
  Plus,
  Search,
  Pencil,
  X,
  Building2,
  Eye,
  UserRound,
  Check,
} from "lucide-react";
import"./Customer.css";


const emptyForm = {
  type: "Individual",
  channel: "",
  firstName: "",
  lastName: "",
  dateOfBirth: "",
  nationality: "",
  email: "",
  mobile: "",
  yourCustomerId: "",

  legalentityName: "",
  trading: "",
  abn: "",
  companyType: "",
  businesstype: "",
  registrationDate: "",

  address1: "",
  address2: "",
  city: "",
  state: "",
  postcode: "",
  country: "",

  riskPool: "Medium",
  notes: "",
};

const tabs = ["All", "Pending", "In review", "Verified", "Failed"];

function Customers() {
  const [customers, setCustomers] = useState(Customerinital);

  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [viewCustomer, setViewCustomer] = useState(null);

  const [formData, setFormData] = useState({ ...emptyForm });

  const [activeTab, setActiveTab] = useState("All");
  const [channelFilter, setChannelFilter] = useState("All channels");
  const [typeFilter, setTypeFilter] = useState("All types");
  const [search, setSearch] = useState("");

  // Open Add Customer Modal
  const openAddModal = () => {
    setFormData({ ...emptyForm });
    setEditingId(null);
    setShowModal(true);
  };

  // Open Edit Customer Modal
  const openEditModal = (customer) => {
    const existingCustomer = customers.find(
      (item) => item.id === customer.id
    );

    setEditingId(customer.id);

    setFormData({
      ...emptyForm,
      ...existingCustomer,

      type: customer.type || "Individual",
      channel: customer.channel || "",
      email: customer.email || "",
      yourCustomerId: customer.yourCustomerId || customer.reference || "",

      firstName: customer.firstName || "",
      lastName: customer.lastName || "",
      businessName: customer.businessName || "",

      legalentityName:
        customer.legalentityName ||
        (customer.type === "Business" ? customer.name : ""),

      trading: customer.trading || "",
      abn: customer.abn || "",
      companyType: customer.companyType || "",
      businesstype: customer.businesstype || "",
      registrationDate: customer.registrationDate || "",

      mobile: customer.mobile || "",
      nationality: customer.nationality || "",
      dateOfBirth: customer.dateOfBirth || "",

      address1: customer.address1 || "",
      address2: customer.address2 || "",
      city: customer.city || "",
      state: customer.state || "",
      postcode: customer.postcode || "",
      country: customer.country || "",

      riskPool: customer.riskPool || customer.risk || "Medium",
      notes: customer.notes || "",
    });

    setShowModal(true);
  };

  // Handle Form Input Changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Submit Customer Form
  const handleSubmit = (e) => {
    e.preventDefault();

    const customerName =
      formData.type === "Individual"
        ? `${formData.firstName} ${formData.lastName}`.trim()
        : formData.legalentityName.trim();

    if (!customerName || !formData.email || !formData.channel) {
      return;
    }

    const existingCustomer = customers.find(
      (customer) => customer.id === editingId
    );

    const customerData = {
      ...formData,

      id: editingId ?? Date.now(),

      name: customerName,
      email: formData.email,
      reference: formData.yourCustomerId || "—",
      channel: formData.channel,
      type: formData.type,

      verification: existingCustomer?.verification || "Pending",
      risk: formData.riskPool,
      riskPool: formData.riskPool,

      source: existingCustomer?.source || "Portal",
      created:
        existingCustomer?.created ||
        new Date().toLocaleDateString(),

      authorised:
        formData.type === "Business"
          ? formData.trading || "—"
          : `${formData.firstName} ${formData.lastName}`.trim(),

      extra: formData.email,
    };

    if (editingId !== null) {
      setCustomers((prev) =>
        prev.map((customer) =>
          customer.id === editingId
            ? customerData
            : customer
        )
      );
    } else {
      setCustomers((prev) => [...prev, customerData]);
    }

    setShowModal(false);
    setFormData({ ...emptyForm });
    setEditingId(null);
  };

  // Filter Customers
  const filteredCustomers = customers.filter((customer) => {
    const matchesTab =
      activeTab === "All" ||
      customer.verification === activeTab;

    const matchesChannel =
      channelFilter === "All channels" ||
      customer.channel === channelFilter;

    const matchesType =
      typeFilter === "All types" ||
      customer.type === typeFilter;

    const searchValue = search.toLowerCase();

    const matchesSearch =
      (customer.name || "").toLowerCase().includes(searchValue) ||
      (customer.email || "").toLowerCase().includes(searchValue) ||
      String(customer.reference || "")
        .toLowerCase()
        .includes(searchValue) ||
      String(customer.extra || "")
        .toLowerCase()
        .includes(searchValue);

    return (
      matchesTab &&
      matchesChannel &&
      matchesType &&
      matchesSearch
    );
  });

  // Tab Counts
  const tabCounts = {
    All: customers.length,

    Pending: customers.filter(
      (customer) => customer.verification === "Pending"
    ).length,

    "In review": customers.filter(
      (customer) => customer.verification === "In review"
    ).length,

    Verified: customers.filter(
      (customer) => customer.verification === "Verified"
    ).length,

    Failed: customers.filter(
      (customer) => customer.verification === "Failed"
    ).length,
  };

  return (
    <div className="customers-page">
      {/* Page Header */}
      <div className="customer-header">
        <div>
          <h2>{Customer.heading || "Customers"}</h2>

          <p>
            {Customer.description ||
              "Currencywise Exchange's customers — individuals and businesses"}
          </p>
        </div>

        <button
          className="add-customer-btn"
          onClick={openAddModal}
        >
          <Plus size={15} />
          New customer
        </button>
      </div>

      {/* Customer Card */}
      <div className="customer-card">
        {/* Toolbar */}
        <div className="customer-toolbar">
          <div className="verification-tabs">
            {tabs.map((tab) => (
              <button
                key={tab}
                className={`verification-tab ${
                  activeTab === tab ? "selected" : ""
                }`}
                onClick={() => setActiveTab(tab)}
              >
                {tab !== "All" && (
                  <span
                    className={`tab-dot ${tab
                      .toLowerCase()
                      .replace(" ", "-")}`}
                  />
                )}

                {tab}

                <span className="tab-count">
                  {tabCounts[tab]}
                </span>
              </button>
            ))}
          </div>

          <div className="customer-filters">
            <select
              value={channelFilter}
              onChange={(e) => setChannelFilter(e.target.value)}
            >
              <option value="All channels">All channels</option>
              <option value="OTC Retail">OTC Retail</option>
              <option value="Wholesale B2B">Wholesale B2B</option>
              <option value="Online FX">Online FX</option>
              <option value="Partners and Resellers">
                Partners and Resellers
              </option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
            >
              <option value="All types">All types</option>
              <option value="Individual">Individual</option>
              <option value="Business">Business</option>
            </select>
          </div>

          <div className="customer-search">
            <Search size={14} />

            <input
              type="text"
              placeholder="Search name, email, ABN, reference..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        {/* Customer Table */}
        <div className="customer-table-scroll">
          <table className="customer-table">
            <thead>
              <tr>
                <th>CUSTOMER</th>
                <th>AUTHORISED PERSON</th>
                <th>CHANNEL</th>
                <th>TYPE</th>
                <th>VERIFICATION</th>
                <th>RISK POOL</th>
                <th>SOURCE</th>
                <th>CREATED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {filteredCustomers.map((customer) => (
                <tr key={customer.id}>
                  <td>
                    <div className="customer-info">
                      <div className="customer-icon">
                        {customer.type === "Business" ? (
                          <Building2 size={15} />
                        ) : (
                          <UserRound size={15} />
                        )}
                      </div>

                      <div className="customer-details">
                        <strong>{customer.name}</strong>

                        <span>{customer.email}</span>

                        <small>
                          Ref. {customer.reference || "—"}
                        </small>
                      </div>
                    </div>
                  </td>

                  <td className="authorised-cell">
                    {customer.authorised || "—"}
                  </td>

                  <td>
                    <span className="channel-badge">
                      <span className="channel-dot" />
                      {customer.channel}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`type-badge ${
                        customer.type === "Business"
                          ? "business-type"
                          : "individual-type"
                      }`}
                    >
                      {customer.type === "Business" ? (
                        <Building2 size={11} />
                      ) : (
                        <UserRound size={11} />
                      )}

                      {customer.type}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`verification-badge ${(
                        customer.verification || "Pending"
                      )
                        .toLowerCase()
                        .replace(" ", "-")}`}
                    >
                      <span className="verification-dot" />
                      {customer.verification || "Pending"}
                    </span>
                  </td>

                  <td>
                    <span
                      className={`risk-badge ${(
                        customer.risk || "Medium"
                      ).toLowerCase()}`}
                    >
                      {customer.risk || "Medium"}
                    </span>
                  </td>

                  <td>{customer.source || "Portal"}</td>

                  <td>
                    <div className="created-info">
                      <span>{customer.created || "—"}</span>
                    </div>
                  </td>

                  <td>
                    <div className="action-buttons">
                      <button
                        className="view-btn"
                        title="View customer"
                        onClick={() => setViewCustomer(customer)}
                      >
                        <Eye size={14} />
                      </button>

                      <button
                        className="edit-btn"
                        onClick={() => openEditModal(customer)}
                      >
                        <Pencil size={13} />
                        Edit
                      </button>
                    </div>
                  </td>
                </tr>
              ))}

              {filteredCustomers.length === 0 && (
                <tr>
                  <td colSpan="9" className="empty-table">
                    No customers found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="customer-table-footer">
          Showing {filteredCustomers.length} of {customers.length} customers
        </div>
      </div>

      {/* Add / Edit Customer Modal */}
      {showModal && (
        <div
          className="customer-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setShowModal(false);
            }
          }}
        >
          <div className="customer-modal">
            {/* Modal Header */}
            <div className="modal-header">
              <h2>
                {editingId !== null
                  ? "Edit customer"
                  : "New customer"}
              </h2>

              <button
                type="button"
                className="close-modal"
                onClick={() => setShowModal(false)}
              >
                <X size={15} />
              </button>
            </div>

            {/* Form */}
            <form
              className="customer-form"
              onSubmit={handleSubmit}
            >
              <div className="modal-body">
                {/* Tenant and Type */}
                <div className="form-row">
                  <div className="form-group">
                    <label>Tenant</label>

                    <input
                      type="text"
                      value="Currencywise Exchange"
                      readOnly
                    />
                  </div>

                  <div className="form-group">
                    <label>Customer type</label>

                    <div className="customer-type-options">
                      <button
                        type="button"
                        className={`customer-type-btn ${
                          formData.type === "Individual"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            type: "Individual",
                          }))
                        }
                      >
                        <UserRound size={14} />
                        Individual
                      </button>

                      <button
                        type="button"
                        className={`customer-type-btn ${
                          formData.type === "Business"
                            ? "selected"
                            : ""
                        }`}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            type: "Business",
                          }))
                        }
                      >
                        <Building2 size={14} />
                        Business
                      </button>
                    </div>
                  </div>
                </div>

                {/* Channel */}
                <div className="form-group">
                  <label>
                    Channel <span>*</span>
                  </label>

                  <select
                    name="channel"
                    value={formData.channel}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Choose a channel...</option>
                    <option value="OTC Retail">OTC Retail</option>
                    <option value="Wholesale B2B">Wholesale B2B</option>
                    <option value="Online FX">Online FX</option>
                    <option value="Partners and Resellers">
                      Partners and Resellers
                    </option>
                  </select>
                </div>

                {/* Individual Fields */}
                {formData.type === "Individual" ? (
                  <>
                    <h3 className="form-section-title">PERSON</h3>

                    <div className="form-row">
                      <div className="form-group">
                        <label>
                          First name <span>*</span>
                        </label>

                        <input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          required
                        />
                      </div>

                      <div className="form-group">
                        <label>
                          Last name <span>*</span>
                        </label>

                        <input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          required
                        />
                      </div>
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label>Date of birth</label>

                        <input
                          type="date"
                          name="dateOfBirth"
                          value={formData.dateOfBirth}
                          onChange={handleChange}
                        />
                      </div>

                      <div className="form-group">
                        <label>Nationality</label>

                        <input
                          name="nationality"
                          placeholder="e.g. Australian"
                          value={formData.nationality}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </>
                ) : (
                  <>
                    <h3 className="form-section-title">
                      BUSINESS DETAILS
                    </h3>

                    <div className="form-group">
                      <label>
                        Legal entity name <span>*</span>
                      </label>

                      <input
                        name="legalentityName"
                        value={formData.legalentityName}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        Trading name <span>*</span>
                      </label>

                      <input
                        name="trading"
                        value={formData.trading}
                        onChange={handleChange}
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>
                        ABN / ACN <span>*</span>
                      </label>

                      <input
                        name="abn"
                        value={formData.abn}
                        onChange={handleChange}
                        placeholder="11 to 9 digits"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Company type</label>

                      <select
                        name="companyType"
                        value={formData.companyType}
                        onChange={handleChange}
                      >
                        <option value="">Choose company type...</option>
                        <option value="Domestic Regulated Remittance Company">
                          Domestic Regulated Remittance Company
                        </option>
                        <option value="Overseas Regulated Remittance Company">
                          Overseas Regulated Remittance Company
                        </option>
                        <option value="Overseas Non-Regulated Remittance Company">
                          Overseas Non-Regulated Remittance Company
                        </option>
                        <option value="Domestic Company">
                          Domestic Company
                        </option>
                        <option value="Overseas Company">
                          Overseas Company
                        </option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label>Business type</label>

                      <input
                        name="businesstype"
                        value={formData.businesstype}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="form-group">
                      <label>Registration date</label>

                      <input
                        type="date"
                        name="registrationDate"
                        value={formData.registrationDate}
                        onChange={handleChange}
                      />
                    </div>
                  </>
                )}

                {/* Contact */}
                <h3 className="form-section-title">CONTACT</h3>

                <div className="form-row">
                  <div className="form-group">
                    <label>
                      Email <span>*</span>
                    </label>

                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>
                      {formData.type === "Individual"
                        ? "Mobile"
                        : "Contact phone"}
                    </label>

                    <input
                      type="tel"
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      placeholder="+61412345678"
                    />
                  </div>
                </div>

                {/* Customer ID */}
                <div className="form-group">
                  <label>Your customer ID (optional)</label>

                  <input
                    name="yourCustomerId"
                    value={formData.yourCustomerId}
                    onChange={handleChange}
                    placeholder="The tenant's own reference, e.g. CUST-00421"
                  />
                </div>

                {/* Address */}
                <h3 className="form-section-title">
                  {formData.type === "Individual"
                    ? "RESIDENTIAL ADDRESS"
                    : "PRINCIPAL BUSINESS ADDRESS"}
                </h3>

                <div className="form-group">
                  <label>Address line 1</label>

                  <input
                    name="address1"
                    value={formData.address1}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label>Address line 2</label>

                  <input
                    name="address2"
                    value={formData.address2}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>City</label>

                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>State</label>

                    <input
                      name="state"
                      value={formData.state}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Postcode</label>

                    <input
                      name="postcode"
                      value={formData.postcode}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Country</label>

                    <input
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                {/* Other */}
                <h3 className="form-section-title">OTHERS</h3>

                <div className="form-group">
                  <label>Risk pool</label>

                  <select
                    name="riskPool"
                    value={formData.riskPool}
                    onChange={handleChange}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Notes</label>

                  <textarea
                    name="notes"
                    value={formData.notes}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setShowModal(false)}
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  className="create-customer-btn"
                >
                  <Check size={14} />

                  {editingId !== null
                    ? "Save changes"
                    : "Create customer"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* View Customer Modal */}
      {viewCustomer && (
        <div
          className="customer-modal-overlay"
          onMouseDown={(e) => {
            if (e.target === e.currentTarget) {
              setViewCustomer(null);
            }
          }}
        >
          <div className="customer-modal view-modal">
            <div className="modal-header">
              <h2>Customer details</h2>

              <button
                type="button"
                className="close-modal"
                onClick={() => setViewCustomer(null)}
              >
                <X size={15} />
              </button>
            </div>

            <div className="view-customer-body">
              <h3>{viewCustomer.name}</h3>

              <p>{viewCustomer.email}</p>

              <div className="view-details-grid">
                <div>
                  <label>Customer type</label>
                  <strong>{viewCustomer.type}</strong>
                </div>

                <div>
                  <label>Channel</label>
                  <strong>{viewCustomer.channel}</strong>
                </div>

                <div>
                  <label>Customer ID</label>
                  <strong>
                    {viewCustomer.yourCustomerId ||
                      viewCustomer.reference ||
                      "—"}
                  </strong>
                </div>

                <div>
                  <label>Verification</label>
                  <strong>
                    {viewCustomer.verification || "Pending"}
                  </strong>
                </div>

                <div>
                  <label>Risk pool</label>
                  <strong>
                    {viewCustomer.riskPool ||
                      viewCustomer.risk ||
                      "Medium"}
                  </strong>
                </div>

                <div>
                  <label>Mobile</label>
                  <strong>{viewCustomer.mobile || "—"}</strong>
                </div>

                <div>
                  <label>Address</label>
                  <strong>
                    {[
                      viewCustomer.address1,
                      viewCustomer.address2,
                      viewCustomer.city,
                      viewCustomer.state,
                      viewCustomer.postcode,
                      viewCustomer.country,
                    ]
                      .filter(Boolean)
                      .join(", ") || "—"}
                  </strong>
                </div>

                <div>
                  <label>Notes</label>
                  <strong>{viewCustomer.notes || "—"}</strong>
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="button"
                className="cancel-btn"
                onClick={() => setViewCustomer(null)}
              >
                Close
              </button>

              <button
                type="button"
                className="create-customer-btn"
                onClick={() => {
                  setViewCustomer(null);
                  openEditModal(viewCustomer);
                }}
              >
                <Pencil size={14} />
                Edit customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Customers;

