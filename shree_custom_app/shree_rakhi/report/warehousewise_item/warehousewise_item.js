// Copyright (c) 2024, SHREE RAKHI and contributors
// For license information, please see license.txt

frappe.query_reports["Warehousewise Item"] = {
	"filters": [
		{
            "fieldname":"company",
            "label": __("Company"),
            "fieldtype": "Link",
            "options": "Company",
            "default": frappe.defaults.get_user_default("Company"),
            "reqd":0
         },
		 {
            "fieldname":"warehouse",
            "label": __("Warehouse"),
            "fieldtype": "Link",
            "options": "Warehouse",
            "reqd":0
         }
	]
};

