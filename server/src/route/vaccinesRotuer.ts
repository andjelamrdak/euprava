import { Router } from "express";
import { appDataSource } from "../dataSource";
import { Vaccine } from "../entity/Vaccine";
import { User } from "../entity/User";
import isAdminMiddleware from "../middleware/adminMiddleware";

const router = Router();

router.get("/", async (req, res) => {
  const where = {} as any
  if (!(req.session as any).user.admin) {
    where.userId = (req.session as any).user.id;
  }
  res.json(
    await appDataSource.getRepository(Vaccine).find({
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
  const vaccine = await appDataSource.getRepository(Vaccine).save({
    userId: req.body.userId,
    disease: req.body.disease,
    dateOfVaccintaion: req.body.dateOfVaccintaion
  });
  res.json(vaccine);
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
