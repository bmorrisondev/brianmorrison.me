const Joi = require('joi')
const axios = require('axios')

const schema = Joi.object().keys({
  name: Joi.string().required(),
  emailAddress: Joi.string().email().required(),
  message: Joi.string().optional(),
  optInToNewsletter: Joi.bool().optional()
});

exports.handler = async function (event, context) {
  let response = {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Credentials': true
    }
  }
  try {
    let contactInfo = JSON.parse(event.body)
    let validationResults = schema.validate(contactInfo)
    if(validationResults.error) {
      response.statusCode = 400
      response.body = JSON.stringify(validationResults)
    } else {

      if(contactInfo.optInToNewsletter === true) {
        let memberInfo = {
          emailAddress: contactInfo.emailAddress,
          name: contactInfo.name
        }
        await addListMember(
          process.env.MAILCHIMP_KEY,
          process.env.MAILCHIMP_LIST_ID,
          memberInfo
        )
      }

      let message = `😄 **New Contact Submitted:**\n`
      message += `**Name:** ${contactInfo.name}\n`
      message += `**EmailAddress:** ${contactInfo.emailAddress}\n`
      message += `**Newsletter Opt In:** ${contactInfo.optInToNewsletter}\n`
      message += `\`\`\`${contactInfo.message}\`\`\``

      let opts = {
        url: process.env.CONTACT_WEBHOOK,
        method: 'post',
        headers: {
          'Content-Type': 'application/json'
        },
        data: JSON.stringify({ content: message })
      }
      await axios(opts)
      response.statusCode = 200
    }
  } catch (err) {
    console.error(err)
    response.statusCode = 500
  }
  return response
}

// TODO: Move this into a dedicated service
const mailchimpApiBase = 'https://us9.api.mailchimp.com/3.0/';

const addListMember = async function (apiKey, listId, memberInfo) {
  try {
    let postBody = {
      email_address: memberInfo.emailAddress,
      status: 'subscribed'
    };

    if (memberInfo.name) {
      let nameSplit = memberInfo.name.split(' ');
      if (nameSplit.length === 2) {
        postBody.merge_fields = {
          FNAME: nameSplit[0],
          LNAME: nameSplit[1]
        };
      } else {
        postBody.merge_fields = {
          FNAME: memberInfo.name
        };
      }
    }

    let opts = {
      method: 'post',
      url: `${mailchimpApiBase}/lists/${listId}/members`,
      auth: {
        username: 'na',
        password: apiKey
      },
      data: postBody
    };

    await axios(opts);
  } catch (err) {
    if(err.response && err.response.data && err.response.data.title === "Member Exists") {
      return
    } else {
      throw err
    }
  }
};