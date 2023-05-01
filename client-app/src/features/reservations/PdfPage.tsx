import { observer } from "mobx-react-lite";
import PdfFile from "../pdf/PdfFile";
import { Container } from "react-bootstrap";
import DatePicker from "react-datepicker";
import { useStore } from "../../app/stores/store";

export default observer(function PdfPage(){
    const {reserveStore} = useStore();
    const {setStartFilter,setEndFilter, startFilter, endFilter} = reserveStore;

    return(
        <Container>
            <h1>Select Start Date</h1>
            <DatePicker
                selected={startFilter}
                onChange={date => setStartFilter(date)}
            ></DatePicker>
            <h1>Select End Date</h1>
            <DatePicker
                selected={endFilter}
                onChange={date => setEndFilter(date)}
            ></DatePicker>
            <hr></hr>
            <PdfFile />
        </Container> 
    )
})