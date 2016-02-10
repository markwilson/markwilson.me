var AWS = require('aws-sdk');
var ses = new AWS.SES({apiVersion: '2010-12-01'});

function validateEmail (email) {
    var pattern = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*(\.[a-zA-Z](-?[a-zA-Z0-9])*)+$/;
    if (!email || email.length > 254 || !pattern.test(email)) {
        return false;
    }

    var parts = email.split('@');
    if (parts[0].length > 64) {
        return false;
    }

    var domainParts = parts[1].split('.');

    return !domainParts.some(function (part) {
        return part.length > 63;
    });
}

exports.handler = function (event, context) {
    console.log('Received event:', JSON.stringify(event, null, 2));

    if (!event.email) {
        context.fail('Must provide email');

        return;
    }

    if (!event.message || event.message === '') {
        context.fail('Must provide message');

        return;
    }

    var email = decodeURI(event.email);
    if (!validateEmail(email)) {
        context.fail('Must provide valid from email');
        
        return;
    }

    var messageParts = [],
        replyTo = (event.name ? event.name : email) + ' <' + email + '>',
        subject = 'Website Contact Submission';

    messageParts.push('Message: ' + event.message);

    var params = {
        Destination: {ToAddresses: ['Mark Wilson <hello@markwilson.me>']},
        Message: {
            Body: {Text: {Data: messageParts.join("\r\n"), Charset: 'UTF-8'}},
            Subject: {Data: subject, Charset: 'UTF-8'}
        },
        Source: "Contact Form <hello@markwilson.me>",
        ReplyToAddresses: [replyTo]
    };

    ses.sendEmail(params, function (err, data) {
        if (err) {
            console.log(err, err.stack);
            context.fail(err);
        } else {
            console.log(data);
            context.succeed('Thanks for dropping us a line');
        }
    });
};
