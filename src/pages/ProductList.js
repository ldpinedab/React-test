import React from 'react';
import {Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper} from '@mui/material';
import { useNavigate } from 'react-router-dom';


export default function ProductList(){

    const navigate = useNavigate();

    const newProduct = (id) =>{
        navigate(`/products/${id}`);
    }

    const [products, setProducts] = React.useState([]);

    React.useEffect(() => {
        const productsTemp = JSON.parse(localStorage.getItem('products'));
        if(!productsTemp) {
            productsTemp = [];
            localStorage.setItem('products', JSON.stringify([]));
        } 
        setProducts(productsTemp);
    }, []);

    return (
    <div>
        <h1>Lista de productos</h1>
        {
            <TableContainer component={Paper}>
            <Table sx={{ minWidth: 500 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align='center'><b>Producto</b></TableCell>
                  <TableCell align="center"><b>Precio ($)</b></TableCell>
                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow
                    key={product.id}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align='center'>
                      {product.name}
                    </TableCell>
                    <TableCell align="center">{product.price}</TableCell>
                    <TableCell align="center"><Button 
                        //fullWidth
                        onClick={() => newProduct(product.id)}
                        variant='contained'>
                        Editar
                        </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

            /*products.map((product) => {
                return (
                    <div key={product.id}>
                        <h2>{product.name}</h2>
                        <p>{product.price}</p>
                    </div>
                )
            })*/
        }
    
    <Button sx={{mt:'20px'}} 
        fullWidth
        onClick={() => newProduct('new')}
        variant='contained'>
        Nuevo producto
    </Button>
    </div>

        
    
    );
}