import React, { Component } from 'react';
import { mobservableForm } from 'mobservable-form';

import BootstrapInput from './BootstrapInput.js';

class BootstrapExampleForm extends Component {
  static propTypes = {
    handleSubmit: React.PropTypes.func.isRequired,
    resetForm: React.PropTypes.func.isRequired,
    fields: React.PropTypes.object.isRequired
  }
  render() {
    const {
      handleSubmit,
      resetForm,
      fields: {
        text,
        email
      }
    } = this.props;

    return <form noValidate onSubmit={handleSubmit}>
      <BootstrapInput type="text" field={text} placeholder="Text..."/>
      <BootstrapInput type="email" field={email} placeholder="Email..."/>
      <div className="form-group">
        <button className="btn btn-primary">Submit</button>
        <button className="btn btn-default" type="button" onClick={resetForm}>
          Reset
        </button>
      </div>
    </form>;
  }
}

export default mobservableForm({
  form: 'bs_example',
  fields: ['text', 'email'],
  validate: ({ text, email }) => {
    const errors = {};

    if (text.length < 10) {
      errors.text = 'Must be at least 10 characters';
    }

    if (!email) {
      errors.email = 'Must supply an email';
    }

    return errors;
  }
})(BootstrapExampleForm);
