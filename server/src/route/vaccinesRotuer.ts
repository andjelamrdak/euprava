import { Router } from "express";
import { appDataSource } from "../dataSource";
import { Vaccine } from "../entity/Vaccine";
import { User } from "../entity/User";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(
    await appDataSource.getRepository(Vaccine).find({
      relations: {
        user: true,
      },
      order: {
        id: "DESC",
      },
    })
  );
});

router.post("/", async (req, res) => {
  const user = (req.session as any).user as User;

  const post = await appDataSource.getRepository(Vaccine).save({
    ...req.body,
    user,
  });
  res.json(post);
});


router.delete('/:id', async (req, res) => {
    try {
      await appDataSource.getRepository(Vaccine).delete(req.params.id)
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: 'Error' })
    }
  })

export default router;
