import React, { Component } from 'react';

import api from '../../services/api';
import './styles.css';

export default class Main extends Component {
  
  // lidando com estado
  // tipo de variavel que conseguimos manipular e mudar seu estado inicial
  state = {
    products: []
  };

  // gerencia o estado / ciclo de vida do objeto e é apresentado sempre na 
  // primeira vez que é carregado na tela.
  componentDidMount(){
    this.loadProducts();
  };

  loadProducts = async ()=>{
    const response = await api.get('/products');
    console.log(response.data.docs);
  
    this.setState({ products: response.data.docs });
  };

  render () {
    const { products } = this.state;

    return (
      <>
        <h1>Contagem de Produtos: { this.state.products.length }</h1>
        <br />
        <div className="product-list">
          { products.map(product => (
            <article key={product._id}>
              <strong>{product.title}</strong>
              <p>{product.description}</p> 
              <a href="">Acessar</a> 
            </article>
          ))}  
          <div className="actions">
            <button>Anterior</button>
            <button>Próxima</button>
          </div>
        </div>
      </>
      )
    };
};

