const JobUtils = require("../utils/Job")


module.exports = {

	freeHours(totalHours, jobs, exceptJob) {
		let freeHours = totalHours

		jobs.map((job) => {
			const remaining = JobUtils.remainingDays(job.createdAt, job.totalHours, job.dailyHours)

			if(remaining > 0){
				if (exceptJob != null) {
					if (job.id !== exceptJob.id) freeHours -= job.dailyHours

				} else {
					freeHours -= job.dailyHours
				}
			}
		})

		return freeHours
	}

}