import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import TimePicker from 'react-time-picker'

interface Props {
    placeholder: string;
    name: string;
}

export default function MyTimePicker(props: Props) { // partial=semua properti jadi optional
    const [field, meta, helpers] = useField(props.name!); // hooks bawaan formit
    return (
        // <Form.Field error={meta.touched && !!meta.error}>
            <div>
            <TimePicker
            
            />
            </div>
            // {meta.touched && meta.error ? (
            //     <Label basic color='red'>{meta.error}</Label>
            // ) : null}
        // </Form.Field>
    )
}