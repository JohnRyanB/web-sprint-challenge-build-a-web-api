// add middlewares here related to actions
const Actions = require("./actions-model");
const Projects = require("../projects/projects-model");

const checkID = (req, res, next) => {
	const id = req.params.id;
	Actions.get(id).then((actions) => {
		if (!actions) {
			res.status(404).json();
		} else {
			next();
		}
	});
};

const checkBody = (req, res, next) => {
	const body = req.body;
	if (!body.project_id || !body.description || !body.notes) {
		res.status(400).json();
	} else {
		Projects.get(req.body.project_id).then((project) => {
			if (!project) {
				res.status(404).json();
			} else {
				next();
			}
		});
	}
};

module.exports = { checkID, checkBody };
