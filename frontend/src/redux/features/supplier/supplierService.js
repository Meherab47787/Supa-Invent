import axios from 'axios';


const getAllSupplier = async() => {
    const response = await axios.get('/api/v1/supplier/getallSuppliers');
    return response.data.suppliers;
}


const supplierService = {
    getAllSupplier
}

export default supplierService;