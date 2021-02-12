import React, { Component } from "react";
import { connect } from "react-redux";
import * as cartActions from "../../redux/actions/cartActions";
import alertify from 'alertifyjs'
import {
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Badge,
  NavItem,
  NavLink,
} from "reactstrap";
import { bindActionCreators } from "redux";
import { Link } from "react-router-dom";

class CartSummary extends Component {
  removeFromCart(cartItem){
    this.props.actions.removeFromCart(cartItem.product)
    alertify.error(cartItem.product.productName+" removed!")
  }
  renderEmpty() {
    return (
      <NavItem>
        <NavLink>EMPTY CART</NavLink>
      </NavItem>
    );
  }
  renderSummary() {
    return (
      <UncontrolledDropdown nav inNavbar>
        <DropdownToggle nav caret>
          CART
        </DropdownToggle>
        <DropdownMenu right>
          {this.props.cart.map((cartItem) => (
            <DropdownItem key={cartItem.product.id}>
              <Badge color="danger"onClick={()=>this.removeFromCart(cartItem)}>X</Badge>
              {cartItem.product.productName}
              <Badge color="success">{cartItem.quantity}</Badge>
            </DropdownItem>
          ))}

          <DropdownItem divider />
          <DropdownItem><Link to="/cart">go to the cart detail</Link></DropdownItem>
        </DropdownMenu>
      </UncontrolledDropdown>
    );
  }

  render() {
    return (
      <div>
        {this.props.cart.length > 0 ? this.renderSummary() : this.renderEmpty()}
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
export default connect(mapStateToProps, mapDispatchToProps)(CartSummary);
