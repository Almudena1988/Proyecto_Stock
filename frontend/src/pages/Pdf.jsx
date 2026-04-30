import { StyleSheet, View, Document, Page, Text } from '@react-pdf/renderer';

export const ConvertirPDF = ({ data }) => {

    const styles = StyleSheet.create({
        page: {
            backgroundColor: "#ffffff",
            fontSize: "18px"

        },
    });

    return (
        <Document> {/* Contenedor principal del PDF */}
            <Page size="A4" style={styles.page}> {/* Define una página del PDF */}
                <View> {/* Como un div de HTML. Agrupa elementos */}
                    <Text style={{
                        textAlign: "center",
                        margin: "20px"
                    }}>HOJA DE PEDIDO</Text> {/* Texto plano */}
                </View>
                <View>
                    {data.map((item) => (
                        <Text style={{ margin: "15px" }} key={item.id}>
                            Item: [{item.id}] {item.name} - {item.quantity} unidades
                        </Text>
                    ))}
                </View>
            </Page>
        </Document>
    );
};