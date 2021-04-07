const Database = require('../db/config')

module.exports = {

	async get(id) {
		const db = await Database()

		const data = db.all(`
		SELECT *
		FROM jobs
		`)

		await db.close()

		return data
	},

	async getById(id) {
		const db = await Database()

		const data = db.get(`
		SELECT *
		FROM jobs
		WHERE id=${id}
		`)

		await db.close()

		return data
	},

	async insert(values) {
		const db = await Database()

		const data = db.run(`
			INSERT INTO jobs
				(name, dailyHours, totalHours, createdAt) 
			VALUES 
				('${values.name}', ${values.dailyHours}, ${values.totalHours}, ${values.createdAt})
		`)

		await db.close()
	},

	async update(values, id) {
		const db = await Database()

		const data = db.run(`
			UPDATE jobs SET 
				name='${values.name}', 
				dailyHours='${values.dailyHours}',
				totalHours=${values.totalHours}
			WHERE 
				id=${id}
		`)

		await db.close()
	},

	async delete(id) {
		const db = await Database()

		const data = db.run(`
			DELETE FROM 
				jobs
			WHERE 
				id=${id}
		`)

		await db.close()
	}

}