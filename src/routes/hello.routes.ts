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

// --- Type-Assertion Fehler ---
router.post("/login-assert", (req: Request, res: Response) => {
  const body = req.body as { user: { roles: any } };   
  const roles = (body.user.roles as string[]);  // Double Assertion
  const lower = roles.map(r => r.toLowerCase());  // crasht, wenn string ist
  res.json({ roles: lower });
});
// --- Ende Assertion-Fehler ---

router.get("/hello", helloWorld);

export default router;
