import {Router, Request, Response} from 'express';

 const router = Router();

router.get('/mensajes', (req: Request, res: Response ) =>{
    res.json({
        ok: true,
        mensaje: 'GET esta bien'
    });
});

router.post('/mensajes', (req: Request, res: Response ) =>{

    const cuerpo = req.body.Cuerpo;
    const de = req.body.De;

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', (req: Request, res: Response ) =>{

    const cuerpo = req.body.Cuerpo;
    const de = req.body.De;
    const id = req.params.id

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

export default router;