import { useField } from "formik";
import moment from "moment";
import { Form, Label, Select } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    options: any;
    label?: string;
}

export default function MySelectInput(props: Props) {
    const [field, meta, helpers] = useField(props.name); // hooks bawaan formit. helpers bisa manually set value & touch status
    return (
        <Form.Field error={meta.touched && !!meta.error}>
            {/* // apakah field udah ditouch dan tidak ada error object, klo iya jadi warna pink. !! berarti jadi boolean*/}
            <label>{props.label}</label> 
            <Select
                clearable
                options ={props.options}
                value={field.value || null}
                onChange={(e, d) => {
                    helpers.setValue(d.value)
                }}
                onBlur={() => helpers.setTouched(true)}
                placeholder={props.placeholder}
            />
            {meta.touched && meta.error ? (
                <Label basic color='red'>{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}