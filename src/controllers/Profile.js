const Profiles = require("../models/Profile")


module.exports = {

	async index(req, res) {
		res.render("profile", { profile: await Profiles.get() })
	},

	async update(req, res) {
		const postData = req.body

		const weeksPerYear = 52
		const weeksPerMonth = (weeksPerYear - postData.vacationPerYear) / 12
		const weekTotalHours = postData.hoursPerDay * postData.daysPerWeek
		const monthlyTotalHours = weekTotalHours * weeksPerMonth
		const hourValue = postData.monthlyBudget / monthlyTotalHours
		const profile = await Profiles.get()

		await Profiles.update({
			...profile,	
			...postData,
			hourValue: hourValue
		})

		res.redirect('/profile')
	}

}