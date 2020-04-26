var id = x => x
var toText = x => document.createTextNode(x);
var compose = (f,g) => (...x) => f(g(...x))

// Status
PENDING    =              0;
REPLIED    = PENDING    + 1;
FULFILLING = REPLIED    + 1;
FULFILLED  = FULFILLING + 1;

STATUS_NAMES = ["Pending", "Replied", "Fulfilled", "Fulfilling"];
STATUS_NAME = x => STATUS_NAMES[x];

// Fields
TABLE_FIELDS = {
    "id": {
        "name": "id",
        "generate": null,
        "show": "ID",
        "transform": toText,

        "sql": " INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL"
    },
    "timestamp": {
        "name": "timestamp",
        "generate": () => Date.now(),
        "show": "Date",
        "transform": x => toText((new Date(x)).toLocaleString()),

        "sql": " INTEGER NOT NULL"
    },
    "status": {
        "name": "status",
        "generate": () => PENDING,
        "show": "Status",
        "transform": null, // compose(toText, STATUS_NAME),

        "sql": " INTEGER NOT NULL"
    },
    "name": {
        "name": "name",
        "generate": id,
        "show": "Name",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "institution_name": {
        "name": "institution_name",
        "generate": id,
        "show": "Institution Name",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "contact_email": {
        "name": "contact_email",
        "generate": id,
        "show": "Contact Email",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "contact_number": {
        "name": "contact_number",
        "generate": id,
        "show": "Contact Number",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "regular_use": {
        "name": "regular_use",
        "generate": x => x == "true",
        "show": "Regular Use?",
        "transform": x => toText((x == 1).toString()),

        "sql": " INTEGER NOT NULL"
    },
    "shields_minimum": {
        "name": "shields_minimum",
        "generate": parseInt,
        "show": "Minimum Shields",
        "transform": x => toText(x.toString()),

        "sql": " INTEGER NOT NULL"
    },
    "shields_ideal": {
        "name": "shields_ideal",
        "generate": parseInt,
        "show": "Ideal Shields",
        "transform": x => toText(x.toString()),

        "sql": " INTEGER NOT NULL"
    },
    "delivery_address": {
        "name": "delivery_address",
        "generate": id,
        "show": "Delivery Address",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "delivery_instructions": {
        "name": "delivery_instructions",
        "generate": id,
        "show": "Delivery Instructions",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "why_need": {
        "name": "why_need",
        "generate": id,
        "show": "What for?",
        "transform": toText,

        "sql": " TEXT NOT NULL"
    },
    "reuse": {
        "name": "reuse",
        "generate": x => x == "true",
        "show": "Reuse?",
        "transform": x => toText((x == 1).toString()),

        "sql": " INTEGER NOT NULL"
    },
    "extranote": {
        "name": "extranote",
        "generate": id,
        "show": "Extra Notes",
        "transform": x => toText(x == null ? "(None)" : x),

        "sql": " TEXT"
    },
}

module.exports = {
    PENDING, REPLIED, FULFILLING, FULFILLED, STATUS_NAMES,
    TABLE_FIELDS
}
