class Product < ApplicationRecord
  validates :product_code, :name, :price, presence: true
end
