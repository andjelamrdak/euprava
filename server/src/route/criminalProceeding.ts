import { Router } from "express";
import { appDataSource } from "../dataSource";
import { CriminalProceeding } from "../entity/CriminalProceeding";
import isAdminMiddleware from "../middleware/adminMiddleware";

const router = Router();

router.get("/", async (req, res) => {
  const where = {} as any
  if (!(req.session as any).user.admin) {
    where.userId = (req.session as any).user.id;
  }
  res.json(
    await appDataSource.getRepository(CriminalProceeding).find({
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

router.patch("/:id", async (req, res) => {
  const id = Number(req.params.id);
  const criminalProceeding = await appDataSource.getRepository(CriminalProceeding).findOne({ where: { id } });
  if (!criminalProceeding) {
    res.status(404).json({ error: "Criminal proceeding not found" });
    return;
  }
  await appDataSource.getRepository(CriminalProceeding).update(id, req.body);
  res.sendStatus(204);
});

router.post("/", async (req, res) => {
  let payload = req.body;
  delete payload.id;
  const proceeding = await appDataSource.getRepository(CriminalProceeding).save({
    ...payload,
  });
  res.json(proceeding);
});

router.delete("/:id", async (req, res) => {
  try {
    await appDataSource.getRepository(CriminalProceeding).delete(req.params.id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({ error: "Error" });
  }
});

export default router;
