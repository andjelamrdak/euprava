import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import isAdminMiddleware from "../middleware/adminMiddleware";

const router = Router()
router.use(isAdminMiddleware)

router.patch('/user/:id', async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({ where: { id } });
  if (!user) {
    res.status(404).json({ error: 'User not found' });
    return;
  }
  await appDataSource.getRepository(User).update(id, req.body);
  res.sendStatus(204);
})

export default router;
