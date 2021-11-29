Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      get 'products', to: 'products#index'
      post 'products/create'
      get '/products/:id', to: 'products#show'
      delete '/products/:id', to: 'products#destroy'

      get 'cart', to: 'cart#index'
      put 'cart', to: 'cart#update'
      delete '/cart/:product_id', to: 'cart#destroy'

      get 'purchases', to: 'purchases#index'
      post 'purchases', to: 'purchases#create'
    end
  end

  root 'homepage#index'
  get '/*path' => 'homepage#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
