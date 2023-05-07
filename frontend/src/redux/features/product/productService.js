import axios from 'axios'


const createProduct = async (formData) => {

    const response = await axios.post('/api/v1/products/createProduct', formData)
    return response.data.data

}

const getAllProducts = async () => {

    const response = await axios.get('/api/v1/products/getAllProducts')
    return response.data

}

const deleteProduct = async (id) => {
    const response = await axios.delete(`/api/v1/products/deleteProduct/${id}`)
    return response.data.data
}

const getAproduct = async (id) => {
    const response = await axios.get(`/api/v1/products/getProduct/${id}`)
    return response.data.data.speceficProduct;
}

const updateproduct = async (id, formData) => {
    const response = await axios.patch(`/api/v1/products/updateProduct/${id}`, formData)
    return response.data.data.updatedProduct;
}


const productService = {
    updateproduct,
    createProduct,
    getAllProducts,
    deleteProduct,
    getAproduct
}

export default productService;