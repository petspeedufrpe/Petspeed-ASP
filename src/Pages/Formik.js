import React from 'react';
import {
  SafeAreaView,
  TextInput,
  Button,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import {Formik} from 'formik';

export default () => (
  <SafeAreaView style={styles.safeAreaStyle}>
    <Formik
      initialValues={{name: ''}}
      onSubmit={(values, actions) => {
        alert(JSON.stringify(values));
        setTimeout(() => {
          actions.setSubmitting(false);
        }, 1000);
      }}>
      {formikProps => (
        <React.Fragment>
          <TextInput
            style={styles.input}
            onChangeText={formikProps.handleChange('name')}
          />
          {formikProps.isSubmitting ? (
            <ActivityIndicator />
          ) : (
            <Button title="Submit" onPress={formikProps.handleSubmit} />
          )}
        </React.Fragment>
      )}
    </Formik>
  </SafeAreaView>
);
const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: 'black',
    padding: 10,
    marginBottom: 3,
  },
  safeAreaStyle: {
    marginTop: 90,
  },
});
