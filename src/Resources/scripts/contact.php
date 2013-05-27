<?php

// sanitise/validate input
$name    = filter_input(INPUT_POST, 'name', FILTER_SANITIZE_STRING);
$email   = filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
$message = filter_input(INPUT_POST, 'message', FILTER_SANITIZE_STRING);

$emailRegExp = '/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/';

// check if valid submission
if ($name === '' || $email === '' || $message === '' || !preg_match($emailRegExp, $email)) {
    // no need to show errors, should be handled by the javascript
    die('{"success": 0}');
}

// send email with contact details
mail(
    $parameters['contact_email_address'],
    'Website contact form submission',
    'Contact form submission from: ' . $name . ' <' . $email . '>' . PHP_EOL . PHP_EOL . 'Message: ' . $message
);

die('{"success": 1}');
