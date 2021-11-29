class CalculatePurchaseService
  attr_reader :products

  def initialize(products)
    @products = products
  end

  def run
    items = []
    total = 0.00

    products.each do |p|
      product = Product.find_by(id: p[:id])
      quantity = p[:quantity].to_i

      case product&.product_code
      when 'CF1'
        # If you buy 3 or more coffees, the price of all coffees will drop to 2/3 of the original price.
        p[:price] = (p[:price] * 2 / 3).round(2) if quantity >= 3
      when 'SR1'
        # If you buy 3 or more strawberries, the price will drop to 4.50€.
        p[:price] = 4.50 if quantity >= 3
      when 'GR1'
        # buy-one-get-one-free offers and green tea
        items << {
          id: product.id, product_code: product.product_code, name: product.name, price: 0.00, quantity: 1
        }
      end

      quantity.times do
        items << {
          id: product.id, product_code: product.product_code, name: product.name, price: p[:price], quantity: 1
        }

        total += p[:price]
      end
    end

    { products: items, total: total }
  end
end
