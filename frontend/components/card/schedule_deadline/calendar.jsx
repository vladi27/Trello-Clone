import React from "react";
import { Grid } from "@material-ui/core";
import { Formik, Form, Field, useFormik } from "formik";
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
        onChange={(date) => form.setFieldValue(field.name, date, true)}
        {...other}
      />
    </MuiPickersUtilsProvider>
  );
};

const TrelloCalendar = (props) => {
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
                justifyContent: "center",
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
