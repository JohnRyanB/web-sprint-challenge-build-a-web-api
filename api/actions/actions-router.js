// Write your "actions" router here!
const Actions = require("./actions-model");
const mw = require("./actions-middlware");
const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	Actions.get()
		.then((actions) => {
			if (actions.length > 0) {
				res.status(200).json(actions);
			} else {
				return res.status(200).json((actions = []));
			}
		})
		.catch((err) => res.status(500).json(err));
});

router.get("/:id", mw.checkID, (req, res) => {
	Actions.get(req.params.id)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch(() => res.status(500).json());
});

router.post("/", mw.checkBody, (req, res) => {
	const newPost = req.body;

	Actions.insert(newPost)
		.then((action) => {
			res.status(201).json(action);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.put("/:id", mw.checkID, mw.checkBody, (req, res) => {
	const { id } = req.params;
	const updateAction = req.body;
	Actions.update(id, updateAction)
		.then((action) => {
			res.status(200).json(action);
		})
		.catch((err) => {
			res.status(500).json(err);
		});
});

router.delete("/:id", mw.checkID, (req, res) => {
	const { id } = req.params;
	Actions.remove(id)
		.then((res) => res.status(200).json())
		.catch((err) => res.status(500).json(err));
});

module.exports = router;
