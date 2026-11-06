import { useState } from "react";
import { Search } from "lucide-react";
import { Order } from "../data/portalData.js";
import "./Order.css";

const orderTabs = ["All", "Pending", "Completed", "Cancelled"];

export default function Orders() {
  const [search, setSearch] = useState("");
  const [activeTab, setActiveTab] = useState("All");

  return (
    <main className="orders-page">
      <header className="orders-heading">
        <h1>{Order.heading}</h1>
        <p>{Order.description}</p>
      </header>

      <section className="orders-card" aria-label="Orders">
        <div className="orders-toolbar">
          <div className="orders-tabs" role="tablist" aria-label="Order status">
            {orderTabs.map((tab) => (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={activeTab === tab}
                className={`orders-tab${activeTab === tab ? " selected" : ""}`}
                onClick={() => setActiveTab(tab)}
              >
                {tab !== "All" && <span className={`orders-dot ${tab.toLowerCase()}`} />}
                {tab}<span className="orders-count">0</span>
              </button>
            ))}
          </div>

          <label className="orders-search">
            <Search size={14} aria-hidden="true" />
            <input
              type="search"
              placeholder="Search order id, customer or channel..."
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              aria-label="Search order id, customer or channel"
            />
          </label>
        </div>

        <div className="orders-table-wrap">
          <table className="orders-table">
            <thead>
              <tr>
                <th>ORDER</th>
                <th>CUSTOMER</th>
                <th>CHANNEL</th>
                <th>TRANSACTIONS</th>
                <th>TOTAL</th>
                <th>STATUS</th>
                <th>VIEW</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="orders-empty" colSpan="7">
                  No orders yet — they appear here when the tenant&apos;s system calls POST /v1/orders.
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </main>
  );
}
