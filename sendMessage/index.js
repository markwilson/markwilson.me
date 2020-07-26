const yn = require("yn");

exports.handler = async (event, context) => {
  const { token, formData } = JSON.parse(event.body);

  if (!validFormData(formData)) {
    return buildHttpResponse({
      statusCode: 400,
      body: "Invalid form data",
    });
  }

  return await verifyToken(token)
    .then(async ({ data }) => {
      if (!data.success) {
        console.error(data["error-codes"]);

        return buildHttpResponse({
          statusCode: 400,
          body: "Invalid recaptcha data",
        });
      }

      if (data.score < process.env.SCORE_THRESHOLD) {
        return buildHttpResponse({
          statusCode: 400,
          body: "You don't appear to be human",
        });
      }

      await sendEmail(formData);

      return buildHttpResponse({
        statusCode: 200,
        body: "OK",
      });
    })
    .catch((error) => {
      console.error(error);

      return buildHttpResponse({
        statusCode: 500,
        body: error.toString(),
      });
    });
};

const verifyToken = (token) => {
  const axios = require("axios");
  const qs = require("querystring");

  return axios.post(
    "https://www.google.com/recaptcha/api/siteverify",
    qs.stringify({
      secret: process.env.RECAPTCHA_SECRET,
      response: token,
    }),
    {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }
  );
};

const buildHttpResponse = (response) => {
  let additionalHeaders = {
    "Content-Type": "text/plain",
  };

  if (yn(process.env.INCLUDE_CORS_HEADERS)) {
    additionalHeaders = {
      ...additionalHeaders,
      "Access-Control-Allow-Headers": "*",
      "Access-Control-Allow-Methods": "OPTIONS,POST",
      "Access-Control-Allow-Origin": "*",
    };
  }

  return {
    ...response,
    headers: {
      ...response.headers,
      ...additionalHeaders,
    },
  };
};

const sendEmail = ({ name, email, message }) => {
  const sendEmailsTo = process.env.SEND_TO;

  const AWS = require("aws-sdk");
  AWS.config.update({ region: "eu-west-1" });

  const params = {
    Destination: { ToAddresses: [`Mark Wilson <${sendEmailsTo}>`] },
    Message: {
      Body: {
        Html: {
          Charset: "UTF-8",
          Data: message,
        },
      },
      Subject: { Data: "Contact form submission" },
    },
    Source: `Contact form <${sendEmailsTo}>`,
    ReplyToAddresses: [`${name} <${email}>`],
  };

  return new AWS.SES({ apiVersion: "2010-12-01" }).sendEmail(params).promise();
};

const validFormData = (formData) => {
  if (!formData.name || !formData.email || !formData.message) {
    return false;
  }

  const validator = require("email-validator");
  if (!validator.validate(formData.email)) {
    return false;
  }

  return true;
};
