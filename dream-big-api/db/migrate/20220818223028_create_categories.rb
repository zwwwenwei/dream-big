class CreateCategories < ActiveRecord::Migration[7.0]
  def change
    create_table :categories do |t|
      t.string :name
      t.string :description
      t.bigint :weight_value_id
    end
    add_foreign_key :categories, :weight_values, ondelete: :cascade, column: :weight_value_id
  end
end
