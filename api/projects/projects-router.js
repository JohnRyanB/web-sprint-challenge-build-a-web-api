// Write your "projects" router here!
const Projects = require("./projects-model");
const mw = require("./projects-middleware");
const express = require("express");
const router = express.Router();

router.get(`/`, (req, res) => {
	Projects.get()
		.then((projects) => {
			if (projects.length > 0) {
				res.status(200).json(projects);
			} else {
				return res.status(200).json((projects = []));
			}
		})
		.catch((err) => {
			console.log(err);
			res.status(500).json({ message: "Error retrieving projects" });
		});
});

router.get("/:id", (req, res) => {
	Projects.get(req.params.id)
		.then((project) => {
			if (project) {
				res.status(200).json(project);
			} else {
				res.status(404).json();
			}
		})
		.catch((error) => {
			console.log(error);
			res.status(500).json({
				message: "Error retrieving the project",
			});
		});
});

router.post("/", mw.checkBody, (req, res) => {
	const newProject = req.body;

	Projects.insert(newProject)
		.then((project) => {
			res.status(201).json(project);
		})
		.catch((err) =>
			res.status(500).json({ message: `error posting project: ${err}` })
		);
});

router.put("/:id", mw.checkBody, mw.checkCompleted, mw.checkID, (req, res) => {
	const { id } = req.params;
	const updateProject = req.body;
	Projects.update(id, updateProject)
		.then((project) => {
			res.status(200).json(project);
		})
		.catch((err) => {
			res.status(500).json({ message: `error updating project: ${err}` });
		});
});

router.delete("/:id", mw.checkID, (req, res) => {
	const { id } = req.params;

	Projects.remove(id)
		.then((project) => {
			if (project) {
				res.status(200).json();
			} else {
				res.status(404).json();
			}
		})
		.catch((err) => {
			res.status(500).json({ message: `error deleting project: ${err}` });
		});
});

router.get("/:id/actions", mw.checkID, (req, res) => {
	const id = req.params.id;
	Projects.getProjectActions(id)
		.then((actions) => res.status(200).json(actions))
		.catch(() => {
			res.status(500).json({ message: "bad request" });
		});
});

module.exports = router;
