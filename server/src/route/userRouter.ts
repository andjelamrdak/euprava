import { Router } from "express";

const router = Router();


router.post('/logout', async (req, res) => {
  (req.session as any).user = undefined;
  req.session.destroy(e => {
    if (e) {
      console.log(e);
    }
  });
  res.sendStatus(204);
})


export default router;
