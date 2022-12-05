import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import { getUrl } from '../../utils';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface IGetEmail {
  fullName: string;
  email: string;
  message: string;
}

export const getEmail = async (inputs: IGetEmail) => {
  try {
    const { data } = await axios.post(`/api/email`, inputs);
    return data;
  } catch (err) {
    console.log(err);
  }
};

const msg = {
  to: 'stevenrmancine@gmail.com', // Change to your recipient
  from: 'em1612@themanscene.com', // Change to your verified sender
  subject: 'Sending with SendGrid is Fun',
  text: 'and easy to do anywhere, even with Node.js',
  // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
};

const getMessage = () => {};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log(req.body);
  if (req.method === 'POST') {
    const msg = {
      to: `stevenrmancine@gmail.com`, // Change to your recipient
      from: 'em1612@themanscene.com', // Change to your verified sender
      replyTo: req.body.email,
      subject: 'Copy of your contact form',
      text: req.body.message,
      // html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    };
    sgMail.send(msg).then(() => {
      console.log('Email sent');
    });
    return res.status(200);
  } else {
    res.status(500).send({ error: 'Issue' });
  }
}
