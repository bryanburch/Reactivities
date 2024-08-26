import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";

interface Props {
    placeholder: string;
    name: string;
    rows: number;
    label?: string;
}

const MyTextArea = (props: Props) => {
    // custom hook provided by Formik package
    const [field, meta] = useField(props.name);

    return (
        // double exclamation before an object casts it to a bool
        <Form.Field error={meta.touched && !!meta.error}>
            <label>{props.label}</label>
            <textarea {...field} {...props} />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
export default MyTextArea