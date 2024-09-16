# Copyright (c) 2024, SHREE RAKHI and contributors
# For license information, please see license.txt

import frappe
from frappe import _



def execute(filters=None):
    columns, data = [], []
    columns = get_columns()
    data = get_data(filters)
    
    return columns, data

def get_columns():
    return [
        {"label": _("Item Code"), "fieldname": "item_code", "fieldtype": "Link", "options": "Item"},
        {"label": _("Parent Warehouse"), "fieldname": "parent_warehouse", "fieldtype": "Link", "options": "Warehouse"},
        {"label": _("Child Warehouse"), "fieldname": "child_warehouse", "fieldtype": "Link", "options": "Warehouse"},
        {"label": _("Quantity"), "fieldname": "quantity", "fieldtype": "Float"}
    ]

def get_data(filters):
    data = frappe.db.sql("""
        SELECT 
            warehouse.parent_warehouse AS parent_warehouse,
            bin.warehouse AS child_warehouse,
            bin.item_code,
            SUM(bin.actual_qty) AS quantity
        FROM 
            `tabBin` AS bin
        JOIN 
            `tabWarehouse` AS warehouse ON bin.warehouse = warehouse.name
        WHERE 
            warehouse.parent_warehouse = %s OR warehouse.name = %s
        GROUP BY 
            bin.item_code, bin.warehouse
        """, (filters.get('warehouse'), filters.get('warehouse')), as_dict=True)
    
    return data