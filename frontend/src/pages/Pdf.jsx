import { StyleSheet, View, Document, Page, Text } from '@react-pdf/renderer';

export const ConvertirPDF = ({ data }) => {

    const styles = StyleSheet.create({
        page: {
            padding: 40,
            fontSize: 11,
            fontFamily: "Helvetica",
            backgroundColor: "#F8F9FA",
            color: "#333",

        },

        // HEADER
        header: {
            marginBottom: 25,
            borderBottomWidth: 1,
            borderBottomColor: "#D1D5DB",
            paddingBottom: 10,
        },

        title: {
            fontSize: 24,
            fontWeight: "bold",
            textAlign: "center",
            color: "#111827",
            letterSpacing: 1,
        },

        subtitle: {
            marginTop: 5,
            textAlign: "center",
            color: "#6B7280",
            fontSize: 10,
        },

        // TABLA
        table: {
            width: "100%",
            marginTop: 20,
            borderWidth: 1,
            borderColor: "#E5E7EB",
            borderRadius: 4,
        },

        tableHeader: {
            flexDirection: "row",
            backgroundColor: "#2563EB",
            color: "#fff",
            padding: 10,
            fontWeight: "bold",
        },

        row: {
            flexDirection: "row",
            borderBottomWidth: 1,
            borderBottomColor: "#E5E7EB",
            padding: 10,
            alignItems: "center",
        },

        rowEven: {
            backgroundColor: "#F3F4F6",
        },

        colId: {
            width: "20%",
        },

        colName: {
            width: "50%",
        },

        colQty: {
            width: "30%",
            textAlign: "right",
        },

        footer: {
            position: "absolute",
            bottom: 20,
            left: 40,
            right: 40,
            textAlign: "center",
            fontSize: 9,
            color: "#9CA3AF",
        },


    });

    return (
        <Document> {/* Contenedor principal del PDF */}
            <Page size="A4" style={styles.page}> {/* Define una página del PDF */}

                {/*Header*/}
                <View style={styles.header}> {/* Como un div de HTML. Agrupa elementos */}
                    <Text style={styles.title}>HOJA DE PEDIDO</Text>
                    <Text style={styles.subtitle}>
                        Resumen de productos solicitados
                    </Text>
                </View>

                {/* TABLA */}
                <View style={styles.table}>

                    {/* CABECERA */}
                    <View style={styles.tableHeader}>
                        <Text style={styles.colId}>ID</Text>
                        <Text style={styles.colName}>Producto</Text>
                        <Text style={styles.colQty}>Cantidad</Text>
                    </View>

                    {/* FILAS */}
                    {data.map((item, index) => (
                        <View
                            key={item.id}
                            style={[
                                styles.row,
                                index % 2 === 0 && styles.rowEven,
                            ]}
                        >
                            <Text style={styles.colId}>{item.id}</Text>
                            <Text style={styles.colName}>{item.name}</Text>
                            <Text style={styles.colQty}>{item.quantity} uds
                            </Text>
                        </View>
                    ))}
                </View>

                {/* FOOTER */}
                <Text style={styles.footer}>
                    LabStock Control
                </Text>
            </Page>
        </Document>
    );
};