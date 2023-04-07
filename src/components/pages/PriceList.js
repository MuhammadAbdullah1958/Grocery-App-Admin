import React from 'react'
import { Table, Button, Input } from 'reactstrap'
import { useQuery, useQueryClient, useMutation } from 'react-query';
import axios from 'axios';
import Domain from 'lib/Config';
import { useState } from 'react';

const PriceList = () => {
    const [searchPrice, setSearchPrice] = useState("");
    async function getProductsList(){
        const response = await axios.post(`${Domain}/api/product/view`)
        return response
      }
        // Access the client
        const queryClient = useQueryClient()
     
        // Queries
        const {data, isLoading, isError} = useQuery('getProductsList', getProductsList)
    
        if (isLoading)
        return <h3>Loading...</h3>
    
        if (isError)
        return <h3> Error!!! </h3>

        // function handleFilterSearch(e){
        //    console.log(e)
        // }
    
  return (
    <div>
        <h3>Price List of the Available Products</h3>

        <div>
            <Input 
                className="my-3"
                placeholder="search via price range..."
                onChange={(e)=>setSearchPrice(e.target.value)}
                bsSize="md"
            />
        </div>

        <Table
            responsive
            striped
            size="sm"
            >
            <thead>
                <tr>
                    <th>S.r</th>
                    <th>Id</th>
                    <th>Title</th>
                    <th>Price</th>
                    <th>discount</th>
                    <th>Discounted Price</th>
                </tr>
            </thead>

            <tbody>
                {
                    data && data.data.result.rows.filter((data)=> {
                        if(searchPrice===""){
                            return data
                        }
                        return (
                            data.price <= searchPrice
                        )
                    })
                    .map((product, index)=>{
                    return <tr>
                            <th scope="row" key={index}>{index+1}</th>
                            <td>{product.id}</td>
                            <td>{product.title}</td>
                            <td>{product.price}</td>
                            <td>{product.discount}</td>
                            <td><s className=''>${product.price}</s>  {product.price - product.discount }</td>
                            </tr>
                    })
                }
            </tbody>
        </Table>
    </div>
  )
}

export default PriceList