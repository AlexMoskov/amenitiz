class Api::V1::ProductsController < ApplicationController
  def index
    products = Product.all.order(created_at: :desc)
    render json: products
  end

  def create
  end

  def show
    if product
      render json: product
    else
      render json: product.errors
    end
  end

  def destroy
  end

  private

  def product
    @product ||= Product.find(params[:id])
  end
end
