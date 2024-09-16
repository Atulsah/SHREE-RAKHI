// Copyright (c) 2024, SHREE RAKHI and contributors
// For license information, please see license.txt

// frappe.ui.form.on("Shree Job Card", {
// 	refresh(frm) {

// 	},
// });

frappe.ui.form.on("Shree Job Card", "validate", function(frm, cdt, cdn) { 
    var total_rcv = 0;
	$.each(frm.doc.table_receiving_details || [], function(i, d) {
		total_rcv += parseFloat(d.quantity);
	})
   frm.set_value("total_received",parseFloat(total_rcv));
   
   frm.set_value("total_due",parseFloat(frm.doc.quantity - total_rcv));
  
});



// FUNCTION FOR SETTING ITEM CODE IN CHILD TABLE FIELD



frappe.ui.form.on('Shree Job Card', {
	refresh(frm) {

        // Loop through every Child Document...    
	    frm.doc.table_receiving_details.forEach(child_doc => {
            // for each found, set corr = target - meas.
	        child_doc.item_code = frm.doc.item_code
	    });
        // ask the web page to show the latest values:
	    refresh_field('table_receiving_details');
	}
});






// function for calculation of total amount

frappe.ui.form.on('Shree Job Card', {
    refresh: function (frm) {
        // This function will run on form refresh
    },
    no_of_touchpoints: function (frm) {
        // Triggered when no_of_touchpoints is changed
        update_multiplication(frm);
    },
    rate_per_touchpoint: function (frm) {
        // Triggered when rate_per_touchpoint is changed
        update_multiplication(frm);
    }
});

function update_multiplication(frm) {
    // Get values from fields 'fieldname_a' and 'fieldname_b'
    var a = cur_frm.doc.no_of_touchpoints;
    var b = cur_frm.doc.rate_per_touchpoint;
    
    // Check if the values are not null or undefined
    if (a != null && b != null) {
        // Multiply values and assign to 'fieldname_c'
        cur_frm.set_value('total_amount', a * b);
    }
}



