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


//Zugriff auf (potenziell) nichtexistirenden Index
router.get("/demo/arr-oob", (req: Request, res: Response): void => {
  const roles = ["Admin", "Editor"];              
  const i = Number(req.query.i ?? 0);             // keine Validierung 
  const roleLower = roles[i].toLowerCase();       // 
  res.json({ ok: true, i, role: roleLower });
});
//Zugriff auf (potenziell) nichtexistirenden Index --Ende

router.get("/hello", helloWorld);

export default router;
