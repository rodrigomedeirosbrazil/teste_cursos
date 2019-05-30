
const courseModel = require('../models/courses');
const userModel = require('../models/users');					

module.exports = {
	getById: async function(req, res) {
		try {
			const { courseId } = req.params
			const course = await courseModel.findById(courseId);
			res.json({status:"success", message: "Course found!!!", data:{course: course}});
		} catch (err) {
			return res.status(404).send({status:"error", message: "Course not found", data: null});
		}
	},

	create: async function(req, res, next) {
		const { name } = req.body
		try {
			if(await courseModel.findOne({name}))
			{ 
				return res.status(400).send({status:"error", message: "Course already registered", data: null}); 
			}
			const course = await courseModel.create(req.body);

			res.json({status: "success", message: "Course added successfully!!!", data: course});
		} catch (err) {
			return res.status(400).send({status:"error", message: "Registration failed", data:err});
		}
	},

	getAll: async function(req, res) {
		try {
			const courses = await courseModel.find({});
			res.json({status:"success", message: "Courses list found!!!", data:{courses: courses}});
		} catch (err) {
			return res.status(400).send({status:"error", message: "Courses empty", data: null});
		}
	},

	updateById: async function(req, res) {
		try {
			const courseId = req.params.courseId;
			const newData = {
				name: req.body.name,
				description: req.body.description
			};
			const course = await courseModel.findByIdAndUpdate(courseId, newData, {new: true} );
			res.json({status:"success", message: "Course updated successfully!!!", data:{course: course}});
		} catch (err) {
			return res.status(404).send({status:"error", message: "Course not found", data: null});
		}
	},

	deleteById: async function(req, res) {
		try {
			const courseId = req.params.courseId;
			await courseModel.findByIdAndRemove(courseId);
			res.json({status:"success", message: "Course deleted successfully!!!", data: null});
		} catch (err) {
			return res.status(404).send({status:"error", message: "Course not found", data: null});
		}
	},

	subscribe: async function(req, res) {
		try {
			const courseId = req.body.courseId;
			const userId = req.body.userId;
			const course = await courseModel.findById(courseId);
			console.log(course);
			const newData = {
				'$push':{
					courses: {
						course_id: course._id,
						name: course.name
					}
				} 
			};
			console.log(newData);
			const user = await userModel.findByIdAndUpdate(userId, newData, {new: true} );
			res.json({status:"success", message: "User subscribed successfully!!!", data:{user: user}});
		} catch (err) {
			return res.status(404).send({status:"error", message: "User not found", data: err});
		}
	},
}					