import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class Input extends PureComponent {
  getErrorMessage(touched, error, warning) {
    if (touched && (error || warning)) {
      return <span className="help-block">{ error || warning }</span>;
    }
    return null;
  }

  getField(input, props) {
    if (props.type == 'textarea') {
      return (<input
        {...input}
        type={props.type}
        {...props}
      />);
    }

    return (<input
      {...input}
      type={props.type}
      {...props}
    />);
  }

  render() {
    const {
      input,
      label,
      meta: { error, warning, touched },
      ...props
    } = this.props;

    const message = this.getErrorMessage(touched, error, warning);
    const field = this.getField(input, props);

    return (
      <div>
        <label>{ label }</label>
        { field }
        { message }
      </div>
    );
  }
}

Input.propTypes = {
  input: PropTypes.instanceOf(Object).isRequired,
  label: PropTypes.string.isRequired,
  type: PropTypes.string
};

Input.defaultProps = {
  type: 'input'
};

export default Input;
