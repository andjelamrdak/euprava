import axios from "axios";
import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
const router = Router();


router.post('/login', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);
  const user = await userRepository.findOne({
    where: {
      email: req.body.email,
      password: req.body.password
    }
  });
  if (!user || user.blocked) {
    res.status(400).json({
      error: 'No such user'
    });
    return;
  }
  (req.session as any).user = user;
  req.session.save(e => {
    if (e) {
      console.log(e);
    }
  });
  res.json(user);
});

router.post('/register', async (req, res) => {
  const userRepository = appDataSource.getRepository(User);

  try {
    const user = await userRepository.save({
      ...req.body,
      admin: false
    });
    (req.session as any).user = user;
    req.session.save(e => {
      if (e) {
        console.log(e);
      }
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: 'User already exists' + error });
  }
})


router.get('/check', async (req, res) => {
  const user = (req.session as any).user;
  if (!user) {
    res.sendStatus(401);
    return;
  }
  res.json(user)
})

export default router;
