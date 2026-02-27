import frappe
from frappe.utils import flt
from erpnext.stock.doctype.pick_list.pick_list import PickList as ERPNextPickList

class PickList(ERPNextPickList):

    def set_item_locations(self, *args, **kwargs):
        # Run ERPNext original logic
        super().set_item_locations(*args, **kwargs)

        # Remove fully picked items (qty <= 0)
        self.locations = [row for row in self.locations if flt(row.qty) > 0]

    def validate(self):
        super().validate()

        for row in self.locations:
            custom_qty = flt(row.custom_custom_qty)
            qty = flt(row.qty)

            if custom_qty != qty:
                frappe.throw(
                    f"Row {row.idx}: Custom Qty must equal to the Qty."
                )
