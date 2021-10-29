const sgMail = require('@sendgrid/mail');
const dotenv = require('dotenv');

const invite = {
    sendInvite: async function (req, res) {
		dotenv.config();
		sgMail.setApiKey(process.env.SENDGRID_API_KEY);

		console.log("req.body", req.body)

        if (req.body.email.length > 4 && req.body.email.includes("@") ) {

			const msg = {
				to: `${req.body.email}`,
				from: 'mkt_mejl_tack@hotmail.com', // Use the email address or domain you verified above
				subject: `${req.body.user} bjuder in dig till att redigera dokument'`,
				text: 'När du har skapat ett konto har du möjlighet att redigera dokumentet',
				html: '<link> https://www.student.bth.se/~olto20/editor/?#/registrera </link>',
			};

			try {
				let sendMail = await sgMail.send(msg);
				console.log("sendMailsendMail", sendMail)
				if (sendMail[0].statusCode == 202) {
					return true
				} else {
					return false
				}
			} catch (err) {
				console.error(err);
				return false
			}
		} else {
			return false
		}
	},
}

module.exports = invite;



