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
        total: (p.price * quantity).round(2)
      }
    end

    render json: { products: items }
  end

  def update
    session[:cart] ||= {}
    session[:cart]['products'] ||= {}

    render json: :not_found and return unless product

    session[:cart]['products'][product.product_code] = session[:cart]['products'][product.product_code].to_i + 1
    render json: :ok
  end

  def destroy
    cart = session[:cart] || {}
    products = session[:cart]['products'] ||= {}
    render json: :not_found and return unless product

    products.delete(product.product_code)
    render json: :ok
  end

  private

  def product
    @product ||= Product.find_by(id: params[:product_id])
  end
end
