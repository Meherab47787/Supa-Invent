import axios from 'axios'


const createProduct = async (formData) => {

    const response = await axios.post('/api/v1/products/createProduct', formData)
    return response.data

}


const productService = {
    createProduct
}

export default productService;