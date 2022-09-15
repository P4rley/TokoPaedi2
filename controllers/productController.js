const { Category, Profile, Product, User } = require('../models')

const {Op} = require('sequelize')

class Controller {
    static landingPage(req, res) {
        let option = Product.productHasStock()
        if (req.query.sort && req.query.order) {
            const { sort, order } = req.query
            option.order = [[sort, order]]
        }
        if (req.query.group) {
            let { group } = req.query
            option.where = {
                CategoryId: group
            }
        }
        let search = ''
        if (req.query.search) {
            search = req.query.search
        }
        option.where.name = {
                [Op.iLike]: `%${search}%`
            }
        option.include = [User]
        let products;
        Product.findAll(option)
            .then((result) => {
                products = result
                return Category.findAll()
            })
            .then((categories) => {
                res.render('landingPage', { products, categories })
            })
            .catch((err) => {
                res.send(err)
            })
    }

    

    static detailProduct(req, res) {
        const buy = req.query.buy
        const id = req.params.productId
        Product.findByPk(id, { include: [User, Category] })
            .then((product) => {
                res.render('./product/detailProduct', { product, buy })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static addProduct(req, res) {
        const errors = req.query.errors
        Category.findAll()
            .then((categories) => {
                res.render('./product/addProduct', { categories, errors })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static createProduct(req, res) {
        const { name, description, price, CategoryId, imageUrl } = req.body
        // ! sementara
        const UserId = '1'
        // ! sementara
        Product.create({ UserId, name, description, price, imageUrl, CategoryId })
            .then(() => {
                res.redirect('/')
            })
            .catch((err) => {
                if (err.name === 'SequelizeValidationError') {
                    let errors = err.errors.map((el) => {
                        return el.message
                    })
                    res.redirect(`/products/add?errors=${errors}`)
                    // res.send(errors)
                } else {
                    res.send(err)
                }
            })
    }
    static editProduct(req, res) {
        const id = req.params.productId
        let product;
        Product.findByPk(id)
            .then((result) => {
                product = result
                return Category.findAll()
            })
            .then((categories) => {
                res.render('./product/editProduct', {product, categories })
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static saveProduct(req, res) {
        const { name, description, price, CategoryId, imageUrl } = req.body
        const id = req.params.productId
        Product.update({ name, description, price, CategoryId, imageUrl }, { where: { id } })
            .then(() => {
                res.redirect(`/products/detail/${id}`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static buyProduct(req, res) {
        const id = req.params.productId
        Product.decrement({ stock: 1 }, {where: {id}})
            .then(() => {
                res.redirect(`/products/detail/${id}?buy=true`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
    static deleteProduct(req, res) {
        const id = req.params.productId
        Product.destroy({ where: { id } })
            .then(() => {
                res.redirect(`/`)
            })
            .catch((err) => {
                res.send(err)
            })
    }
}

module.exports = Controller