FactoryGirl.define do
  factory :product1, class: Product do
    product_code { 'GR1' }
    name { 'Green Tea' }
    price { 3.11 }
  end

  factory :product2, class: Product do
    product_code { 'SR1' }
    name { 'Strawberries' }
    price { 5.00 }
  end

  factory :product3, class: Product do
    product_code { 'CF1' }
    name { 'Coffee' }
    price { 11.23 }
  end
end
