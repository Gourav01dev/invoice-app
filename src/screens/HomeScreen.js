import React, { useState } from "react";
import { ScrollView, View } from "react-native";
import InvoiceForm from "../components/InvoiceForm";
import InvoiceCard from "../components/InvoiceCard";

function HomeScreen() {

  const [formData, setFormData] = useState({
    qty: "",
    price: "",
    discountPercent: "",
    discount: "",
    taxPercent: "",
    tax: "",
    total: ""
  });

  const [invoices, setInvoices] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null);

  const resetForm = () => {
    setFormData({
      qty: "",
      price: "",
      discountPercent: "",
      discount: "",
      taxPercent: "",
      tax: "",
      total: ""
    });
  };

  const handleSubmit = () => {
    if (editingIndex !== null) {
      const updated = [...invoices];
      updated[editingIndex] = formData;
      setInvoices(updated);
      setEditingIndex(null);
    } else {
      setInvoices([...invoices, formData]);
    }

    resetForm();
  };

  const handleEdit = (index) => {
    setFormData(invoices[index]);
    setEditingIndex(index);
  };

  return (
    <ScrollView style={{ padding: 20 }}>
      <InvoiceForm 
        formData={formData} 
        setFormData={setFormData} 
        onSubmit={handleSubmit}
        isEditing={editingIndex !== null}
      />

      {invoices.length > 0 && (
        <View style={{ flexDirection: "row", flexWrap: "wrap", justifyContent: "space-between" }}>
          {invoices.map((item, index) => (
            <View key={index} style={{ width: "48%", marginBottom: 16 }}>
              <InvoiceCard item={item} index={index} onEdit={handleEdit} />
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
}

export default HomeScreen;