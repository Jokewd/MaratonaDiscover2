const Database = require('./config')

const initDB = {

	async init() {
		const db = await Database()

		await db.exec(`
			CREATE TABLE IF NOT EXISTS profile (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name VARCHAR(250), 
				avatar VARCHAR(250), 
				monthlyBudget FLOAT(10,2),
				hoursPerDay INT(2), 
				daysPerWeek INT(2),
				vacationPerYear INT(2),
				hourValue INT(2)
			)
		`)

		await db.exec(`
			CREATE TABLE IF NOT EXISTS jobs (
				id INTEGER PRIMARY KEY AUTOINCREMENT,
				name VARCHAR(250),
				dailyHours INT(2),
				totalHours INT(2),
				createdAt DATETIME
			)
		`)

		await db.run(`
			INSERT INTO profile 
				(name, avatar, monthlyBudget, hoursPerDay,  daysPerWeek, vacationPerYear, hourValue) 
			VALUES 
				('Seu nome', 'https://urldaimagemdoseuperfil', 2500, 5, 5, 4, 50)
		`)

		await db.close()
	}

}

initDB.init()