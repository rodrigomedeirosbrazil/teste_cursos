const userModel = require('../models/users');
const bcrypt = require('bcrypt');	
const jwt = require('jsonwebtoken');				

module.exports = {
	register: async function(req, res, next) {
		const { email } = req.body
		try {
			if(await userModel.findOne({email}))
			{ 
				return res.status(400).send({status:"error", message: "User already registered", data: null}); 
			}
			const user = await userModel.create(req.body);

			user.password = undefined;

			res.json({status: "success", message: "User added successfully!!!", data: user});
		} catch (err) {
			return res.status(400).send({status:"error", message: "Registration failed", data:err});
		}
	},

	authenticate: async function(req, res, next) {
		const { email, password } = req.body
		const user = await userModel.findOne({ email }).select('+password');

		if(!user){
			return res.status(400).send({ error: 'User not found '});
		}

		if(!await bcrypt.compare(password, user.password)) {
			return res.status(400).send({ error: 'Invalid password' });
		}

		user.password = undefined;

		const token = jwt.sign({id: user._id}, req.app.get('secretKey'), { expiresIn: '1h' }); 

		res.json({status:"success", message: "user found!!!", data:{user: user, token:token}});
	},

}					
