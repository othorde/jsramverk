process.env.NODE_ENV = "test"

var assert = require('assert');

const invite = require("../src/invite.js");


describe('#invite()', async function() {
   
    it('try to send email with valid email, should return true', async function() {
        req = {
            body: {
                email: "mkt_mail_tack@hotmail.com",
                user: " Oliver ",
            }
        }
        let inviteSent = await invite.sendInvite(req)
        assert.equal(inviteSent, true)
    });
    it('try to send email without @ hence unvalid, should return false', async function() {
        req = {
            body: {
                email: "mkt_mail_tackhotmail.com",
                user: " Oliver ",
            }
        }
        let inviteSent = await invite.sendInvite(req)
        assert.equal(inviteSent, false)
    });
    it('try to send email to a mail shorter than 5 letters', async function() {
        req = {
            body: {
                email: "m@t_",
                user: " Oliver ",
            }
        }
        let inviteSent = await invite.sendInvite(req)
        assert.equal(inviteSent, false)
    });
});

