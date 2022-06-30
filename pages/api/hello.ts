// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from 'axios';
import {getUrl} from '../../utils'


export const getHello = async () => {
  try {
    const { data } = await axios(`${getUrl()}/api/hello`);
    console.log(data)
    return data
  } catch (err) {
    console.log(err);
  }
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  console.log('qwerwe')
  if (req.method === 'GET') {
    res.status(200).json({name: 'yes'});
  } else {
    res.status(500).send({error: 'Issue'});
  }
}
