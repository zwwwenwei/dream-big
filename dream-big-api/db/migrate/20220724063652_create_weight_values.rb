class CreateWeightValues < ActiveRecord::Migration[7.0]
  def change
    create_table :weight_values do |t|
      t.integer :weight
    end
  end
end
