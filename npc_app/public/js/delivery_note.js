frappe.ui.form.on("Delivery Note", {
    onload(frm) {
        // Only run when DN is created from Pick List
        if (!frm.doc.pick_list) return;

        frappe.db.get_value(
            "Pick List",
            frm.doc.pick_list,
            ["custom_transporter_name_", "custom_vehicle_no"],
            (r) => {
                if (!r) return;

                // Set Transporter
                if (r.custom_transporter_name_ && !frm.doc.transporter) {
                    frm.set_value("transporter", r.custom_transporter_name_);
                }

                // Set Vehicle No (More Info section)
                if (r.custom_vehicle_no && !frm.doc.vehicle_no) {
                    frm.set_value("vehicle_no", r.custom_vehicle_no);
                }

                frm.refresh_fields(["transporter", "vehicle_no"]);
            }
        );
    }
});
