require 'rails_helper'

describe HomepageController do
  describe 'GET index' do
    it "should be successful" do
      get :index
      expect(response.status).to eq(200)
    end

    it "renders the index template" do
      get :index
      expect(response).to render_template("index")
    end
  end
end
