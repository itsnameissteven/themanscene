import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import Cors from 'cors';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

interface IGetEmail {
  fullName: string;
  email: string;
  message: string;
}

const cors = Cors({
  methods: ['POST'],
});

export const getEmail = async (inputs: IGetEmail) => {
  try {
    const { data } = await axios.post(`/api/email`, inputs);
    return data;
  } catch (err) {
    console.log(err);
  }
};

function runMiddleware(
  req: NextApiRequest,
  res: NextApiResponse,
  fn: Function
) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }

      return resolve(result);
    });
  });
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  await runMiddleware(req, res, cors);
  if (req.method === 'POST') {
    const msg = {
      to: process.env.EMAIL, // Change to your recipient
      from: process.env.VERIFIED_EMAIL, // Change to your verified sender
      replyTo: req.body.email,
      subject: `Contact form from ${req.body.fullName}`,
      text: req.body.message,
    };
    sgMail.send(msg).then(() => {
      console.log('Email sent');
    });
    return res.status(200);
  } else {
    res.status(500).send({ error: 'Issue' });
  }
}
