module.exports = {

	remainingDays(createdAt, totalHours, dailyHours) {
		const remainingDays = Math.floor((totalHours / dailyHours))
		const createdDate = new Date(createdAt)
		const dueDay = createdDate.getDate() + remainingDays
		const dueDateInMs = createdDate.setDate(dueDay)
		const timeDiffInMs = dueDateInMs - Date.now()
		const dayInMs = 1000 * 60 * 60 * 24
		const dayDiff = Math.floor(timeDiffInMs / dayInMs)

		return dayDiff
	},

	calculateBudget(hourValue, totalHours) {
		return hourValue * totalHours
	}

}