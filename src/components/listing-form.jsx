import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react';
import {Field, reduxForm} from 'redux-form';
import classnames from 'classnames';

const validate = (values) => {

    const errors = {};

    if (!values.title) {
        errors.title = {
            message: 'Please provide a title for your listing url'
        }
    }
    if (!values.url) {
        errors.url = {
            message: 'Please provide a valid url'
        }
    }
    // else if(!/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/i.test(values.url)) {
    //   errors.url = {
    //     message: 'Invalid Url'
    //   }
    // }
    return errors;
}

class ListingForm extends Component {

    componentWillReceiveProps = (nextProps) => { // Load Listing Asynchronously
        const {listing} = nextProps;

        if (listing._id !== this.props.listing._id) { // Initialize form only once
            this.props.initialize(listing)
        }
    }

    renderField = ({input, label, type, meta: {touched, error}}) => (

        <Form.Field
            className={classnames({error: touched && error})}>

            <label>{label}</label>

            <input {...input} placeholder={label} type={type}/>

            {touched && error &&
                <span className="error">
                    {error.message} async
                </span>
            }
        </Form.Field>
    );

    render() {

        const {handleSubmit, pristine, submitting, loading, listing} = this.props;

        return (


                <div  className="form-container">

                    <h1 className="form-header">
                        {listing._id ? 'Edit Listing' : 'Listings'}
                    </h1>

                    <Form
                        className="App-form"
                        onSubmit={handleSubmit}
                        loading={loading}>



                            <Field
                                className="form-input form-input-name"
                                name="title"
                                type="text"
                                component={this.renderField}
                                label="Title"/>

                            <Field
                                className="form-input form-input-url"
                                name="url"
                                type="text"
                                component={this.renderField}
                                label="Url"/>



                        <Button
                            className="form-button-save"
                            primary type='submit'
                            disabled={pristine || submitting}>
                            {listing._id ? 'UPDATE' : 'ADD'}
                        </Button>

                    </Form>
                </div>

        )
    }
}

export default reduxForm({form: 'listing', validate})(ListingForm);
