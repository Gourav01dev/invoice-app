import React from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { updateInvoiceFields } from "../utils/calculations";

function InvoiceForm({ formData, setFormData, onSubmit, isEditing }) {
  const handleChange = (field, value) => {
    const dataWithChange = {
      qty: field === "qty" ? value : formData.qty,
      price: field === "price" ? value : formData.price,
      discountPercent: field === "discountPercent" ? value : formData.discountPercent,
      discount: field === "discount" ? value : formData.discount,
      taxPercent: field === "taxPercent" ? value : formData.taxPercent,
      tax: field === "tax" ? value : formData.tax,
      total: field === "total" ? value : formData.total,
      changed: field
    };

    const updated = updateInvoiceFields(dataWithChange);
    setFormData(updated);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Invoice Form</Text>
      
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Quantity</Text>
        <TextInput
          style={styles.input}
          value={formData.qty}
          onChangeText={(value) => handleChange("qty", value)}
          keyboardType="numeric"
          placeholder="Enter quantity"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Price</Text>
        <TextInput
          style={styles.input}
          value={formData.price}
          onChangeText={(value) => handleChange("price", value)}
          keyboardType="numeric"
          placeholder="Enter price"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Discount %</Text>
        <TextInput
          style={styles.input}
          value={formData.discountPercent}
          onChangeText={(value) => handleChange("discountPercent", value)}
          keyboardType="numeric"
          placeholder="Enter discount percentage"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Discount</Text>
        <TextInput
          style={styles.input}
          value={formData.discount}
          onChangeText={(value) => handleChange("discount", value)}
          keyboardType="numeric"
          placeholder="Enter discount amount"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tax %</Text>
        <TextInput
          style={styles.input}
          value={formData.taxPercent}
          onChangeText={(value) => handleChange("taxPercent", value)}
          keyboardType="numeric"
          placeholder="Enter tax percentage"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Tax</Text>
        <TextInput
          style={styles.input}
          value={formData.tax}
          onChangeText={(value) => handleChange("tax", value)}
          keyboardType="numeric"
          placeholder="Enter tax amount"
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Total Price</Text>
        <TextInput
          style={styles.input}
          value={formData.total}
          onChangeText={(value) => handleChange("total", value)}
          keyboardType="numeric"
          placeholder="Enter total price"
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={onSubmit}>
        <Text style={styles.buttonText}>{isEditing ? "Update Invoice" : "Create Invoice"}</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f5f5f5",
    borderRadius: 8,
    marginBottom: 20
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center"
  },
  fieldContainer: {
    marginBottom: 16
  },
  label: {
    fontSize: 16,
    fontWeight: "600",
    marginBottom: 8,
    color: "#333"
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 6,
    padding: 12,
    fontSize: 16,
    backgroundColor: "#fff"
  },
  button: {
    backgroundColor: "#007AFF",
    padding: 14,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 8
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600"
  }
});

export default InvoiceForm;