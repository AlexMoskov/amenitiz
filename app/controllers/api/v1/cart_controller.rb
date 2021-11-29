class Api::V1::CartController < ApplicationController
  def index
    session[:cart] ||= {}
    products = session[:cart]['products'] ||= {}
    items = products.map do |code, quantity|
      p = Product.find_by(product_code: code)
      {
        id: p.id,
        product_code: code,
        name: p.name,
        price: p.price,
        quantity: quantity,
        total: p.price * quantity
      }
    end

    render json: { products: items }
  end

  def update
    session[:cart] ||= {}
    session[:cart]['products'] ||= {}

    render json: :not_found unless product

    session[:cart]['products'][product.product_code] = session[:cart]['products'][product.product_code].to_i + 1

    render json: :ok
  end

  def destroy
    cart = session[:cart] || {}
    products = session[:cart]['products'] ||= {}
    products.delete(product.product_code) if product
  end

  private

  def product
    @product ||= Product.find(params[:product_id])
  end
end
