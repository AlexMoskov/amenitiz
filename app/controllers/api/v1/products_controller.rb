class Api::V1::ProductsController < ApplicationController
  def index
    render json: get_products
  end

  def create
    render json: :ok
  end

  def show
    render json: :not_found and return unless product

    render json: product
  end

  def destroy
    render json: :ok
  end

  private

  def product
    @product ||= Product.find_by(id: params[:id])
  end

  def get_products
    Product.all.order(created_at: :desc)
  end
end
