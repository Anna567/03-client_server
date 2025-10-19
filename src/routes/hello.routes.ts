import { Router } from "express";
import { helloWorld } from "../controllers/hello.controller";

const router = Router();

//  any-Misuse 
router.post("/login", (req: Request, res: Response): void => {
  const body: any = req.body; // any-Missbrauch

  if (body.user?.isAdmin) {
    res.json({ token: `admin-${Date.now()}` });
    return; // void
  }

  const roles = body.user.roles.map((r: any) => r.toLowerCase()); // kann zur Laufzeit krachen
  res.json({ ok: true, roles });
});
//  any-Misuse --Ende

router.get("/hello", helloWorld);

export default router;
