import { observer } from "mobx-react-lite";
import { Document, PDFDownloadLink, Page, Text,View,StyleSheet } from '@react-pdf/renderer';
import { useStore } from "../../app/stores/store";

const styles = StyleSheet.create({
  table: { 
    width: "auto", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderRightWidth: 0, 
    borderBottomWidth: 0 ,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  }, 
  tableRow: { 
    margin: "auto", 
    flexDirection: "row" 
  }, 
  tableCol: { 
    width: "20%", 
    borderStyle: "solid", 
    borderWidth: 1, 
    borderLeftWidth: 0, 
    borderTopWidth: 0 
  }, 
  tableCell: { 
    margin: "auto", 
    marginTop: 5, 
    fontSize: 10 
  }
});

export default observer(function PdfFile(){
  const {reserveStore} = useStore();
  const {filteredReservations} = reserveStore;

    return (
      <PDFDownloadLink document={
          <Document>
            <Page>
              <View style={styles.table}> 
                <View style={styles.tableRow}> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Tanggal</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Jam</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Ruangan</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Pemakai</Text> 
                  </View>
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>Kegiatan</Text> 
                  </View>  
                </View>
                {filteredReservations.map(reservation => (
                <View style={styles.tableRow} key={reservation.id}> 
                  
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{`${new Date(reservation.dateTime).getDate()}/${new Date(reservation.dateTime).getMonth()+1}/${new Date(reservation.dateTime).getFullYear()}`}</Text> 
                  </View> 
                  <View style={styles.tableCol}>
                    <Text style={styles.tableCell}>{`${new Date(reservation.dateTime).getHours()}:00 - ${new Date(reservation.endDateTime).getHours()}:00`}</Text> 
                  </View>
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{reservation.roomName}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{`${reservation.username}(${reservation.phoneNumber})`}</Text> 
                  </View> 
                  <View style={styles.tableCol}> 
                    <Text style={styles.tableCell}>{reservation.purpose}</Text> 
                  </View> 
                </View> 
                ))}
              </View>
            </Page>
          </Document>
      } fileName="form">
      {({loading}) => (loading ? <button disabled={true}>Loading Document...</button> : <button>Download pdf</button> )}
      </PDFDownloadLink>
          
      );
})