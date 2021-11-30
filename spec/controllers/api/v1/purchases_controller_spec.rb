require 'rails_helper'

describe Api::V1::PurchasesController do
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
      expect(body).to have_key('purchases')
    end

    context 'with products' do
      before do
        request.session[:user] = {}
        request.session[:user]['purchases'] = [
          product1.as_json,
          product2.as_json,
          product3.as_json
        ]
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
        expect(body['purchases']).to be_a(Array)
        expect(body['purchases'].length).to eq(3)
      end
    end
  end

  describe 'create' do
    let(:quantity) { 3 }

    before do
      request.session[:cart] = {}
      request.session[:cart]['products'] = {
        product1.product_code => quantity,
      }
    end

    it 'returns ok' do
      post :create, params: { }

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq('ok')
    end

    it 'creates new purchase' do
      post :create, params: { products: [ { id: product2.id, price: product2.price, quantity: quantity } ]}

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)

      purchases = request.session[:user]['purchases']
      expect(purchases.length).to be(1)
      expect(purchases.first[:products].length).to be(quantity)
    end
  end
end
