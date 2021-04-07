const Database = require('../db/config')

module.exports = {

	async get() {
		const db = await Database()

		const data = db.get(`
		SELECT *
		FROM profile
		WHERE id=1
		`)

		await db.close()

		return data
	},

	async update(values) {
		const db = await Database()

		const data = db.run(`
			UPDATE profile SET 
				name='${values.name}', 
				avatar='${values.avatar}',
				monthlyBudget=${values.monthlyBudget},
				daysPerWeek=${values.daysPerWeek},
				hoursPerDay=${values.hoursPerDay},
				vacationPerYear=${values.vacationPerYear},
				hourValue=${values.hourValue}
			WHERE id=1
		`)

		await db.close()
	}

}