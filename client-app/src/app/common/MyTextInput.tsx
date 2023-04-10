import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    label?: string;
    type?: string;
}

export default function MyTextInput(props: Props) {
    const [field, meta] = useField(props.name); // hooks bawaan formit
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {/* // apakah field udah ditouch dan tidak ada error object, klo iya jadi warna pink. !! berarti jadi boolean*/}
            <label>{props.label}</label> 
            <input {...field} {...props}/>
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}