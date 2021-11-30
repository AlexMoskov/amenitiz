require 'rails_helper'

describe CalculatePurchaseService do
  let(:green_tea) { FactoryGirl.create(:product1) }
  let(:strawberries) { FactoryGirl.create(:product2) }
  let(:cofffee) { FactoryGirl.create(:product3) }
  let(:products) { [] }

  subject {
    described_class.new(products).run
  }

  describe 'run' do
    context 'buy-one-get-one-free offers for green tea' do
      before do
        products << { id: green_tea.id, quantity: 1 }
      end

      it 'returns correct purchase' do
        expect(subject).to be_a(Hash)
        expect(subject[:success]).to be_truthy
        expect(subject[:total]).to eq(green_tea.price)
        expect(subject[:products].length).to eq(2)
        expect(subject[:products].all? { |p| p[:product_code] == green_tea.product_code }).to be_truthy
      end
    end

    context 'when buy 3 or more strawberries, the price should drop to 4.50€' do
      let(:new_price) { 4.50 }
      let(:quantity) { 3 }

      before do
        products << { id: strawberries.id, quantity: quantity }
      end

      it 'returns correct purchase' do
        expect(subject).to be_a(Hash)
        expect(subject[:success]).to be_truthy
        expect(subject[:total]).to eq(new_price*quantity)
        expect(subject[:products].length).to eq(3)
        expect(subject[:products].all? { |p| p[:product_code] == strawberries.product_code }).to be_truthy
      end
    end

    context 'when buy 3 or more coffees, the price of all coffees should drop to 2/3' do
      let(:new_price) { (cofffee.price * 2 / 3).round(2) }
      let(:quantity) { 3 }

      before do
        products << { id: cofffee.id, quantity: quantity }
      end

      it 'returns correct purchase' do
        expect(subject).to be_a(Hash)
        expect(subject[:success]).to be_truthy
        expect(subject[:total]).to eq(new_price*quantity)
        expect(subject[:products].length).to eq(3)
        expect(subject[:products].all? { |p| p[:product_code] == cofffee.product_code }).to be_truthy
      end
    end

    context 'combination of products' do
      let(:cofffee_new_price) { (cofffee.price * 2 / 3).round(2) }
      let(:green_tea_quantity) { 2 }
      let(:strawberries_quantity) { 2 }
      let(:cofffee_quantity) { 4 }
      let(:total) do
        green_tea.price * green_tea_quantity + strawberries.price * strawberries_quantity + cofffee_new_price * cofffee_quantity
      end
      let(:total_quantity) { green_tea_quantity + 1 + strawberries_quantity + cofffee_quantity }

      before do
        products << { id: green_tea.id, quantity: green_tea_quantity }
        products << { id: strawberries.id, quantity: strawberries_quantity }
        products << { id: cofffee.id, quantity: cofffee_quantity }
      end

      it 'returns correct purchase' do
        expect(subject).to be_a(Hash)
        expect(subject[:success]).to be_truthy
        expect(subject[:total]).to eq(total.round(2))
        expect(subject[:products].length).to eq(total_quantity)
        expect(
          subject[:products].select { |p| p[:product_code] == green_tea.product_code }.length
        ).to eq(green_tea_quantity + 1)
        expect(
          subject[:products].select { |p| p[:product_code] == strawberries.product_code }.length
        ).to eq(strawberries_quantity)
        expect(
          subject[:products].select { |p| p[:product_code] == cofffee.product_code }.length
        ).to eq(cofffee_quantity)
      end
    end
  end
end
