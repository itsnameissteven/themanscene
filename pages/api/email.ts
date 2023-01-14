import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
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

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.method === 'POST') {
    const msg = {
      to: process.env.EMAIL, // Change to your recipient
      from: process.env.VERIFIED_EMAIL, // Change to your verified sender
      replyTo: req.body.email,
      subject: `Contact form from ${req.body.fullName}`,
      text: req.body.message,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log('Email sent');
      })
      .catch((err: any) => console.log(err));
    return res.status(200).json({ status: 'complete' });
  } else {
    return res.status(500).send({ error: 'Issue' });
  }
}
