var ContactForm = {
    element: null,
    validationMessages: {},
    initialise: function (element) {
        this.element = $(element);

        this.element.submit(this.submit);

        return this;
    },
    submit: function (e) {
        e.preventDefault();

        ContactForm.disableInputs().hideGenericErrorMessage();

        var formValues = ContactForm.getValues(),
            validSubmission = ContactForm.validate(formValues);

        if (!validSubmission) {
            ContactForm.showValidationMessages().enableInputs();

            return false;
        }

        $.ajax({
            url: 'https://boe3am5nm8.execute-api.eu-west-1.amazonaws.com/prod/get-in-touch',
            type: 'POST',
            data: JSON.stringify(formValues),
            contentType: 'application/json; charset=utf-8',
            dataType: 'json',
            success: function (data) {
                ContactForm.showSuccessMessage();

                setTimeout(function () {
                    ContactForm
                        .closeModal()
                        .hideSuccessMessage()
                        .enableInputs()
                        .hideGenericErrorMessage()
                        .clearFormValues()
                    ;
                }, 3000);
            },
            error: function () {
                ContactForm.enableInputs().showGenericErrorMessage();
            }
        });

        return false;
    },
    clearValidation: function () {
        this.validationMessages = {};

        this.element.find('.error').removeClass('error').find('.help-block').remove();

        return this;
    },
    validate: function (data) {
        this.clearValidation();

        var validSubmission = true;

        if (data.name === '') {
            validSubmission = false;

            this.validationMessages.name = 'Please tell me who you are';
        }

        if (data.email === '') {
            validSubmission = false;

            this.validationMessages.email = 'I need this so I can reply';
        } else {
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!emailRegExp.test(data.email)) {
                validSubmission = false;

                this.validationMessages.email = 'This is not a valid email address';
            }
        }

        if (data.message === '') {
            validSubmission = false;

            this.validationMessages.message = 'What would you like to say?';
        }

        return validSubmission;
    },
    getValues: function () {
        var values = {};

        this.element.find('input[name],textarea[name]').each(function (index, formElement) {
            var $formElement = $(formElement);

            values[$formElement.attr('name')] = $formElement.val();
        });

        return values;
    },
    showValidationMessages: function () {
        for (var key in this.validationMessages) {
            var inputElement = this.element.find('[name=' + key + ']');

            inputElement.parents('.control-group').addClass('error');
            $('<span></span>')
                .addClass('help-block')
                .text(this.validationMessages[key])
                .insertAfter(inputElement)
            ;
        }

        return this;
    },
    disableInputs: function () {
        this.element.find('input[name],textarea[name],button').each(function (index, formElement) {
            var $formElement = $(formElement);

            $formElement.attr('disabled', true);
        });

        return this;
    },
    enableInputs: function () {
        this.element.find('input[name],textarea[name],button').each(function (index, formElement) {
            var $formElement = $(formElement);

            $formElement.attr('disabled', false);
        });

        return this;
    },
    hideGenericErrorMessage: function () {
        this.element.find('#generic-message').remove();

        return this;
    },
    showGenericErrorMessage: function () {
        this.hideGenericErrorMessage();

        $('<p></p>')
            .attr('id', 'generic-message')
            .addClass('text-error')
            .prependTo(this.element)
            .text('Sorry, something went wrong. Please resubmit')
        ;

        return this;
    },
    closeModal: function () {
        this.element.parents('div.modal').modal('hide');

        return this;
    },
    hideSuccessMessage: function () {
        this.element.find('#success-message').remove();

        return this;
    },
    showSuccessMessage: function () {
        this.hideSuccessMessage();

        $('<p></p>')
            .attr('id', 'success-message')
            .addClass('text-success')
            .prependTo(this.element.find('.modal-body'))
            .text('Thank you for your details')
        ;

        return this;
    },
    clearFormValues: function () {
        this.element.find('input[name],textarea[name]').val('');

        return this;
    }
};

$(document).ready(function () {
    ContactForm.initialise('#contact form');
});

$.ajaxSetup({
    'headers': {
        'x-api-key': 'JEfX8zINcP553txx2cnF24kPOzrwRCNw3F32cg7g'
    }
});
