import React, { Component } from "react";
import { connect } from "react-redux";
import { Badge,Button,Table } from "reactstrap";
import * as productActions from "../../redux/actions/productActions";
import * as cartActions from "../../redux/actions/cartActions";
import { bindActionCreators } from "redux";
import alertify from 'alertifyjs'
class ProductList extends Component {
  componentDidMount() {
    this.props.actions.getProducts();
  }
  addToCart = (product)=>{
    this.props.actions.addToCart({product,quantity:1})
    alertify.success(product.productName+" added to cart")
  }
  render() {
    return (
      <div>
        <h3>
          <Badge color="warning">Products</Badge>{" "}
          <Badge color="success">
            {this.props.currentCategory.categoryName}
          </Badge>
        </h3>
        <Table>
          <thead>
            <tr>
              <th>#</th>
              <th>categoryId</th>
              <th>productName</th>
              <th>quantityPerUnit</th>
              <th>unitPrice</th>
              <th>unitsInStock</th>
              <th></th>
              
            </tr>
          </thead>
          <tbody>
            {this.props.products.map((product) => (
              <tr key={product.id}>
                <th scope="row">{product.id}</th>
                <td>{product.categoryId}</td>
                <td>{product.productName}</td>
                <td>{product.quantityPerUnit}</td>
                <td>{product.unitPrice}</td>
                <td>{product.unitsInStock}</td>
                <td><Button onClick={()=>this.addToCart(product)} color="success">ADD</Button></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    currentCategory: state.changeCategoryReducer,
    products: state.productListReducer
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      getProducts: bindActionCreators(productActions.getProducts, dispatch),
      addToCart: bindActionCreators(cartActions.addToCart,dispatch)
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(ProductList);
