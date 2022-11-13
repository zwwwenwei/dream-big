class CreateSections < ActiveRecord::Migration[7.0]
  def change
    create_table :sections do |t|
      t.bigint :planet_ID
      t.bigint :category_ID
      t.timestamps
    end
  end
end
