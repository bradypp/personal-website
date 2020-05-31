const sgMail = require('@sendgrid/mail');

sgMail.setApiKey('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');

exports.handler = async (event, context, callback) => {
    const payload = JSON.parse(event.body);
    const { name, email, subject } = payload;
    return callback(null, {
        statusCode: 200,
        body: 'Let there be light!',
    });
    const body = Object.keys(payload)
        .map(key => {
            return `${key}: ${payload[key]}`;
        })
        .join('<br><br>');

    const msg = {
        to: {
            name: 'Paul Brady',
            email: 'bradypp44@gmail.com',
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
