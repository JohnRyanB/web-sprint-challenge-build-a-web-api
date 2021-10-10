// add middlewares here related to projects
// checks that the projects form is filled out properly
const Projects = require("./projects-model");

const checkBody = (req, res, next) => {
	const bod = req.body;
	if (!bod.name || !bod.description) {
		res.status(400).json({ message: "requires name and description" });
	} else {
		next();
	}
};

const checkCompleted = (req, res, next) => {
	const com = req.body.completed;
	if (!com) {
		res.status(400).json({ message: "requires whether completed or not" });
	} else {
		next();
	}
};

const checkID = (req, res, next) => {
	const id = req.params.id;
	Projects.get(id).then((project) => {
		if (!project) {
			res.status(404).json();
		} else {
			next();
		}
	});
};

module.exports = { checkBody, checkCompleted, checkID };
