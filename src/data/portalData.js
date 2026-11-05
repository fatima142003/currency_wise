// Portal-wide frontend data. Channel document settings live in initialDocuments.json.
import channelDocuments from "./initialDocuments.json";

export const portalData = {
  "portal": {
    "name": "CurrencyWise AML",
    "description": "AML configuration and monitoring portal"
  },
  "dashboard": {
    "heading": "Dashboard",
    "description": "Monitoring engine status across all channels and products — illustrative data.",
    "metrics": [
      {
        "label": "Active products",
        "value": 3
      },
      {
        "label": "Configured channels",
        "value": 4
      },
      {
        "label": "Rules monitored",
        "value": 18
      },
      {
        "label": "Open alerts",
        "value": 7
      }
    ]
  },
  "channelTabs": [
    "KYC Documents",
    "Risk Scoring",
    "Transaction Limits"
  ],
  "channels": [
    {
      "name": "OTC Retail",
      "icon": "UserRound"
    },
    {
      "name": "Wholesale B2B",
      "icon": "Building2"
    },
    {
      "name": "Online-FX",
      "icon": "Globe"
    },
    {
      "name": "Partners and Resellers",
      "icon": "Building2"
    }
  ],
  "products": [
    {
      "id": "PRD-FX",
      "name": "Foreign Currency Exchange",
      "services": "AML/CTF Act s6, Table 1, item 50 — exchanging one currency for another",
      "status": "Active",
      "channels": [
        "OTC",
        "Wholesale",
        "Online"
      ],
      "Template_completed": 10
    },
    {
      "id": "PRD-REM",
      "name": "Cross-Border Remittance",
      "services": "AML/CTF Act s6, Table 1, items 31/32 — remittance & value transfer service",
      "status": "Active",
      "channels": [
        "OTC"
      ],
      "Template_completed": 3
    },
    {
      "id": "PRD-BUL",
      "name": "Bullion Dealing",
      "services": "AML/CTF Act s6, Table 4 — buying or selling bullion",
      "status": "Active",
      "channels": [
        "OTC",
        "Wholesale"
      ],
      "Template_completed": 2
    },
    {
      "id": "PRD-T",
      "name": "Test",
      "services": "Test service",
      "status": "Draft",
      "channels": [],
      "Template_completed": 0
    }
  ],
  "productChannels": [
    "OTC",
    "Wholesale",
    "Online"
  ],
  "parameterProducts": [
    "Global",
    "PRD-FX",
    "PRD-REM",
    "PRD-BUL",
    "PRD-T"
  ],
  "parameters": [],
  "rules": {
    "count": 18,
    "channelCount": 4,
    "productCount": 3
  },
  "ruleBuilder": {
    "heading": "Rule Builder",
    "description": "18 rules across 4 channels and 3 products."
  },
  "resolution": {
    "heading": "Resolution Requirements",
    "description": "The full library of resolution checklist items — including the always-required baseline ones. Rules attach whichever elective requirements apply to their outcome severity; items marked \"Always required\" appear on every case regardless."
  },


  "Order":{
    "heading":"Orders",
    "description":"Currencywise Exchange's orders, sent by its order API. Switch the working tenant in the header to see another tenant's.",
  },
 
 "CDD_onbording": {
    "heading": "Onbording",
    "description": "Customer onboarding products: the checks and parameters applied when a customer is onboarded."
  },

  "Currencies":{
    "heading": "Currencies",
    "description":"The global currency list shared by every tenant. Only the System portal can add, edit or delete currencies.",

  },

  "currencyList": [
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

  ],
  "Customer":{
    "heading":"Customers",
    "description":"Currencywise Exchange's customers — individuals and businesses. Switch the working tenant in the header to see another tenant's.",
  },
  "Customerinital":[
    {
      id:1,
      name:"AML API TEST",
      email:"aml.api.test@example.com",
      References:"REF-Api-test1",
      channel:"OTC Retail",
      type:"Individual",
      verification:"Pending",
      risk:"Medium",
      source:"Api",
      created:"26 oct,17:01",
      extra:"api:aml_live_OI388k",
      authorised:"-",

    },
     {
      id: 2,
    name: "AML Test Individual",
    email: "aml.test.individual@example.com",
    reference: "IND-TEST-2",
    channel: "OTC Retail",
    type: "Individual",
    verification: "Pending",
    risk: "High",
    source: "Portal",
    created: "25 Oct, 00:42",
    extra: "fatstlife@gmail.com",
    authorised: "—",

    },
    {
          id: 3,
    name: "AML Test Business Pty Ltd",
    email: "aml.test.business@example.com",
    reference: "ABN 51824753556",
    channel: "OTC Retail",
    type: "Business",
    verification: "Pending",
    risk: "Medium",
    source: "Portal",
    created: "25 Oct, 00:36",
    extra: "shaikh.aamir@perceptionsystem.in",
    authorised: "—",
    },
    

  ],

  "parameterCategory":{
    "heading": " Master Parameter Categories",
    "description":"The channel and product groups master parameters belong to, e.g. OTC, WHSL, ONL, GLOBAL, REM, BUL.",
  },
  "ParameterCategoryList": [
    {
    id: 1,
    code: "OTC",
    category: "OTC channel",
    description:
      "Face-to-face individual and sole-trader transactions at the counter.",
    parameters:0,
    status: "Active",
  },
  {
    id: 2,
    code: "WHSL",
    category: "Wholesale channel",
    description:
      "Offline B2B orders from licensed FX bureaux, financial institutions and corporate clients, incl. trading profiles and authorised persons.",
    parameters: 0,
    status: "Active",
  },
  {
    id: 3,
    code: "ONL",
    category: "Online channel",
    description:
      "Money2Travel online orders by verified Australian individuals, paid by PayID.",
    parameters: 0,
    status: "Active",
  },
  {
    id: 4,
    code: "GLOBAL",
    category: "Global — all channels",
    description:
      "Regulatory deadlines, programme reviews, record keeping, training and audit across all channels.",
    parameters: 0,
    status: "Active",
  },
  {
    id: 5,
    code: "REM",
    category: "PRD-REM Remittance",
    description:
      "Cross-border remittance product (designated service: value transfer).",
    parameters: 0,
    status: "Active",
  },
  {
    id: 6,
    code: "BUL",
    category: "PRD-BUL Bullion",
    description:
      "Bullion dealing product (buying and selling precious metals).",
    parameters: 0,
    status: "Active",
  },
  ],
  

"alerts": [
    {
      "id": "A-2291",
      "rule": "Sanctions Screening Hit",
      "ruleCode": "OT005",
      "channel": "OTC Retail",
      "product": "PRD-FX",
      "customer": "R. Halvorsen",
      "outcome": "Block",
      "raised": "22 October",
      "caseId": "Case-1002"
    },
    {
      "id": "A-2290",
      "rule": "Large Aggregated Transfer",
      "ruleCode": "WH007",
      "channel": "Wholesale B2B",
      "product": "PRD-FX",
      "customer": "Meridian Trading Ltd",
      "outcome": "Escalate",
      "raised": "22 October",
      "caseId": "Case-1001"
    },
    {
      "id": "A-2289",
      "rule": "Login Anomaly + Transfer",
      "ruleCode": "ON013",
      "channel": "OTC Retail",
      "product": "PRD-FX",
      "customer": "customer_8827",
      "outcome": "Escalate",
      "raised": "22 October",
      "caseId": "Case-1001"
    },
    {
      "id": "A-2288",
      "rule": "Structuring Pattern",
      "ruleCode": "OT002",
      "channel": "OTC Retail",
      "product": "PRD-FX",
      "customer": "J. Osei",
      "outcome": "Review",
      "raised": "22 October",
      "caseId": "Case-1003"
    },
    {
      "id": "A-2287",
      "rule": "UBO Risk Score Threshold",
      "ruleCode": "WH008",
      "channel": "Wholesale B2B",
      "product": "PRD-FX",
      "customer": "Northgate Holdings",
      "outcome": "Review",
      "raised": "22 October",
      "caseId": null
    },
    {
      "id": "A-2286",
      "rule": "PEP Match on Onboarding",
      "ruleCode": "OT004",
      "channel": "OTC Retail",
      "product": "PRD-FX",
      "customer": "S. Marlow",
      "outcome": "Review",
      "raised": "22 October",
      "caseId": null
    },
    {
      "id": "A-2285",
      "rule": "Bullion TTR Cash Threshold",
      "ruleCode": "OT018",
      "channel": "OTC Retail",
      "product": "PRD-BUL",
      "customer": "A. Petrov",
      "outcome": "Escalate",
      "raised": "22 October",
      "caseId": null
    }
  ],
  "alertFilters": [
    "All",
    "Block",
    "Escalate",
    "Review"
  ],
  "alertSummary": [
    {
      "title": "Pass",
      "count": "-",
      "label": "Not yet Recorded",
      "color": "Green"
    },
    {
      "title": "Review",
      "count": 3,
      "label": "alert",
      "color": "Orange"
    },
    {
      "title": "Escalate",
      "count": 3,
      "label": "alert",
      "color": "yellow"
    }
  ],
  "cases": [
    {
      "id": "Case-1002",
      "rule": "Sanctions Screening Hit",
      "alert": "A-2291",
      "customer": "R.Halvorsen",
      "channel": "OTC",
      "outcome": "Block",
      "status": "open",
      "checklistdone": 8,
      "checklistTotal": 8,
      "opened": "23 Oct 23:16",
      "nextstep": "All Steps Completed"
    },
    {
      "id": "Case-1001",
      "rule": "Large Aggregated Transfer",
      "alert": "A-2290",
      "customer": "Meredien Trading Ltd",
      "channel": "Wholesale B2B",
      "outcome": "Escalate",
      "status": "open",
      "checklistdone": 0,
      "checklistTotal": 6,
      "opened": "22 Oct 23:16",
      "nextstep": "Complete checklist"
    }
  ],
  "caseFilters": [
    "All",
    "open",
    "In review",
    "Pending senior Manager decision",
    "Closed-No action",
    "Closed-SMR filed",
    "Closed-Relationship Terminated"
  ],
  "notifications": [
    {
      "id": 1,
      "title": "High-risk transaction flagged",
      "description": "A cross-border transfer requires analyst review.",
      "time": "8 min ago",
      "read": false
    },
    {
      "id": 2,
      "title": "Rule configuration updated",
      "description": "The sanctions screening rule was updated successfully.",
      "time": "42 min ago",
      "read": false
    },
    {
      "id": 3,
      "title": "Daily monitoring complete",
      "description": "All scheduled monitoring checks have finished.",
      "time": "2 hours ago",
      "read": true
    }
  ],
  "pageNames": {
    "/": "Dashboard",
    "/dashboard": "Dashboard",
    "/channel-config": "Channel Config",
    "/products": "Products",
    "/CDD_onbording":"CDD_onbording",
    "/parameters": "Parameters",
    "/rule-builder": "Rule Builder",
    "/resolution": "Resolution Requirements",
    "/alerts": "Alerts",
    "/cases": "Cases",
    "/parameterCategory": "Parameter Categories",
    "/currencies": "Currencies",
    "/master-parameters": "Master Parameters",
    "/configuration": "Configuration",
    "/tenants": "Tenants",
    "/order":"Orders",
    "/Customer": "Customers"

  },
  "navigation": [
    {
      "title": "OVERVIEW",
      "items": [
        {
          "to": "/api-reference",
          "icon": "▣",
          "label": "API Reference"
        },
        {
          "to": "/parameters-reference",
          "icon": "▤",
          "label": "Parameters Reference"
        }
      ]
    },
    {
      "title": "RULE ENGINE",
      "items": [
        {
          "to": "/channel-config",
          "icon": "☷",
          "label": "Channel Config"
        },
        {
          "to": "/products",
          "icon": "⬡",
          "label": "Products"
        },
        {
           "to": "/CDD_onbording",
          "icon": "☷",
          
          "label": "CDD_onbording"

        },
        {
          "to": "/parameters",
          "icon": "▤",
          "label": "Parameters"
        },
        {
          "to": "/rule-builder",
          "icon": "⬡",
          "label": "Rule Builder"
        },
        {
          "to": "/resolution",
          "icon": "☷",
          "label": "Resolution Requirements"
        },
        {
          "to": "/alerts",
          "icon": "△",
          "label": "Alerts"
        },
        {
          "to": "/cases",
          "icon": "▢",
          "label": "Cases"
        }
      ]
    },
    {
      "title": "SETTINGS & CONFIGURATION",
      "items": [
        {
          "to": "/currencies",
          "icon": "◎",
          "label": "Currencies"
        },
        {
          "to": "/master-parameters",
          "icon": "♧",
          "label": "Master Parameters"
        },
        {
          "to": "/parameter-categories",
          "icon": "♧",
          "label": "Parameter Categories"
        },
        {
          "to": "/configuration",
          "icon": "☷",
          "label": "Configuration"
        }
      ]
    },
    {
      "title": "TENANT MANAGEMENT",
      "items": [
        {
          "to": "/tenants",
          "icon": "▥",
          "label": "Tenants"
        },
        {
          "to":"/Customer",
           "icon":"♙",
          "label":"Customer"
        },
        {
          "to":"/Orders",
          "icon":"▤",
          "label":"Orders"
        },
        {

          "to":"/APIs-Keys",
          "icon":"⌘",
          "label":"APIs-Keys"
        }
      ]
    },
    {
      "title":"USER MANAGEMENT",
      "items":[
        {
          "to":"/Users",
          "icon":"♟",
          "label":"Users"
        },
        {
          "to":"/Roles",
          "icon":"⚙",
          "label":"Roles"
        },
        {
          "to":"/Permissions",
          "icon":"✓",
          "label":"Permissions"
        }
      ]
    }
   
  ]
};

export const portal = portalData.portal;
export const dashboardData = portalData.dashboard;
export const channels = portalData.channels;
export const channelTabs = portalData.channelTabs;
export const products = portalData.products;
export const productChannels = portalData.productChannels;
export const parameterProducts = portalData.parameterProducts;
export const parameters = portalData.parameters;
export const CDD_onbording=portalData.CDD_onbording;
export const Currencies=portalData.Currencies;
export const currencyList=portalData.currencyList;
export const rules = portalData.rules;
export const ruleBuilder = portalData.ruleBuilder;
export const resolution = portalData.resolution;
export const alerts = portalData.alerts;
export const alertFilters = portalData.alertFilters;
export const alertSummary = portalData.alertSummary;
export const cases = portalData.cases;
export const Order = portalData.Order;
export const caseFilters = portalData.caseFilters;
export const notifications = portalData.notifications;
export const pageNames = portalData.pageNames;
export const navigation = portalData.navigation;
export const parameterCategory=portalData.parameterCategory;
export const ParameterCategoryList=portalData.ParameterCategoryList;
export const Customer=portalData.Customer;
export const Customerinital=portalData.Customerinital;


export const initialDocuments = channelDocuments;
