require 'rails_helper'

describe Product do
  let(:product_code) { 'product_code' }
  let(:name) { 'name' }
  let(:price) { 10.00 }

  subject {
    described_class.new(product_code: product_code, name: name, price: price)
  }

  it "is valid with valid attributes" do
    expect(subject).to be_valid
  end

  it "is not valid without a product code" do
    subject.product_code = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a name" do
    subject.name = nil
    expect(subject).to_not be_valid
  end

  it "is not valid without a price" do
    subject.price = nil
    expect(subject).to_not be_valid
  end
end
