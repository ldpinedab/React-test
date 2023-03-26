import * as React from 'react' 
import Box from '@mui/material/Box'
import {TextField, Button} from '@mui/material';
import {v4 as uuidv4} from 'uuid';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';

export default function ProductDetails(){

    const [product, setProduct] = React.useState({
        name: null,
        price: null
    });

    const navigate = useNavigate();
    
    const params = useParams();

    var textButton = 'Guardar';

    React.useEffect(() => {
        const productId = params.id;
        if(productId === 'new'){
            textButton = 'Crear'
        }
        else{
            const productsTemp = JSON.parse(localStorage.getItem('products'));
            const productTemp = productsTemp.find(element => element.id === productId);
            //setProduct(productTemp);
            //setProduct({ ...product, price: productTemp.price})
            setProduct(productTemp)
        }

    }, []);

    const createProduct = () =>{
        
        // get products array from localstorage
        const products = JSON.parse(localStorage.getItem('products'));

        if(!product.id){
            //generate uid
            const id = uuidv4();
            //add id to product
            product.id = id;
            //save product to local storage in and array

            // add product to products array
            if(!products){
                localStorage.setItem('products',JSON.stringify([product]));    
            }else{
                products.push(product);
                localStorage.setItem('products',JSON.stringify(products));
            }
        }
        else{
            const i = products.findIndex(element => element.id == product.id);
            products[i].name = product.name;
            products[i].price = product.price;
            localStorage.setItem('products',JSON.stringify(products));
        }

        navigate('/products');
    }

    return (
    <div>
        <h1>Detalle de producto</h1>

        <Box
            component="form"
            autoComplete="off"
            sx={{
                padding: '20px',
                maxwidth: 500,
            }}
        >
            <h2>Crear producto</h2>
            <TextField sx={{mt:'20px'}} 
                value={product.name} 
                fullWidth 
                onChange={(e) => setProduct({ ...product, name: e.target.value})}
                id="outlined-basic" 
                label="Nombre del producto" 
                variant="outlined" />
            <TextField sx={{mt:'20px'}} 
                value={product.price} 
                onChange={(e) => setProduct({ ...product, price: e.target.value})}
                fullWidth
                id="filled-basic"
                label="Precio"
                variant="outlined" />
            <Button sx={{mt:'20px'}} 
                fullWidth
                onClick={() => createProduct()}
                variant='contained'>
                {textButton}
            </Button>
            <h3>{product.name}</h3>
            <h3>{product.price}</h3>
        </Box>

    </div>
    );
}