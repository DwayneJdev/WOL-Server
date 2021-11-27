const Express = require("express");
const router = Express.Router();
let validateJWT = require("../middleware/validate");
    const  {LogModel} = require("../models");

router.get('/practice', validateJWT, (req, res) => {
    res.send('Hey!! This is a practice route!')
});

// ******* Create workout log ********

router.post("/", validateJWT, async (req, res) => {
    const { description, definition, results } = req.body.log;
    console.log("HELLP",req.user)
    const { id } = req.user;
    const logEntry = {
        description,
         definition,
          results,
          owner_id: id
    }
    try {
        const newLog = await LogModel.create(logEntry);
        res.status(200).json(newLog);
    } catch (err) {
        res.status(500).json({error: err});
    }
    
});

router.get('/about', (req, res) => {
    res.send("This is the about route!");
});

// ***** Get All Logs by user ****

router.get("/log/", validateJWT, async (req, res) => {
    try {
        const entries = await LogModel.findAll();
        res.status(200).json(entries);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// ***** Get Logs By User ****

router.get("/log/:id", validateJWT, async (req, res) => {
    
    const { id } = req.user;
    try {
        const userLog = await LogModel.findAll({
            where: {
                owner_id: id
            }
        });
        res.status(200).json(userLog);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// **** GET Logs BY ID****

// router.get("/log/:id", async (req, res) => {
//     const {  } = req.params;
//     try {
//         const results = await LogModel.findAll({
//             where: { :  }
//         });
//         res.status(200).json(results);
//     } catch (err) {
//         res.status(500).json({ error: err });
//     }
// })

// ***** Update a Log *****

router.put("/update/log/:id", validateJWT, async (req, res) => {
    const { description, definition, result } = req.body.log;
    const logId = req.params.id;
    const userId = req.user.id;

    const query = {
        where: {
            id: logId,
            owner_id: userId
        }
    };

    const updatedLog = {
        description: description,
        definition: definition,
        result: result
    };

    try {
        const update = await LogModel.update(updatedLog, query);
        res.status(200).json(update);
    } catch (err) {
        res.status(500).json({ error: err });
    }
});

// ***** DELETE A Log ****

router.delete("/delete/:id", validateJWT, async (req, res) => {
    const userId = req.user.id;
    const LogId = req.params.id;

    try {
        const query = {
            where: {
                id: LogId,
                owner_id: userId
            }
        };

        await LogModel.destroy(query);
        res.status(200).json({ message: "Workout log Entry Removed" });
    } catch (err) {
        res.status(500).json({ error: err });
    }
})

module.exports = router;