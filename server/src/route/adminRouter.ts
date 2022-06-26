import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import { Vaccine } from "../entity/Vaccine";
import isAdminMiddleware from "../middleware/adminMiddleware";

const router = Router();
router.use(isAdminMiddleware);

router.get("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({
    where: { id },
    relations: ["vaccines", "criminalProceedings", "idCards"],
  });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  res.json(user);
});

router.patch("/user/:id", async (req, res) => {
  const id = Number(req.params.id);
  const user = await appDataSource.getRepository(User).findOne({ where: { id } });
  if (!user) {
    res.status(404).json({ error: "User not found" });
    return;
  }
  await appDataSource.getRepository(User).update(id, req.body);
  res.sendStatus(204);
});

router.post("/add-user", async (req, res) => {
  const userRepository = appDataSource.getRepository(User);

  try {
    const user = await userRepository.save({
      ...req.body,
      blocked: false,
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User already exists" + error });
  }
});

router.get('/vaccine-data', async (req, res) => {
  const result = await appDataSource.getRepository(User)
    .createQueryBuilder('user')
    .select('user.id', 'userId')
    .addSelect(`CONCAT(user.firstName,' ', user.lastName)`, 'userName')
    .addSelect('COUNT(vaccine.id)', 'total')
    .leftJoin(Vaccine, 'vaccine', 'user.id = vaccine.userId')
    .groupBy('user.id')
    .getRawMany();

  res.json(result);
})

export default router;
