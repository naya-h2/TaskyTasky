import mongoose from 'mongoose';
import dbConnect from '@/lib/db/dbConnect';
import { NextApiRequest, NextApiResponse } from 'next';
import TagColor from '@/lib/db/models/TagColor';

async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  // console.log(mongoose.connection.readyState);

  const { tagName, colorID } = req.query;

  if (req.method === 'GET' && !tagName) {
    const allTags = await TagColor.find({});
    res.status(200).send(allTags);
    return;
  }

  if (!tagName) {
    res.status(400).send('tagName is required');
    return;
  }

  if (req.method === 'GET') {
    const tag = await TagColor.findOne({ tagName: tagName });
    if (tag) res.status(200).send(tag);
    else res.status(400).send('tagName does not exist');
    return;
  }

  if (req.method === 'POST') {
    if (!colorID) {
      res.status(400).send('colorID is required');
      return;
    }

    const existingTag = await TagColor.findOne({ tagName: tagName });
    if (existingTag) {
      res.status(200).send(existingTag);
      return;
    }

    const newTagColor = await TagColor.create({ tagName: tagName, colorID: colorID });
    res.status(201).send(newTagColor);
    return;
  }

  // if (req.method === 'PATCH') {
  //   const tagColor = await TagColor.findOneAndUpdate({ tagName: tagName }, req.body, {
  //     new: true,
  //   });
  //   res.status(200).send(tagColor);
  //   return;
  // }

  if (req.method === 'DELETE') {
    const tagColor = await TagColor.findOneAndDelete({ tagName: tagName });
    res.status(204).send(`"${tagName}" was deleted`);
    return;
  }

  res.status(404).send('Invalid Access');
}

export default handler;
