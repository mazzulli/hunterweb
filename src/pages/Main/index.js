import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  
  // lidando com estado
  // tipo de variavel que conseguimos manipular e mudar seu estado inicial
  state = {
    products: [],
    productInfo: {

    }
  };

  // gerencia o estado / ciclo de vida do objeto e é apresentado sempre na 
  // primeira vez que é carregado na tela.
  componentDidMount(){
    this.loadProducts();
  };

  loadProducts = async (page = 1)=>{
    const response = await api.get(`/products?page=${page}`);

    const { docs, ...productInfo } = response.data;
  
    this.setState({ products: docs, productInfo, page });
  };

  nextPage = ()=> {
    const { page, productInfo } = this.state;

    if (page === productInfo.pages) return;

    const pageNumber = page + 1;

    this.loadProducts(pageNumber);
  }

  prevPage = ()=> {
    const { page, productInfo } = this.state;

    if (page === 1) return;

    const pageNumber = page - 1;

    this.loadProducts(pageNumber);
  }

  render () {
    const { products, page, productInfo } = this.state;
    
    return (
      <>
        <h1>Contagem de Produtos: { this.state.products.length }</h1>
        <br />
        <div className="product-list">
          { products.map(product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p> 
              <Link to={`${productInfo.id}`}>Acessar</Link> 
            </article>
          ))}  
          <div className="actions">
            <button disabled={page===1} onClick={this.prevPage}>Anterior</button>
            <button disabled={page === productInfo.pages} onClick={this.nextPage}>Próxima</button>
          </div>
        </div>
      </>
      )
    };
};

