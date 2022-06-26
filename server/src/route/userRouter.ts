import { Router } from "express";
import { appDataSource } from "../dataSource";
import { User } from "../entity/User";
import isAdminMiddleware from "../middleware/adminMiddleware";



const router = Router();
router.post('/logout', (req, res) => {
  (req.session as any).user = undefined;
  req.session.destroy(e => {
    if (e) {
      console.log(e);
    }
  });
  res.sendStatus(204);
})

router.get('/', isAdminMiddleware, async (req, res) => {
  const search = req.query.search as string | undefined;
  const page = Number(req.query.page) || 0;
  const size = Number(req.query.size) || 20;
  const builder = appDataSource.getRepository(User).createQueryBuilder('user')
  if (search && search.trim().length > 0) {
    builder.where(`user.email LIKE :search`)
      .orWhere(`CONCAT(user.firstName,' ', user.lastName) LIKE :search`)
      .setParameter('search', '%' + search + '%');
  }
  const [data, count] = await builder.limit(page).offset(page * size).getManyAndCount()
  res.json({
    content: data,
    totalElements: count,
    size: data.length,
    page: page
  })
})



export default router;