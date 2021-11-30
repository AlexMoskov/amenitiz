require 'rails_helper'

describe Api::V1::CartController do
  let(:product1) { FactoryGirl.create(:product1) }
  let(:product2) { FactoryGirl.create(:product2) }
  let(:product3) { FactoryGirl.create(:product3) }
  let(:content_type) { 'application/json; charset=utf-8' }

  describe 'GET index' do
    it "should be successful" do
      get :index

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)
    end

    it "returns json" do
      get :index
      body = JSON.parse(response.body)

      expect(response.content_type).to eq(content_type)
      expect(body).to have_key('products')
    end

    context 'with products' do
      let(:quantity1) { 2 }
      let(:quantity2) { 3 }
      let(:quantity3) { 1 }

      before do
        request.session[:cart] = {}
        request.session[:cart]['products'] = {
          product1.product_code => quantity1,
          product2.product_code => quantity2,
          product3.product_code => quantity3
        }
      end

      it "should be successful" do
        get :index

        expect(response.content_type).to eq(content_type)
        expect(response.status).to eq(200)
      end

      it "returns json" do
        get :index
        body = JSON.parse(response.body)

        expect(response.content_type).to eq(content_type)
        expect(body).to have_key('products')
      end

      it "returns products" do
        get :index
        products = JSON.parse(response.body)['products']

        expect(response.content_type).to eq(content_type)
        expect(products.count).to eq(3)
        expect(
          products.find { |p| p['product_code'] == product1.product_code }['quantity']
        ).to eq(quantity1)
        expect(
          products.find { |p| p['product_code'] == product2.product_code }['quantity']
        ).to eq(quantity2)
        expect(
          products.find { |p| p['product_code'] == product3.product_code }['quantity']
        ).to eq(quantity3)
      end
    end
  end

  describe 'update' do
    let(:quantity) { 1 }
    let(:product_id) { product1.id }

    before do
      request.session[:cart] = {}
      request.session[:cart]['products'] = {
        product1.product_code => quantity,
      }
    end

    it 'return not found' do
      put :update, params: { product_id: 999 }

      expect(response.content_type).to eq(content_type)
      expect(JSON.parse(response.body)).to eq('not_found')
    end

    it 'returns ok' do
      put :update, params: { product_id: product1.id }

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)

      products = request.session[:cart]['products']
      expect(products[product1.product_code]).to eq(quantity + 1)
    end
  end

  describe 'destroy' do
    let(:quantity) { 2 }
    let(:product_id) { product2.id }

    before do
      request.session[:cart] = {}
      request.session[:cart]['products'] = {
        product1.product_code => quantity,
        product2.product_code => 5,
      }
    end

    it 'return not found' do
      delete :destroy, params: { product_id: 999 }

      expect(response.content_type).to eq(content_type)
      expect(JSON.parse(response.body)).to eq('not_found')
    end

    it 'returns ok' do
      delete :destroy, params: { product_id: product2.id }

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)

      products = request.session[:cart]['products']
      expect(products[product2.product_code]).to be_nil
    end
  end
end
