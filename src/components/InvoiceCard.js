import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

function InvoiceCard({ item, index, onEdit }) {
  return (
    <View style={styles.card}>
      <Text style={styles.cardTitle}>Invoice #{index + 1}</Text>
      <View style={styles.row}>
        <Text style={styles.label}>Qty:</Text>
        <Text style={styles.value}>{item.qty || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Price:</Text>
        <Text style={styles.value}>{item.price || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Discount %:</Text>
        <Text style={styles.value}>{item.discountPercent || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Discount:</Text>
        <Text style={styles.value}>{item.discount || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax %:</Text>
        <Text style={styles.value}>{item.taxPercent || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Tax:</Text>
        <Text style={styles.value}>{item.tax || "0"}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.label}>Total:</Text>
        <Text style={styles.value}>{item.total || "0"}</Text>
      </View>
      <TouchableOpacity style={styles.editButton} onPress={() => onEdit(index)}>
        <Text style={styles.editButtonText}>Edit</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: "#fff",
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#e0e0e0",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 12,
    color: "#333"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8
  },
  label: {
    fontSize: 14,
    color: "#666"
  },
  value: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333"
  },
  editButton: {
    backgroundColor: "#FF9500",
    padding: 10,
    borderRadius: 6,
    alignItems: "center",
    marginTop: 12
  },
  editButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600"
  }
});

export default InvoiceCard;

