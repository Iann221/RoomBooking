import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePickker, {ReactDatePickerProps} from 'react-datepicker';

export default function MyTextInput(props: Partial<ReactDatePickerProps>) { // partial=semua properti jadi optional
    const [field, meta, helpers] = useField(props.name!); // hooks bawaan formit
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {/* // apakah field udah ditouch dan tidak ada error object, klo iya jadi warna pink. !! berarti jadi boolean*/}
            <DatePickker 
                {...field}
                {...props}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}