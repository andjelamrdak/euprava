import { Router } from "express";
import { appDataSource } from "../dataSource";
import { CriminalProceeding } from "../entity/CriminalProceeding";
import { User } from "../entity/User";

const router = Router();

router.get("/", async (_req, res) => {
  res.json(
    await appDataSource.getRepository(CriminalProceeding).find({
      relations: {
        user: true,
      },
      order: {
        id: "DESC",
      },
    })
  );
});

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
  const post = await appDataSource.getRepository(CriminalProceeding).save({
    ...payload,
  });
  res.json(post);
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
