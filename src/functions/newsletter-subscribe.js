const Mailchimp = require('mailchimp-api-v3');

const mailchimp = new Mailchimp(process.env.MAILCHIMP_API_KEY);

exports.handler = async event => {
    try {
        const { email_address, first_name } = JSON.parse(event.body);
        if (!email_address) {
            return {
                statusCode: 500,
                body: 'Missing email',
            };
        }

        const subscriber = {
            email_address,
            status: 'subscribed',
            merge_fields: {
                FNAME: first_name,
            },
        };

        const response = await mailchimp.post(
            `/lists/${process.env.MAILCHIMP_AUDIENCE_ID}/members/`,
            subscriber,
        );

        return {
            statusCode: 200,
            body: 'Successfully signed up to the mailing list',
        };
    } catch (err) {
        console.error(err);
        return {
            statusCode: 500,
            body: err.message,
        };
    }
};
