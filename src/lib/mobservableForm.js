import invariant from 'invariant';
import React, { Component } from 'react';
import { observable, map as observableMap, asReference, transaction } from 'mobservable';
import { observer } from 'mobservable-react';

const formStore = observableMap();

function setupForm({ form, fields, validate }) {
  const fieldMap = {};

  fields.forEach(name => {
    fieldMap[name] = {
      touched: false,

      value: '',

      onChange: asReference((e) => {
        const field = formStore.get(form).fields[name];
        field.value = e.target.value;
      }),

      error() {
        return formStore.get(form).validations[name] || null;
      }
    };
  });

  formStore.set(form, {
    fields: observable(fieldMap),

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
  });
}

export const reset = (form) => {
  invariant(form, 'You must supply form to reset(form)');
  invariant(formStore.get(form), `Form '${ form }' does not exist!`);

  transaction(() => {
    const formObj = formStore.get(form);
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
      const formObj = formStore.get(form);
      if (Object.keys(formObj.validations).length === 0) {
        this.props.onSubmit(formStore.get(form).valueMap);
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
        fields={formStore.get(form).fields}/>;
    }
  }

  return observer(MobservableFormWrapper);
};