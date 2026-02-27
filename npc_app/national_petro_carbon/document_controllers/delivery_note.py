import frappe

def auto_fill_from_picklist(doc, method):
    """
    Auto-fill transporter and vehicle_no in Delivery Note
    from Pick List linked to this DN.
    """
    # Loop through items to find Pick List
    for item in doc.items:
        if item.against_pick_list:  # standard link to Pick List
            pick_list_doc = frappe.get_doc("Pick List", item.against_pick_list)

            # Map fields from Pick List to DN
            doc.transporter_name= pick_list_doc.custom_transporter_name_
            doc.vehicle_no = pick_list_doc.custom_vehicle_no

            # Only take first Pick List
            break
