const Profiles = require("../models/Profile")
const Jobs = require("../models/Job")
const JobUtils = require("../utils/Job")
const ProfileUtils = require("../utils/Profile")


module.exports = {

	async index(req, res) {
		const jobs = await Jobs.get()
		const profile = await Profiles.get()

		let statusCount = {
			progress: 0,
			done: 0,
			total: jobs.length
		}

		let freeHours = ProfileUtils.freeHours(profile.hoursPerDay, jobs)

		const updatedJobs = jobs.map((job) => {
			const remaining = JobUtils.remainingDays(job.createdAt, job.totalHours, job.dailyHours)
			const status = remaining <= 0 ? 'done' : 'progress'
			const budget = JobUtils.calculateBudget(profile.hourValue, job.totalHours)

			if (status == 'done')
				statusCount.done++
			else
				statusCount.progress++

			return {
				...job,
				remaining,
				status,
				budget
			}
		})

		const alert = req.flash('alert')

		return res.render("index", { alert, jobs: updatedJobs, profile: profile, status: statusCount, freeHours: freeHours })
	}

}