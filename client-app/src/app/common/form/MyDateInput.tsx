import { useField } from "formik";
import { Form, Label } from "semantic-ui-react";
import DatePicker, {DatePickerProps} from "react-datepicker";

const MyDateInput = (props: Partial<DatePickerProps>) => {
    // custom hook provided by Formik package
    const [field, meta, helpers] = useField(props.name!);

    return (
        // double exclamation before an object casts it to a bool
        <Form.Field error={meta.touched && !!meta.error}>
            <DatePicker 
                {...field}
                {...(props as any)}
                selected={(field.value && new Date(field.value)) || null}
                onChange={value => helpers.setValue(value)}
            />
            {meta.touched && meta.error ? (
                <Label basic color="red">{meta.error}</Label>
            ) : null}
        </Form.Field>
    )
}
export default MyDateInput