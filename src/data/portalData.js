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
export const caseFilters = portalData.caseFilters;
export const notifications = portalData.notifications;
export const pageNames = portalData.pageNames;
export const navigation = portalData.navigation;

export const initialDocuments = channelDocuments;
