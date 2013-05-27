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
            url: '/contact.php',
            type: 'POST',
            data: formValues,
            dataType: 'json',
            success: function (data) {
                if (data.success) {
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
                } else {
                    ContactForm.enableInputs().showGenericErrorMessage();
                }
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

            this.validationMessages.name = 'Anonymity is declined';
        }

        if (data.email === '') {
            validSubmission = false;

            this.validationMessages.email = 'How will I know how to reply?';
        } else {
            var emailRegExp = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

            if (!emailRegExp.test(data.email)) {
                validSubmission = false;

                this.validationMessages.email = 'That is not a valid email address';
            }
        }

        if (data.message === '') {
            validSubmission = false;

            this.validationMessages.message = 'Do you have nothing to say?';
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
            .prependTo(this.element)
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
