import axios from 'axios'


const createProduct = async (formData) => {

    const response = await axios.post('/api/v1/products/createProduct', formData)
    return response.data

}

const getAllProducts = async () => {

    const response = await axios.post('/api/v1/products/getAllProducts')
    return response.data

}


const productService = {
    createProduct,
    getAllProducts
}

export default productService;