frappe.ui.form.on("Pick List Item", {
    custom_kg_per_bag(frm, cdt, cdn) {
        calculate_custom_qty(frm, cdt, cdn);
        calculate_custom_mt_qty(cdt, cdn);
    },

    custom_no_of_packages(frm, cdt, cdn) {
        calculate_custom_qty(frm, cdt, cdn);
        calculate_custom_mt_qty(cdt, cdn);
    },

    qty(frm, cdt, cdn) {
        calculate_custom_mt_qty(cdt, cdn);
        validate_qty(cdt, cdn);
    },

    custom_custom_qty(frm, cdt, cdn) {
        calculate_custom_mt_qty(cdt, cdn);
        validate_qty(cdt, cdn);
    },

    locations_add(frm, cdt, cdn) {
        calculate_custom_qty(frm, cdt, cdn);
        calculate_custom_mt_qty(cdt, cdn);
    }
});

frappe.ui.form.on("Pick List", {
    onload_post_render(frm) {
        frm.doc.locations.forEach(row => {
            calculate_custom_qty(frm, "Pick List Item", row.name);
            calculate_custom_mt_qty("Pick List Item", row.name);
        });
    }
});

function calculate_custom_qty(frm, cdt, cdn) {
    const row = locals[cdt][cdn];
    const kg_per_bag = flt(row.custom_kg_per_bag || 0);
    const no_of_packages = flt(row.custom_no_of_packages || 0);
    const calculated_qty = kg_per_bag * no_of_packages;

    frappe.model.set_value(cdt, cdn, "custom_custom_qty", flt(calculated_qty, 3));
}

function calculate_custom_mt_qty(cdt, cdn) {
    const row = locals[cdt][cdn];
    const qty = flt(row.qty || 0);
    const custom_mt_qty = qty / 1000;

    frappe.model.set_value(cdt, cdn, "custom_mt_qty", flt(custom_mt_qty, 3));
}

function validate_qty(cdt, cdn) {
    const row = locals[cdt][cdn];
    const qty = flt(row.qty);
    const custom_qty = flt(row.custom_custom_qty);

    if (qty && custom_qty && Math.abs(qty - custom_qty) > 0.001) {
        frappe.msgprint({
            title: __("Invalid Quantity"),
            message: __(`Row ${row.idx}: Custom Qty should be equal to Qty.`),
            indicator: "red"
        });
    }
}
