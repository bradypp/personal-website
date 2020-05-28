const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(process.env.SENDGRID_KEY);

exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body);
    const { name, email, subject } = payload;

    const body = Object.keys(payload)
        .map(key => {
            return `${key}: ${payload[key]}`;
        })
        .join('<br><br>');

    const msg = {
        to: {
            name: 'Paul Brady',
            email: process.env.SENDGRID_EMAIL,
        },
        from: {
            name: `${name} via paulbrady.dev`,
            email: `${email}`,
        },
        replyTo: { name, email },
        subject: subject || 'Contact Form Submission',
        html: body,
    };

    try {
        await sgMail.send(msg);

        return {
            statusCode: 200,
            body: 'Message sent',
        };
    } catch (err) {
        return {
            statusCode: err.code,
            body: err.message,
        };
    }
};
