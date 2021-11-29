class Api::V1::PurchasesController < ApplicationController
  def index
    render json: { purchases: get_purchases }
  end

  def create
    session[:user] ||= {}
    session[:user]['purchases'] ||= []
    session[:user]['purchases'] << ::CalculatePurchaseService.new(params[:products]).run
    session[:cart] ||= {}
    session[:cart]['products'] = {}

    render json: :ok
  end

  private

  def get_purchases
    session[:user] ||= {}
    purchases = session[:user]['purchases'] ||= []

    purchases
  end
end
