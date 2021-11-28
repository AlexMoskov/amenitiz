class CreateProducts < ActiveRecord::Migration[6.1]
  def change
    create_table :products do |t|
      t.text :product_code
      t.text :name
      t.float :price
      t.timestamps
    end
  end
end
