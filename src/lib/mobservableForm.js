import invariant from 'invariant';
import React, { Component } from 'react';
import { observable, extendObservable, asReference, transaction } from 'mobservable';
import { observer } from 'mobservable-react';

const formStore = observable({});

function setupForm({ form, fields, validate }) {
  const fieldMap = {};

  fields.forEach(name => {
    fieldMap[name] = {
      touched: false,
      value: '',
      onChange: asReference((e) => {
        const field = formStore[form].fields[name];
        field.value = e.target.value;
      }),
      error() {
        return formStore[form].validations[name] || null;
      }
    };
  });

  extendObservable(formStore, {
    [form]: {
      fields: fieldMap,

      valueMap() {
        const valueMap = {};
        fields.forEach(name => {
          valueMap[name] = this.fields[name].value;
        });
        return valueMap;
      },

      validations() {
        return validate(this.valueMap) || {};
      }
    }
  });
}

export const reset = (form) => {
  invariant(form, 'You must supply form to reset(form)');
  invariant(formStore[form], `Form '${ form }' does not exist!`);

  transaction(() => {
    const formObj = formStore[form];
    const fields = Object.keys(formObj.fields);
    fields.forEach(name => {
      const field = formObj.fields[name];
      field.value = '';
      field.touched = false;
    });
  });
};

export const mobservableForm = ({
  form,
  fields = [],
  validate = () => ({})
}) => (FormComponent) => {
  setupForm({ form, fields, validate });

  const ObserverFormComponent = observer(FormComponent);

  class MobservableFormWrapper extends Component {
    static displayName = `MobservableFormWrapper(${ FormComponent.displayName })`;

    static propTypes = {
      onSubmit: React.PropTypes.func.isRequired
    }

    constructor(props) {
      super(props);
    }

    handleSubmit = (e) => {
      e.preventDefault();
      const formObj = formStore[form];
      if (Object.keys(formObj.validations).length === 0) {
        this.props.onSubmit(formStore[form].valueMap);
        reset(form);
      } else {
        // mark each field as `touched`
        transaction(() => {
          fields.forEach(name => {
            formObj.fields[name].touched = true;
          });
        });
      }
    }

    render() {
      return <ObserverFormComponent
        handleSubmit={this.handleSubmit}
        resetForm={() => reset(form)}
        fields={formStore[form].fields}/>;
    }
  }

  return observer(MobservableFormWrapper);
};
