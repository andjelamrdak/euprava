import { Router } from "express";
import isAdminMiddleware from '../middleware/adminMiddleware';
import { appDataSource } from '../dataSource';
import { IdCard } from "../entity/IdCard";

const router = Router();

router.get("/", async (_req, res) => {
    res.json(
      await appDataSource.getRepository(IdCard).find({
        relations: {
          user: true,
        },
        order: {
          id: "DESC",
        },
      })
    );
  });
router.get("/userId", async (_req, res) => {
    res.json(
      await appDataSource.getRepository(IdCard).find({
        where: {
            userId: _req.body.userId
        },
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
