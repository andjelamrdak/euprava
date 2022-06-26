import { Router } from "express";
import isAdminMiddleware from '../middleware/adminMiddleware';
import { appDataSource } from '../dataSource';
import { IdCard } from "../entity/IdCard";

const router = Router();

router.get("/", async (req, res) => {
  const where = {} as any
  if (!(req.session as any).user.admin) {
    where.userId = (req.session as any).user.id;
  }
  res.json(
    await appDataSource.getRepository(IdCard).find({
      relations: {
        user: true,
      },
      where,
      order: {
        id: "DESC",
      },
    })
  );
});
router.use(isAdminMiddleware);
router.post("/", async (req, res) => {
  const post = await appDataSource.getRepository(IdCard).save({
    ...req.body
  });
  res.json(post);
});


router.delete('/:id', async (req, res) => {
  try {
    await appDataSource.getRepository(IdCard).delete(req.params.id)
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: 'Error' })
  }
})


export default router;
