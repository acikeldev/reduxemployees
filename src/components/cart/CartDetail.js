import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from "alertifyjs";
import { Table, Button } from "reactstrap";

class CartDetail extends Component {
  removeFromCart(cartItem) {
    this.props.actions.removeFromCart(cartItem.product);
    alertify.error(cartItem.product.productName + " removed!");
  }
  render() {
    return (
      <div>
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
            {this.props.cart.map((c) => (
              <tr key={c.product.id}>
                <th scope="row">{c.product.id}</th>
                <td>{c.product.categoryId}</td>
                <td>{c.product.productName}</td>
                <td>{c.product.quantityPerUnit}</td>
                <td>{c.product.unitPrice}</td>
                <td>{c.product.unitsInStock}</td>
                <td>
                  <Button
                    onClick={() => this.removeFromCart(c)}
                    color="danger"
                  >
                    REMOVE
                  </Button>
                </td>
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
    cart: state.cartReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      removeFromCart: bindActionCreators(cartActions.removeFromCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(CartDetail);
