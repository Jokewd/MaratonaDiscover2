const Profiles = require("../models/Profile")
const Jobs = require("../models/Job")
const JobUtils = require("../utils/Job")
const ProfileUtils = require("../utils/Profile")


module.exports = {

	async create(req, res) {
		res.render("job")
	},

	async save(req, res) {
		const postData = req.body
		const profile = await Profiles.get()
		const jobs = await Jobs.get()

		const job = {
			name: postData.name,
			dailyHours: postData.dailyHours,
			totalHours: postData.totalHours,
			createdAt: Date.now()
		}

		const freeHours = ProfileUtils.freeHours(profile.hoursPerDay, jobs)

		if (freeHours - postData.dailyHours < 0) {
			req.flash('alert', ['alert-red', 'Você não possui horas livres suficientes para a quantia que informou nesse job.'])

		} else {
			await Jobs.insert(job)
			req.flash('alert', ['alert-green', 'Job cadastrado com sucesso!'])
		}

		return res.redirect('/')
	},

	async show(req, res) {
		const getData = req.params
		const profile = await Profiles.get()
		const job = await Jobs.getById(getData.id)

		if (!job) return res.send('Não encontrado o trampo que você buscou.')

		job.budget = JobUtils.calculateBudget(profile.hourValue, job.totalHours)

		res.render("job-edit", { job })
	},

	async update(req, res) {
		const postData = req.body
		const getData = req.params
		const profile = await Profiles.get()
		const jobs = await Jobs.get()
		const job = await Jobs.getById(getData.id)
		const freeHours = ProfileUtils.freeHours(profile.hoursPerDay, jobs, job)

		if (!job) return res.send('Não encontrado o trampo que você buscou.')

		const updatedJob = {
			name: postData.name,
			dailyHours: postData.dailyHours,
			totalHours: postData.totalHours
		}

		if ((freeHours - postData.dailyHours) < 0) {
			req.flash('alert', ['alert-red', 'Você não possui horas livres suficientes para a quantia que informou nesse job.'])

		} else {
			await Jobs.update(updatedJob, getData.id)

			req.flash('alert', ['alert-green', 'Job atualizado com sucesso!'])
		}

		return res.redirect('/')
	},

	async delete(req, res) {
		const getData = req.params

		await Jobs.delete(getData.id)

		req.flash('alert', ['alert-green', 'Job removido com sucesso!'])

		return res.redirect('/')
	}

}