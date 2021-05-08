import React from "react";
// import Code from "../../_shared/Code";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field, useFormik } from "formik";
import { KeyboardDateTimePicker } from "@material-ui/pickers";
import MomentUtils from "@date-io/moment";
import {
  DatePicker,
  TimePicker,
  DateTimePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import CalendarValue from "./values";
import DateFnsUtils from "@date-io/date-fns";

const DatePickerField = ({ field, form, ...other }) => {
  const currentError = form.errors[field.name];

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <DateTimePicker
        clearable
        disablePast
        name={field.name}
        value={field.value}
        format="yyyy/MM/dd hh:mm a"
        helperText={currentError}
        error={Boolean(currentError)}
        onError={(error) => {
          // handle as a side effect
          if (error !== currentError) {
            form.setFieldError(field.name, error);
          }
        }}
        // if you are using custom validation schema you probably want to pass `true` as third argument
        onChange={(date) => form.setFieldValue(field.name, date, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const TrelloCalendar = (props) => {
  //   const formik = useFormik({
  //     initialValues: {
  //       date: new Date(),
  //     },
  //     onSubmit: (values) => {
  //       console.log(JSON.stringify(values, null, 2));
  //     },
  //   });
  return (
    <Formik initialValues={{ date: new Date() }}>
      {({ values, errors }) => (
        <Form>
          <Grid container>
            <Grid
              item
              container
              justify="center"
              xs={12}
              style={{ marginTop: "10px" }}
            >
              <Field name="date" component={DatePickerField} />
            </Grid>

            <Grid
              item
              xs={12}
              sm={12}
              style={{
                marginLeft: "313px",
                marginTop: "5px",
                justify: "center",
              }}
            >
              <CalendarValue
                children={JSON.stringify({ errors, values }, null, 2)}
                card={props.card}
                editCard={props.editCard}
              />
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  );
};

export default TrelloCalendar;

// import React from "react";
// import Code from "../../_shared/Code";
// import { Grid } from "@material-ui/core";
// import { Formik, Form, Field } from "formik";
// import { KeyboardDatePicker } from "@material-ui/pickers";

// const DatePickerField = ({ field, form, ...other }) => {
//   const currentError = form.errors[field.name];

//   return (
//     <KeyboardDatePicker
//       clearable
//       disablePast
//       name={field.name}
//       value={field.value}
//       format="dd/MM/yyyy"
//       helperText={currentError}
//       error={Boolean(currentError)}
//       onError={(error) => {
//         // handle as a side effect
//         if (error !== currentError) {
//           form.setFieldError(field.name, error);
//         }
//       }}
//       // if you are using custom validation schema you probably want to pass `true` as third argument
//       onChange={(date) => form.setFieldValue(field.name, date, false)}
//       {...other}
//     />
//   );
// };

// const FormikExample = () => {
//   return (
//     <Formik onSubmit={console.log} initialValues={{ date: new Date() }}>
//       {({ values, errors }) => (
//         <Form>
//           <Grid container>
//             <Grid item container justify="center" xs={12}>
//               <Field name="date" component={DatePickerField} />
//             </Grid>

//             <Grid item xs={12} sm={12} style={{ margin: "24px" }}>
//               <Code children={JSON.stringify({ errors, values }, null, 2)} />
//             </Grid>
//           </Grid>
//         </Form>
//       )}
//     </Formik>
//   );
// };

// export default FormikExample;
