require 'rails_helper'

describe Api::V1::ProductsController do
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
      expect(body).to be_a(Array)
      expect(body.length).to eq(0)
    end

    context 'with products' do
      before do
        FactoryGirl.create(:product1)
        FactoryGirl.create(:product2)
        FactoryGirl.create(:product3)
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
        expect(body).to be_a(Array)
        expect(body.length).to eq(3)
      end
    end
  end

  describe 'create' do
    it 'returns ok' do
      post :create, params: { }

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq('ok')
    end
  end

  describe 'show' do
    let(:product3) { FactoryGirl.create(:product3) }

    it 'returns not_found' do
      get :show, params: { id: 999 }

      expect(response.content_type).to eq(content_type)
      expect(JSON.parse(response.body)).to eq('not_found')
    end

    it 'returns product' do
      get :show, params: { id: product3.id }

      body = JSON.parse(response.body)
      expect(response.content_type).to eq(content_type)
      expect(body).to be_a(Hash)
      expect(body['id']).to eq(product3.id)
      expect(body['name']).to eq(product3.name)
    end
  end

  describe 'destroy' do
    it 'returns ok' do
      delete :destroy, params: { id: 999 }

      expect(response.content_type).to eq(content_type)
      expect(response.status).to eq(200)
      expect(JSON.parse(response.body)).to eq('ok')
    end
  end
end
